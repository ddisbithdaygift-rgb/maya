import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

extend({
  Mesh: THREE.Mesh,
  BoxGeometry: THREE.BoxGeometry,
  MeshBasicMaterial: THREE.MeshBasicMaterial,
  AmbientLight: THREE.AmbientLight,
  DirectionalLight: THREE.DirectionalLight,
  PointLight: THREE.PointLight,
});

function Model() {
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = new GLTFLoader();

    console.log('🔍 Loading GLTF from: /women_in_skirt/scene.gltf');

    loader.load(
      '/women_in_skirt/scene.gltf',
      (gltf) => {
        console.log('✅ GLTF loaded successfully:', gltf);
        console.log('Scene children:', gltf.scene.children.length);

        setModel(gltf.scene);
        setError(null);
        setLoading(false);
      },
      (progress) => {
        console.log('📊 Loading progress:', Math.round(progress.loaded / progress.total * 100) + '%');
      },
    );

    return () => {
      // Cleanup function - dispose of geometries and materials
      if (model) {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) {
              child.geometry.dispose();
            }
            if (child.material) {
              // Handle both single material and material arrays
              if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, []);

  if (loading) {
    return (
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    );
  }

  if (error) {
    return (
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="red" />
      </mesh>
    );
  }

  if (!model) {
    return (
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="yellow" />
      </mesh>
    );
  }

  return <primitive object={model} scale={1} />;
}

export function FemaleAvatar() {
  return (
    <div className="w-full h-full" style={{ height: '500px' }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
        onError={(error) => console.error('Canvas error:', error)}
      >
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="gray" />
          </mesh>
        }>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} />
          <pointLight position={[0, 10, 0]} intensity={0.3} />
          <Model />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            minDistance={1}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
