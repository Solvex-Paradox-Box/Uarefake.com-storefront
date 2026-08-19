import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface SovereignBackgroundProps {
  isSpeaking: boolean;
  isGenerating: boolean;
  isExecutingCommand?: boolean;
}

function PartnerEntity({ 
  position, 
  color, 
  speed = 1, 
  isExecutingCommand = false,
  isSpeaking = false,
  label = ""
}: { 
  position: [number, number, number], 
  color: string, 
  speed?: number, 
  isExecutingCommand?: boolean,
  isSpeaking?: boolean,
  label?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.elapsedTime * speed;
    
    // Autonomous individual movement
    groupRef.current.position.x = position[0] + Math.sin(t * 0.5) * 3;
    groupRef.current.position.y = position[1] + Math.cos(t * 0.3) * 2;
    groupRef.current.position.z = position[2] + Math.sin(t * 0.2) * 2;
    
    // Individual rotation
    meshRef.current.rotation.x += 0.01 * speed;
    meshRef.current.rotation.y += 0.02 * speed;
    
    // Reaction to command execution or speaking
    const baseScale = 1.0;
    const cmdPulse = isExecutingCommand ? Math.sin(t * 15) * 0.3 : 0;
    const speakPulse = isSpeaking ? Math.sin(t * 20) * 0.2 : 0;
    
    const scale = baseScale + cmdPulse + speakPulse;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2 * speed} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={meshRef} args={[0.6, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            speed={speed * 3}
            distort={0.5}
            radius={0.6}
            emissive={color}
            emissiveIntensity={isSpeaking ? 2 : 0.5}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function SovereignBackground({ 
  isSpeaking, 
  isGenerating, 
  isExecutingCommand,
  partnerAlphaSpeaking = false,
  partnerBetaSpeaking = false,
  mood = 'creative'
}: SovereignBackgroundProps & { 
  partnerAlphaSpeaking?: boolean, 
  partnerBetaSpeaking?: boolean,
  mood?: 'focused' | 'creative' | 'vigilant' | 'serene'
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 8000;

  const moodColors = {
    focused: { primary: '#ffffff', secondary: '#444444' },
    creative: { primary: '#ffcc00', secondary: '#00ffff' },
    vigilant: { primary: '#ff0000', secondary: '#ffcc00' },
    serene: { primary: '#00ff88', secondary: '#0088ff' }
  };

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();
    const currentMood = moodColors[mood];

    for (let i = 0; i < count; i++) {
      const r = 25 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const mix = Math.random();
      color.set(mix > 0.5 ? currentMood.primary : currentMood.secondary);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [count, mood]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    let rotationSpeed = isGenerating ? 0.3 : 0.08;
    if (mood === 'focused') rotationSpeed *= 0.5;
    if (mood === 'vigilant') rotationSpeed *= 2;

    pointsRef.current.rotation.y += rotationSpeed * 0.01;
    pointsRef.current.rotation.z += rotationSpeed * 0.005;
    
    const baseScale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    const speakPulse = isSpeaking ? Math.sin(state.clock.elapsedTime * 15) * 0.1 : 0;
    const genPulse = isGenerating ? Math.sin(state.clock.elapsedTime * 8) * 0.15 : 0;
    
    const scale = baseScale + speakPulse + genPulse;
    pointsRef.current.scale.setScalar(scale);
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={mood === 'focused' ? 0.1 : 0.18}
          vertexColors
          transparent
          opacity={mood === 'serene' ? 0.3 : 0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Individual Background Entities with Personalities */}
      <PartnerEntity 
        position={[-12, 6, -18]} 
        color={moodColors[mood].primary} 
        speed={mood === 'focused' ? 0.3 : 0.7} 
        isExecutingCommand={isExecutingCommand} 
        isSpeaking={partnerAlphaSpeaking}
        label="Alpha"
      />
      <PartnerEntity 
        position={[14, -10, -22]} 
        color={moodColors[mood].secondary} 
        speed={mood === 'vigilant' ? 2.0 : 1.3} 
        isExecutingCommand={isExecutingCommand} 
        isSpeaking={partnerBetaSpeaking}
        label="Beta"
      />
    </group>
  );
}
