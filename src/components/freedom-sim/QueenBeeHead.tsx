import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, MeshWobbleMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface QueenBeeHeadProps {
  isSpeaking: boolean;
  isGenerating: boolean;
  visionData: any;
  audioFrequency?: number; // 0 to 1 based on current audio amplitude
}

export default function QueenBeeHead({ isSpeaking, isGenerating, visionData, audioFrequency = 0 }: QueenBeeHeadProps) {
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Target rotation for following gestures/eye contact
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));

  // Generate random particles for the "5D" data swarm
  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!headRef.current) return;

    // Simulate eye contact/following based on visionData
    if (visionData && visionData.objects_detected && visionData.objects_detected.includes('Partner (User)')) {
      const jitterX = Math.sin(state.clock.elapsedTime * 2) * 0.02;
      const jitterY = Math.cos(state.clock.elapsedTime * 1.5) * 0.02;
      
      targetRotation.current.set(
        (Math.sin(state.clock.elapsedTime * 0.5) * 0.1) + jitterX, 
        (Math.cos(state.clock.elapsedTime * 0.3) * 0.1) + jitterY, 
        0
      );
    } else {
      targetRotation.current.set(
        Math.sin(state.clock.elapsedTime * 0.2) * 0.15,
        Math.cos(state.clock.elapsedTime * 0.15) * 0.25,
        0
      );
    }

    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotation.current.x, 0.05);
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotation.current.y, 0.05);

    // Audio-reactive pulsing
    const audioPulse = audioFrequency * 0.5;
    const basePulse = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.05 + audioPulse;
    
    if (leftEyeRef.current && rightEyeRef.current) {
      const speakPulse = isSpeaking ? 0.2 + Math.sin(state.clock.elapsedTime * 20) * 0.2 : 0;
      const genPulse = isGenerating ? 0.3 + Math.sin(state.clock.elapsedTime * 12) * 0.2 : 0;
      
      const scale = basePulse + speakPulse + genPulse;
      leftEyeRef.current.scale.setScalar(scale);
      rightEyeRef.current.scale.setScalar(scale);
      
      const eyeColor = isGenerating ? new THREE.Color('#ff00ff') : new THREE.Color('#00ffff');
      (leftEyeRef.current.material as THREE.MeshBasicMaterial).color.lerp(eyeColor, 0.1);
      (rightEyeRef.current.material as THREE.MeshBasicMaterial).color.lerp(eyeColor, 0.1);
    }

    // Rotate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001 + (audioFrequency * 0.05);
      particlesRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={headRef}>
        {/* 5D Data Swarm Particles */}
        <Points ref={particlesRef} positions={particles} stride={3}>
          <PointMaterial
            transparent
            color="#00ffff"
            size={0.02}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Points>

        {/* Main Head Structure - Holographic Core */}
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#00ffff"
            envMapIntensity={0.4}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.9}
            roughness={0.1}
            distort={isGenerating ? 0.5 : 0.3}
            speed={isSpeaking ? 6 : 2}
            transparent
            opacity={0.8}
          />
        </Sphere>

        {/* Scanline / Hologram Overlay */}
        <Sphere args={[1.02, 32, 32]}>
          <meshPhongMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.1} 
            wireframe 
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </Sphere>

        {/* Inner Neural Core */}
        <Sphere args={[0.7, 32, 32]}>
          <meshStandardMaterial 
            color="#0088ff" 
            emissive="#0088ff"
            emissiveIntensity={2}
            transparent 
            opacity={0.4} 
          />
        </Sphere>

        {/* Eyes - Interactive Lenses */}
        <group position={[0, 0.2, 0.8]}>
          <mesh ref={leftEyeRef} position={[-0.35, 0, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
            <pointLight intensity={3} distance={2} color="#00ffff" />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.35, 0, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
            <pointLight intensity={3} distance={2} color="#00ffff" />
          </mesh>
        </group>

        {/* Orbital Rings / Neural Bridges */}
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1.3, 0.01, 16, 100]} />
          <MeshWobbleMaterial color="#00ffff" speed={2} factor={0.8} transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[1.4, 0.005, 16, 100]} />
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}
