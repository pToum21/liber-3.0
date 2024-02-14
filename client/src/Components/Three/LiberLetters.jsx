import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { MeshBasicMaterial, PlaneGeometry, TextureLoader } from 'three';
import { Text } from '@react-three/drei';

import diarmuidTexture from '../../../public/3dModels/diarmuid.png';

const Letters = (props) => {
  const { nodes, materials } = useGLTF('/3dModels/liberLetters.glb');
  const [hoveredMeshes, setHoveredMeshes] = useState([]);
  const texture = new TextureLoader().load(diarmuidTexture);

  // Add a scale prop to the group
  const groupScale = 70;

  const handleMeshHover = (meshName) => {
    if (!hoveredMeshes.includes(meshName)) {
      setHoveredMeshes((prevHovered) => [...prevHovered, meshName]);

      // Check if all meshes have been hovered over
      if (hoveredMeshes.length === 5) {
        // Display the image or trigger some other action
        console.log('All meshes hovered over. Display image!');
      }
    }
  };

  useGLTF.preload('/3dModels/liberLetters.glb');

  return (
    <group {...props} dispose={null} scale={[groupScale, groupScale, groupScale]}>
      <mesh
        geometry={nodes.L.geometry}
        material={materials['Material.004']}
        position={[3, 6, -0.132]}
        rotation={[2.001, 0.467, -0.101]}
        onPointerOver={() => handleMeshHover('L')}
      />
      <mesh
        geometry={nodes.i.geometry}
        material={materials['Material.003']}
        position={[-7, 6, -0.477]}
        rotation={[1.141, 0, 0]}
        onPointerOver={() => handleMeshHover('i')}
      />
      <mesh
        geometry={nodes.d.geometry}
        material={materials['Material.005']}
        position={[1.044, 3, 9]}
        rotation={[0.954, -0.118, -2.977]}
        onPointerOver={() => handleMeshHover('d')}
      />
      <mesh
        geometry={nodes.e.geometry}
        material={materials['Material.002']}
        position={[1.7, 1.5, 0.12]}
        rotation={[6, -1, 5]}
        onPointerOver={() => handleMeshHover('e')}
      />
      <mesh
        geometry={nodes.r.geometry}
        material={materials['Material.001']}
        position={[-5, 3, 9]}
        rotation={[6, 7, 11110]}
        onPointerOver={() => handleMeshHover('r')}
      />

      {/* Display the image using a plane geometry */}
      {hoveredMeshes.length === 5 && (
        <>
          <mesh position={[.2, 2.6, 2]} rotation={[0, .2, 0]} scale={[.5, .5, .5]}>
            <planeGeometry args={[5, 5]} />
            <meshBasicMaterial map={texture} transparent />
          </mesh>

          {/* Display text above the image */}
          <Text
            position={[.4, 3.9, 3]}
            rotation={[0, .2, 0]} 
            color="#8abbb1"
            fontSize={0.4}
            maxWidth={4}
            lineHeight={1.3}
            letterSpacing={0.01}
            textAlign="center"
          >
            Thank You For Everything Diarmuid and Meg You Guys are Goats
          </Text>
        </>
      )}
    </group>
  );
};

export default Letters;
