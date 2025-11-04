import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { BlockData } from '@/types/game';

interface PlayerProps {
  onMove?: (position: THREE.Vector3) => void;
  blocks: BlockData[];
}

export const Player = ({ onMove, blocks }: PlayerProps) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });
  const isOnGround = useRef(true);

  useEffect(() => {
    camera.position.set(0, 5, 5);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
          moveState.current.forward = true;
          break;
        case 'KeyS':
          moveState.current.backward = true;
          break;
        case 'KeyA':
          moveState.current.left = true;
          break;
        case 'KeyD':
          moveState.current.right = true;
          break;
        case 'Space':
          if (isOnGround.current) {
            moveState.current.jump = true;
          }
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
          moveState.current.forward = false;
          break;
        case 'KeyS':
          moveState.current.backward = false;
          break;
        case 'KeyA':
          moveState.current.left = false;
          break;
        case 'KeyD':
          moveState.current.right = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [camera]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    const speed = 10;
    const jumpSpeed = 8;
    const gravity = -25;
    const playerRadius = 0.3;
    const playerHeight = 1.8;

    direction.current.set(0, 0, 0);

    if (moveState.current.forward) direction.current.z -= 1;
    if (moveState.current.backward) direction.current.z += 1;
    if (moveState.current.left) direction.current.x -= 1;
    if (moveState.current.right) direction.current.x += 1;

    direction.current.normalize();

    // Apply movement in camera's local space
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    const cameraRight = new THREE.Vector3();
    cameraRight.crossVectors(camera.up, cameraDirection).normalize();

    const moveVector = new THREE.Vector3();
    moveVector.addScaledVector(cameraDirection, -direction.current.z);
    moveVector.addScaledVector(cameraRight, -direction.current.x);
    
    velocity.current.x = moveVector.x * speed;
    velocity.current.z = moveVector.z * speed;

    // Apply gravity
    if (!isOnGround.current) {
      velocity.current.y += gravity * delta;
    }

    // Jump
    if (moveState.current.jump && isOnGround.current) {
      velocity.current.y = jumpSpeed;
      isOnGround.current = false;
      moveState.current.jump = false;
    }

    // Calculate new position
    const newPos = new THREE.Vector3(
      camera.position.x + velocity.current.x * delta,
      camera.position.y + velocity.current.y * delta,
      camera.position.z + velocity.current.z * delta
    );

    // Collision detection with blocks
    let collisionX = false;
    let collisionZ = false;
    let collisionY = false;

    blocks.forEach(block => {
      const [bx, by, bz] = block.position;
      
      // Check if player would collide with this block
      const testPosX = new THREE.Vector3(newPos.x, camera.position.y, camera.position.z);
      const testPosZ = new THREE.Vector3(camera.position.x, camera.position.y, newPos.z);
      const testPosY = new THREE.Vector3(camera.position.x, newPos.y, camera.position.z);

      // X axis collision
      if (Math.abs(testPosX.x - bx) < 0.5 + playerRadius &&
          Math.abs(testPosX.y - by) < 0.5 + playerHeight / 2 &&
          Math.abs(testPosX.z - bz) < 0.5 + playerRadius) {
        collisionX = true;
      }

      // Z axis collision
      if (Math.abs(testPosZ.x - bx) < 0.5 + playerRadius &&
          Math.abs(testPosZ.y - by) < 0.5 + playerHeight / 2 &&
          Math.abs(testPosZ.z - bz) < 0.5 + playerRadius) {
        collisionZ = true;
      }

      // Y axis collision (feet - for ground detection)
      if (Math.abs(testPosY.x - bx) < 0.5 + playerRadius &&
          Math.abs(camera.position.z - bz) < 0.5 + playerRadius) {
        // Check if player is landing on top of block
        if (velocity.current.y < 0 && newPos.y - playerHeight / 2 < by + 0.5 && camera.position.y - playerHeight / 2 >= by + 0.5) {
          collisionY = true;
          camera.position.y = by + 0.5 + playerHeight / 2;
          velocity.current.y = 0;
          isOnGround.current = true;
        }
        // Check if player is hitting head on block
        else if (velocity.current.y > 0 && newPos.y + playerHeight / 2 > by - 0.5 && camera.position.y + playerHeight / 2 <= by - 0.5) {
          velocity.current.y = 0;
          collisionY = true;
        }
      }
    });

    // Apply movement if no collision
    if (!collisionX) {
      camera.position.x = newPos.x;
    }
    if (!collisionZ) {
      camera.position.z = newPos.z;
    }
    if (!collisionY && !isOnGround.current) {
      camera.position.y = newPos.y;
    }

    // Check if player is still on ground
    if (isOnGround.current && velocity.current.y <= 0) {
      let stillOnGround = false;
      blocks.forEach(block => {
        const [bx, by, bz] = block.position;
        if (Math.abs(camera.position.x - bx) < 0.5 + playerRadius &&
            Math.abs(camera.position.z - bz) < 0.5 + playerRadius &&
            Math.abs(camera.position.y - playerHeight / 2 - by - 0.5) < 0.01) {
          stillOnGround = true;
        }
      });
      if (!stillOnGround) {
        isOnGround.current = false;
      }
    }

    onMove?.(camera.position);
  });

  return <PointerLockControls ref={controlsRef} />;
};
