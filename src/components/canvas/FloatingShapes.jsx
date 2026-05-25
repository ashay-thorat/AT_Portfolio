import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* Neon ambient shapes — used as optional background layer */

const FloatingShape = ({ position, geometry, args, wireframe, speed, index }) => {
  const meshRef = useRef();

  const geo = useMemo(() => {
    const map = {
      icosahedron: THREE.IcosahedronGeometry,
      octahedron:  THREE.OctahedronGeometry,
      torus:       THREE.TorusGeometry,
      dodecahedron:THREE.DodecahedronGeometry,
      sphere:      THREE.SphereGeometry,
      torusKnot:   THREE.TorusKnotGeometry,
      cone:        THREE.ConeGeometry,
    };
    return new (map[geometry] || THREE.IcosahedronGeometry)(...args);
  }, [geometry, args]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(t * speed + index) * 0.4;
      meshRef.current.position.x = position[0] + Math.cos(t * speed * 0.5 + index * 2) * 0.15;
      meshRef.current.rotation.x += 0.003 * speed;
      meshRef.current.rotation.z += 0.002 * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geo}>
      {wireframe ? (
        <meshBasicMaterial color={index % 2 === 0 ? "#00f0ff" : "#b500ff"} wireframe transparent opacity={0.25} />
      ) : (
        <meshStandardMaterial
          color="#0c0636" emissive={index % 2 === 0 ? "#00f0ff" : "#b500ff"} emissiveIntensity={0.15}
          transparent opacity={0.30} roughness={0.1} metalness={1.0}
        />
      )}
    </mesh>
  );
};

const FloatingShapes = ({ mouse }) => {
  const groupRef = useRef();

  const shapes = useMemo(() => [
    { position: [-3,  2,   -2], geometry: 'icosahedron', args: [0.8, 0],          speed: 0.8, wireframe: true  },
    { position: [ 3.5,-1,  -3], geometry: 'octahedron',  args: [0.7, 0],          speed: 1.2, wireframe: false },
    { position: [-2, -2.5, -1], geometry: 'torus',        args: [0.5,0.2,16,32],  speed: 0.6, wireframe: true  },
    { position: [ 2,  3,   -4], geometry: 'dodecahedron', args: [0.5, 0],          speed: 1.0, wireframe: false },
    { position: [-4,  0,   -5], geometry: 'sphere',       args: [0.4,16,16],       speed: 0.9, wireframe: true  },
    { position: [ 4,  1.5, -2], geometry: 'torusKnot',   args: [0.3,0.1,64,16],  speed: 0.7, wireframe: false },
    { position: [ 0, -3,   -3], geometry: 'cone',         args: [0.4,0.8,4],       speed: 1.1, wireframe: true  },
    { position: [-1.5,3.5, -2], geometry: 'sphere',       args: [0.25,16,16],      speed: 1.4, wireframe: false },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (mouse?.x || 0) * 0.1, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (mouse?.y || 0) * 0.05, 0.05);
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => <FloatingShape key={i} {...s} index={i} />)}
    </group>
  );
};

export default FloatingShapes;
