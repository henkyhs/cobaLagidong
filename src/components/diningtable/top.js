
// import { useTexture } from '@react-three/drei'
// import { useLoader } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// export default function Top({ color, fillTexture, ...props }) {
//   const { nodes, materials } = useLoader(GLTFLoader, "/dining-table-2/felice/top/topfelice.gltf");
//   const texture = useTexture("/texture/"+fillTexture)
//   return (
//     <group {...props} dispose={null}>
//         <mesh geometry={nodes.Plane012.geometry} material={materials['Material.002']}>
//             <meshPhysicalMaterial
//                 map={texture}
//                 envMapIntensity={0}
//             />
//         </mesh>
//     </group>
//   )
// }

import React, { Suspense,useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as constants from '../../constants'
const base_url = constants.base_url

export default function Topku({file, texturefile, tx, ty, tz, position}) {
  const group = useRef();
  
  //const { scene } = useGLTF(base_url + "/assets/img/3D/top/"+file);
  const { scene } = useGLTF("assets/img/3D/top/"+file);
  //const texture = useTexture(base_url + '/assets/img/2D/texture/'+texturefile);
  const texture = useTexture('assets/img/2D/texture/'+texturefile);
  // const geometriku = scene.children[0].geometry;
  // const materialku = scene.children[0].material;
  //console.log("Position", position)
  scene.children[0].material.attach = 'Material';
  scene.children[0].material.map = texture;
  scene.children[0].material.envMapIntensity = 0;
  scene.children[0].material.color = '';
  scene.children[0].material.metalness = 0.8;
  scene.children[0].material.roughness = 5;
  scene.children[0].scale.set(tx, ty, tz);
  scene.children[0].position.set(position[0], position[1], position[2]);
  // scene.children[0].material.map.offset.set(0, 0);
  scene.children[0].material.map.repeat.set(1, 1);
  scene.children[0].material.map.center.set(0.5,0.5);
  scene.children[0].material.map.rotation = -1.5707963268;
  scene.children[0].material.map.flipY = false;
  // scene.children[0].material.map.wrapS = 0;
  // scene.children[0].material.map.wrapT = 0;
  //scene.children[0].material.map.wrapT = 100;
  //console.log("Top Position", scene.children[0].position)
  //console.log("bottom", tx, ty, tz)
  //console.log(scene.children[0].material.map)
  
  return (
      <primitive object={scene}>
        <meshBasicMaterial map={texture} toneMapped={false} transparent={false} rotation={10} />
      </primitive>
    //   <group ref={group} dispose={null}>
        
    //     <directionalLight />
    //     <mesh geometry={geometriku} material={materialku} >
    //       <meshPhysicalMaterial attach="material" map={texture} toneMapped={false} transparent={true}/>
    //     </mesh>
    // </group>
  );
}
