// import { useTexture } from '@react-three/drei'
// import { useLoader } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


import React, { Suspense,useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as constants from '../../constants'
const base_url = constants.base_url

export default function Topku({file, colorfile, bx, by, bz, position, roughness, metalness, envMapIntensity}) {
  const group = useRef();
  //const { scene } = useGLTF(base_url + "/assets/img/3D/bottom/"+file);
  const { scene } = useGLTF("assets/img/3D/bottom/"+file);
  const color = useTexture('assets/img/2D/color/'+colorfile);
  console.log(colorfile);
  //const color = useTexture(base_url + '/assets/img/2D/color/'+colorfile);
  // const geometriku = scene.children[0].geometry;
  // const materialku = scene.children[0].material;

  if(scene.children[0].material) {
    scene.children[0].material.attach = 'Material';
    scene.children[0].material.map = color;
    //scene.children[0].material.envMapIntensity = 0;
    scene.children[0].material.envMapIntensity = 0;
    scene.children[0].material.color = '';
    scene.children[0].material.metalness = 0.7;
    scene.children[0].material.roughness = 0;
    // scene.children[0].material.metalness = metalness;
    // scene.children[0].material.roughness = roughness;
    scene.children[0].scale.set(bx, by, bz);
    scene.children[0].position.set(position[0], position[1], position[2]);
    //console.log("Bottom pos ", scene.children[0].position)
  }
  else{
    scene.children[0].children.map((value) => {
        value.material.attach = 'Material';
        value.material.map = color;
        value.material.envMapIntensity = 0;
        value.material.metalness = 0.8;
        value.material.color = '';
        value.material.roughness = 0;
        value.scale.set(bx, by, bz);
        value.position.set(position[0], position[1], position[2]);
    })
    
  }
  
  return (
      <primitive object={scene}>
        <meshBasicMaterial map={color} toneMapped={false} transparent={false}/>
      </primitive>
    //   <group ref={group} dispose={null}>
        
    //     <directionalLight />
    //     <mesh geometry={geometriku} material={materialku} >
    //       <meshPhysicalMaterial attach="material" map={texture} toneMapped={false} transparent={true}/>
    //     </mesh>
    // </group>
  );
}

// export default function Bottom({ color, file, folder, slug, ...props }) {
//   const { nodes, materials } = useLoader(GLTFLoader, "/dining-table/bottom/"+folder+"/"+file);
//   const texture = useTexture("/color/matte_bronze.jpg")
//   let geometryFile;

//   if (slug == 'cavallo') {
//     geometryFile = nodes.Plane015.geometry
//   } else {
//     geometryFile = nodes.Cube004.geometry
//   }
  
//   const dataGltf = {
//     "cavallo" : {
//       "material" : 'nodes.Plane015.material',
//       "panjang" : 1,
//       "tinggi" : 0.98,
//       "lebar" : 0.5
//     },
//     "spidery" : {
//       "material" : 'nodes.Cube004.material',
//       "panjang" : 1,
//       "tinggi" : 0.98,
//       "lebar" : 1
//     },
//   }
  
//   return (
//     <group {...props} dispose={null}>
//         <mesh geometry={geometryFile} material={dataGltf[slug].material} scale={[dataGltf[slug].panjang, dataGltf[slug].tinggi, dataGltf[slug].lebar]}>
//             <meshPhysicalMaterial
//               map={texture}
//             />
//         </mesh>
//     </group>
//   )
// }