import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

const BookShelf = (props) => {
  const group = useRef();
  const camera = useThree((state) => state.camera);
  const { nodes, materials } = useGLTF('/3dModels/bookshelf.glb');
  const [zoomedIn, setZoomedIn] = useState(false);

  const handleDeskClick = () => {
    setZoomedIn(!zoomedIn);
  };

  useFrame(() => {
    if (zoomedIn) {
      // Zoom in the camera
      camera.position.z = 230;
      camera.position.x = 20;
      camera.position.y = 120;



    } else {
      // Reset camera position when not zoomed in
      camera.position.set(100, 150, 400);
    }
  });

  return (
    <group ref={group} {...props} dispose={null} onClick={handleDeskClick}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.Light} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_3.geometry} material={materials['Mat.1']} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_4.geometry} material={materials['Mat.10']} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_5.geometry} material={materials['Mat.11']} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_6.geometry} material={materials['Mat.9']} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_7.geometry} material={materials['Book.001']} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_8.geometry} material={materials.Book2} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_9.geometry} material={materials.Book3} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_10.geometry} material={materials.Dark} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_11.geometry} material={materials.Dark} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_12.geometry} material={materials.Light} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_13.geometry} material={materials.Main_wood} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_14.geometry} material={materials.Main_wood} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_15.geometry} material={materials.Main_wood2} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_16.geometry} material={materials['Mat.1']} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_17.geometry} material={materials['Mat.12']} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_18.geometry} material={materials['Mat.3']} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_19.geometry} material={materials['Mat.4']} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_20.geometry} material={materials['Mat.6']} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_21.geometry} material={materials['Mat.7']} rotation={[-1.574, 0, 0]} />
      <mesh geometry={nodes.Object_22.geometry} material={materials['Mat.8']} rotation={[-1.574, 0, 0]} />
    </group>
  );
};

export default BookShelf;

// Preload the 3D model
useGLTF.preload('/3dModels/bookshelf.glb');
