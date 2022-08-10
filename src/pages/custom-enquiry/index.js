import { useLayoutEffect, useEffect, useState, useRef, Suspense } from "react";
import axios from "axios";
import { Top, Bottom } from "../../components";
import { formatRupiah } from "../../utils";
import * as constants from "../../constants";
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";
//import { BakeShadows, OrbitControls, Stage, Html, PerspectiveCamera } from '@react-three/drei'
import { BakeShadows, Stage, Html } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "tw-elements";

const base_url = constants.base_url;
// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const CustomEnquiry = () => {
  const [azimuthAngle, setAzimuthAngle] = useState(0);
  const [polarAngle, setPolarAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const controls = useRef();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function Loader() {
    return <Html center>Please wait..</Html>;
  }

  const [isOpenTopTable, setIsOpenTopTable] = useState(false);
  function showTopTable() {
    setIsOpenTopTable(!isOpenTopTable);
    setIsOpenEdge(false);
    setIsOpenMarblePattern(false);
    setIsOpenDimension(false);
    setIsOpenLegTable(false);
    setIsOpenDesign(false);
    setIsOpenColor(false);
  }

  const [isOpenEdge, setIsOpenEdge] = useState(false);
  function showEdge() {
    setIsOpenEdge(!isOpenEdge);
    setIsOpenMarblePattern(false);
    setIsOpenDimension(false);
    setIsOpenDesign(false);
    setIsOpenColor(false);
  }
  const [shapeId, setShapeId] = useState(0);
  const [shapeType, setShapeType] = useState(0);
  const [threeDTop, setThreeDTop] = useState(0);
  const [selectedShape, setSelectedShape] = useState(" . . . . . ");
  function selectShape(id, type, anything) {
    setShapeId(id);
    setShapeType(type);
    setSelectedShape(anything);
    setSelectedEdge(" . . . . . ");
    setDimensionId(0);
    setMarblePatternId(0);
    setMaterialId(0);
    setPriceTableLeg(0);
    setThreeDLeg(0);
  }
  const [selectedEdge, setSelectedEdge] = useState(" . . . . . ");
  function selectEdge(anything, threeD) {
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setSelectedEdge(anything);
    setDimensionId(0);
    setMarblePatternId(0);
    setThreeDTop(threeD);
  }

  const [isOpenDimension, setIsOpenDimension] = useState(false);
  const [bgDimension, setBgDimension] = useState("");
  useEffect(
    function () {
      if (selectedEdge == " . . . . . ") {
        setBgDimension("bg-[#ddd]");
        setSelectedDimension({ name: " . . . . . ", panjang: 0, lebar: 0 });
      } else {
        setBgDimension("bg-[#fff]");
      }
    },
    [selectedEdge]
  );
  function showDimension() {
    if (selectedEdge == " . . . . . ") {
      setIsOpenDimension(false);
    } else {
      setIsOpenEdge(false);
      setIsOpenMarblePattern(false);
      setIsOpenDimension(!isOpenDimension);
      setIsOpenDesign(false);
      setIsOpenColor(false);
    }
  }
  const [dimensionId, setDimensionId] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState({ name: " . . . . . ", panjang: 0, lebar: 0, positionBottom: [] });

  const [scaleB, setScaleB] = useState({
    scale_x: 1,
    scale_y: 1,
    scale_z: 1,
  });
  const [scaleT, setScaleT] = useState({
    scale_x: 1,
    scale_y: 1,
    scale_z: 1,
  });

  const [positionB, setPositionB] = useState({
    scale_x: 1,
    scale_y: 1,
    scale_z: 1,
  });
  const [positionT, setPositionT] = useState({
    scale_x: 1,
    scale_y: 1,
    scale_z: 1,
  });

  const [scale_x_awal_top, setScaleX_awal_top] = useState(0);
  const [scale_y_awal_top, setScaleY_awal_top] = useState(0);
  const [scale_z_awal_top, setScaleZ_awal_top] = useState(0);

  const [scale_x_awal_bottom, setScaleX_awal_bottom] = useState(0);
  const [scale_y_awal_bottom, setScaleY_awal_bottom] = useState(0);
  const [scale_z_awal_bottom, setScaleZ_awal_bottom] = useState(0);

  let posB = [[0, 0.4, 0]];
  function selectDimension(id, anything, panjang, lebar, index) {
    //if(controls.current){
    setAzimuthAngle(controls.current.getAzimuthalAngle());
    setPolarAngle(controls.current.getPolarAngle());
    //}
    setDimensionId(id);
    setSelectedDimension({ name: anything, panjang, lebar, positionBottom: posB[index] });
    setMarblePatternId(0);
  }

  const [isOpenMarblePattern, setIsOpenMarblePattern] = useState(false);
  const [bgMarblePattern, setBgMarblePattern] = useState("");
  useEffect(
    function () {
      if (selectedDimension.name == " . . . . . ") {
        setBgMarblePattern("bg-[#ddd]");
        setSelectedMarblePattern(" . . . . . ");
      } else {
        setBgMarblePattern("bg-[#fff]");
      }
    },
    [selectedDimension]
  );
  function showMarblePattern() {
    if (selectedDimension.name == " . . . . . ") {
      setIsOpenMarblePattern(false);
    } else {
      setIsOpenEdge(false);
      setIsOpenMarblePattern(!isOpenMarblePattern);
      setIsOpenDimension(false);
      setIsOpenDesign(false);
      setIsOpenColor(false);
    }
  }
  const [marblePatternId, setMarblePatternId] = useState(0);
  const [threeDTexture, setThreeDTexture] = useState(0);
  const [selectedMarblePattern, setSelectedMarblePattern] = useState(" . . . . . ");
  function selectMarblePattern(id, anything, threeD) {
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setMarblePatternId(id);
    setSelectedMarblePattern(anything);
    setThreeDTexture(threeD);
  }

  const [isOpenLegTable, setIsOpenLegTable] = useState(false);
  function showLegTable() {
    setIsOpenTopTable(false);
    setIsOpenEdge(false);
    setIsOpenMarblePattern(false);
    setIsOpenDimension(false);
    setIsOpenLegTable(!isOpenLegTable);
    setIsOpenDesign(false);
    setIsOpenColor(false);
  }

  const [isOpenDesign, setIsOpenDesign] = useState(false);
  const [bgDesign, setBgDesign] = useState("");
  useEffect(
    function () {
      if (selectedMarblePattern == " . . . . . ") {
        setBgDesign("bg-[#ddd]");
        setSelectedMaterial(" . . . . . ");
        setSelectedDesign(" . . . . . ");
      } else {
        setBgDesign("bg-[#fff]");
      }
    },
    [selectedMarblePattern]
  );
  function showDesign() {
    if (selectedMarblePattern == " . . . . . ") {
      setIsOpenDesign(false);
    } else {
      setIsOpenEdge(false);
      setIsOpenMarblePattern(false);
      setIsOpenDimension(false);
      setIsOpenDesign(!isOpenDesign);
      setIsOpenColor(false);
    }
  }
  const [materialId, setMaterialId] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(" . . . . . ");
  function selectMaterial(id, anything) {
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setMaterialId(id);
    setSelectedMaterial(anything);
    setSelectedDesign(" . . . . . ");
    setDesignId(0);
    setThreeDColor(0);
    setPriceTableLeg(0);
  }
  const [selectedDesign, setSelectedDesign] = useState(" . . . . . ");
  const [threeDLeg, setThreeDLeg] = useState(0);
  const [designId, setDesignId] = useState(0);
  function selectDesign(id, price, anything, threeD) {
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setDesignId(id);
    setPriceTableLeg(price);
    setSelectedDesign(anything);
    setThreeDLeg(threeD);
  }

  const [isHideAccordionColor, setIsHideAccordionColor] = useState(false);
  useEffect(
    function () {
      if (selectedMaterial == "Steel") {
        setIsHideAccordionColor(false);
      } else if (selectedMaterial == "Marble") {
        setIsHideAccordionColor(true);
      }
    },
    [selectedMaterial]
  );
  const [isOpenColor, setIsOpenColor] = useState(false);
  const [bgColor, setBgColor] = useState("");
  useEffect(
    function () {
      if (selectedDesign == " . . . . . ") {
        setBgColor("bg-[#ddd]");
        setSelectedColor(" . . . . . ");
      } else {
        setBgColor("bg-[#fff]");
      }
    },
    [selectedDesign]
  );
  useEffect(
    function () {
      if ((selectedMaterial == "Marble") & (selectedDesign !== " . . . . . ")) {
        setSelectedColor(selectedMarblePattern);
      }
    },
    [selectMaterial, selectedDesign]
  );
  function showColor() {
    if (selectedDesign == " . . . . . ") {
      setIsOpenColor(false);
    } else {
      setIsOpenEdge(false);
      setIsOpenMarblePattern(false);
      setIsOpenDimension(false);
      setIsOpenDesign(false);
      setIsOpenColor(!isOpenColor);
    }
  }
  const [selectedColor, setSelectedColor] = useState(" . . . . . ");
  const [threeDColor, setThreeDColor] = useState(0);
  function selectColor(anything, threeD) {
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setSelectedColor(anything);
    setThreeDColor(threeD);
  }

  const [shapes, setShapes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  const [marblePatterns, setMarblePatterns] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [colors, setColors] = useState([]);

  const [priceTableTop, setPriceTableTop] = useState([]);
  const [priceTableLeg, setPriceTableLeg] = useState(0);

  useEffect(function () {
    // async function tableOfDefault() {
    //   const response = await axios.get(base_url+'/table-default')
    //     setShapeId(response.data.data[0].topthreed.id_master_top)
    //     setShapeType(response.data.data[0].topsize.type_top)
    //     setDimensionId(response.data.data[0].topsize.id_seaters)
    //     setMarblePatternId(response.data.data[0].texture.id)
    //     setMaterialId(response.data.data[0].material_bottom.id)
    //     setDesignId(response.data.data[0].kaki.id)
    //     setThreeDTop(response.data.data[0].topthreed.three_d_file)
    //     setThreeDTexture(response.data.data[0].texture.texture)
    //     setThreeDLeg(response.data.data[0].kaki.file_three_d)
    //     setThreeDColor(response.data.data[0].color.file)
    // }
    // tableOfDefault()

    setShapeId(1);
    setShapeType(1);
    setDimensionId(1);
    setMarblePatternId(49);
    setMaterialId(1);
    setDesignId(10);
    setThreeDTop("rectangle_slim.gltf");
    setThreeDTexture("kkjdfsdqe234sdf.png");
    setThreeDLeg("kakitypexnospace.gltf");
    setThreeDColor("mskdhfasoeufw4534kl.jpg");
    setSelectedShape("Rectangle");
    setSelectedEdge("Slim");
    setSelectedDimension({ name: "4 Seaters", panjang: 0, lebar: 0 });
    setSelectedMarblePattern("Perletto Royale");
    setSelectedMaterial("Steel");
    setSelectedDesign("Type x");
    setSelectedColor("Black Gloss");
    setPriceTableLeg(17000000);
  }, []);

  useEffect(function () {
    async function tableOfShape() {
      const response = await axios.get(base_url + "/top");
      setShapes(response.data.data);
    }
    tableOfShape();
  }, []);

  useEffect(
    function () {
      async function tableOfEdge() {
        const response = await axios.get(base_url + "/topthreed/get-by-top/" + shapeId);
        console.log(response.data.data);
        setEdges(response.data.data);
      }
      tableOfEdge();

      if (selectedShape == "Rectangle") {
        setShapeId(1);
        setShapeType(1);
        setDimensionId(1);
        setMarblePatternId(49);
        setMaterialId(1);
        setDesignId(10);
        setThreeDTop("rectangle_slim.gltf");
        setThreeDTexture("kkjdfsdqe234sdf.png");
        setThreeDLeg("kakitypexnospace.gltf");
        setThreeDColor("mskdhfasoeufw4534kl.jpg");
        setSelectedShape("Rectangle");
        setSelectedEdge("Slim");
        setSelectedDimension({ name: "4 Seaters", panjang: 0, lebar: 0 });
        setSelectedMarblePattern("Perletto Royale");
        setSelectedMaterial("Steel");
        setSelectedDesign("Type x");
        setSelectedColor("Black Gloss");
        setPriceTableLeg(17000000);
      }

      if (selectedShape == "Rounded Corner") {
        setShapeId(3);
        setShapeType(1);
        setDimensionId(1);
        setMarblePatternId(49);
        setMaterialId(1);
        setDesignId(10);
        setThreeDTop("rounded_corner_slim.gltf");
        setThreeDTexture("kkjdfsdqe234sdf.png");
        setThreeDLeg("kakitypexnospace.gltf");
        setThreeDColor("mskdhfasoeufw4534kl.jpg");
        setSelectedShape("Rounded Corner");
        setSelectedEdge("Slim");
        setSelectedDimension({ name: "4 Seaters", panjang: 0, lebar: 0 });
        setSelectedMarblePattern("Perletto Royale");
        setSelectedMaterial("Steel");
        setSelectedDesign("Type x");
        setSelectedColor("Black Gloss");
        setPriceTableLeg(17000000);
      }
    },
    [selectedShape]
  );

  useEffect(
    function () {
      async function tableOfDimension() {
        const response = await axios.get(base_url + "/seaters/get-by-type/" + shapeId);
        setDimensions(response.data.data);
        setAutoRotate(false);
      }
      tableOfDimension();
    },
    [selectedEdge]
  );

  useEffect(
    function () {
      async function tableOfMarblePattern() {
        const response = await axios.get(base_url + "/texture/get-texture-by-seaters/" + dimensionId);
        setMarblePatterns(response.data.data);
      }
      tableOfMarblePattern();
    },
    [selectedDimension]
  );

  const idPatternDimension = marblePatternId + "/" + dimensionId;

  useEffect(
    function () {
      async function tableOfMaterial() {
        const response = await axios.get(base_url + "/material-bottom");
        setMaterials(response.data.data);
        setAutoRotate(false);
      }
      tableOfMaterial();
    },
    [selectedMarblePattern]
  );

  useEffect(
    function () {
      async function tableOfDesign() {
        const response = await axios.get(base_url + "/kaki/get-by-typetop-material/" + shapeType + "/" + materialId);
        setDesigns(response.data.data);
      }
      tableOfDesign();
    },
    [selectedMaterial]
  );

  useEffect(
    function () {
      async function tableOfScaleT() {
        const response = await axios.get(base_url + "/topscale/get-top-scale-by-seaters-top/" + dimensionId + "/" + shapeType);
        setScaleT(response.data.data);
      }
      tableOfScaleT();

      async function tableOfScaleB() {
        const response = await axios.get(base_url + "/bottomscale/get-bottom-scale-by-seaters-kaki/" + dimensionId + "/" + designId);
        setScaleB(response.data.data);
        setAutoRotate(false);
      }
      tableOfScaleB();

      async function tableOfPositionT() {
        const response = await axios.get(base_url + "/topposition/get-top-position-by-seaters-top/" + dimensionId + "/" + shapeType);
        setPositionT(response.data.data);
      }
      tableOfPositionT();

      async function tableOfPositionB() {
        const response = await axios.get(base_url + "/bottomposition/get-bottom-position-by-seaters-kaki/" + dimensionId + "/" + designId);
        setPositionB(response.data.data);
        setAutoRotate(false);
      }
      tableOfPositionB();
    },
    [selectedDimension, selectedDesign]
  );

  useEffect(
    function () {
      async function tableOfColor() {
        const response = await axios.get(base_url + "/color/get-by-material/" + materialId);
        setColors(response.data.data);
      }
      tableOfColor();

      async function tableOfPriceTableTop() {
        const response = await axios.get(base_url + "/texture/get-texture-by-id/" + idPatternDimension);
        setPriceTableTop(response.data.harga_jual_seaters);
        setAutoRotate(false);
      }
      tableOfPriceTableTop();
    },
    [selectedDesign]
  );

  useEffect(() => {
    setAutoRotate(false);
  }, [selectedColor]);

  useEffect(() => {
    setTimeout(() => {
      if (!autoRotate) setAutoRotate(true);
    }, 300);
  }, [autoRotate]);

  const canvas = useRef();

  const handleEndRotate = () => {
    setAzimuthAngle(controls.current.getAzimuthalAngle());
    setPolarAngle(controls.current.getPolarAngle());
    setAutoRotate(false);
  };

  const CameraControl = () => {
    const {
      camera,
      gl: { domElement },
    } = useThree();

    useFrame((state) => {
      controls.current.rotateSpeed = 0.5;
      controls.current.autoRotate = autoRotate;
      controls.current.update();
    });
    return (
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        maxPolarAngle={autoRotate == true ? Number.INFINITY : polarAngle}
        maxAzimuthAngle={autoRotate == true ? Number.INFINITY : azimuthAngle}
        minPolarAngle={autoRotate == true ? Number.INFINITY : polarAngle}
        minAzimuthAngle={autoRotate == true ? Number.INFINITY : azimuthAngle}
      />
    );
  };

  return (
    // <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] ' + (isOpenMarblePattern === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
    <div className="lg:h-screen overflow-hidden p-4 lg:flex lg:justify-between standing:justify-normal standing:block">
      <div
        className={
          "lg:h-[calc(100vh-34px)] sm:h-[50vh] h-[50vh] standing:h-[50vh] lg:w-1/2 lg:my-auto lg:mx-0 standing:w-full grid grid-cols-1 justify-center content-center mx-auto relative shadow-[inset_0_-5px_20px_rgba(0,0,0,0.1)] rounded-[15px] " +
          ((isOpenEdge | isOpenDimension | isOpenMarblePattern | isOpenDesign | isOpenColor) === true ? "sm:static fixed h-auto w-auto z-20" : "")
        }
      >
        <img className="absolute top-2 left-2 h-[30px] z-10" src="/assets/icons/logo.svg" alt="" />

        {(threeDTop == 0) | (threeDTexture == 0) | (threeDLeg == 0) | (threeDColor == 0) | (scaleT.scale_x == undefined) | (scaleB.scale_x == undefined) ? (
          <h1 className="w-full h-full sm:px-20 px-8 font-jakarta xl:text-3xl md:text-2xl text-xl tracking-[2px] uppercase text-center">Create your own design by yourself</h1>
        ) : (
          <div className="lg:h-[calc(100vh-34px)] sm:h-[40vh] h-[30vh] standing:h-[50vh] w-full">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 0], fov: 50 }}>
              <CameraControl />
              <Suspense fallback={<Loader />}>
                <ambientLight intensity={0.1} />
                <Stage>
                  <Top file={threeDTop} texturefile={threeDTexture} scale={1} brightness={0} position={[positionT.position_x, positionT.position_y, positionT.position_z]} tx={scaleT.scale_x} ty={scaleT.scale_y} tz={scaleT.scale_z} />
                  <Bottom file={threeDLeg} colorfile={threeDColor} scale={1} position={[positionB.position_x, positionB.position_y, positionB.position_z]} bx={scaleB.scale_x} by={scaleB.scale_y} bz={scaleB.scale_z} />
                </Stage>
                <BakeShadows />
              </Suspense>
              {/* <OrbitControls autoRotate target={[0,1,0]} /> */}
            </Canvas>
          </div>
        )}
      </div>

      <div className="lg:w-[43%] lg:pt-0 standing:w-full standing: pt-4 mx-auto flex flex-col">
        <div className="lg:block sm:flex sm:justify-between gap-2 standing:flex standing:justify-between">
          <div className="relative w-full mb-2">
            <div
              className={
                "relative h-[45px] px-4 py-2 mb-1 border border-primary cursor-pointer after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                (isOpenTopTable === true ? "text-white bg-primary after:top-[19px] after:border-white after:rotate-45" : "after:top-[16px] after:border-black after:rotate-[225deg]")
              }
              onClick={showTopTable}
            >
              <h4 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[2px]">TABLE TOP</h4>
            </div>

            <div className={isOpenTopTable === true ? "opacity-100 visible h-auto" : "opacity-0 invisible h-0"}>
              <div className="flex flex-col">
                {/* SHAPE */}
                <div className={"sm:mb-1 " + (isOpenEdge === true ? "order-0 sm:static fixed sm:h-auto h-[calc(100vh-302px)] sm:w-auto w-[100vw] bg-white left-0 bottom-0 sm:px-0 px-4 sm:z-0 z-20" : "order-1")}>
                  <div
                    className={
                      "relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                      (isOpenEdge === true ? "text-white bg-primary after:top-[21px] after:border-white after:rotate-45" : "after:top-[18px] after:border-black after:rotate-[225deg]")
                    }
                    onClick={showEdge}
                  >
                    Shape
                    <br />
                    <span className="font-lato text-xs tracking-[3%]">{selectedShape + " , " + selectedEdge}</span>
                  </div>

                  <div className={"border-x border-b border-primary " + (isOpenEdge === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                    <div className="flex gap-4 flex-wrap justify-center font-lato md:text-sm text-xs tracking-[3%] pb-3">
                      <p className="cursor-pointer" onClick={selectShape.bind(this, 0, 0, " . . . . . ", 0)}>
                        &nbsp; Shape :{" "}
                      </p>
                      {shapes.map(function (shape, index) {
                        return (
                          <div className="cursor-pointer flex items-center gap-1" key={index} onClick={selectShape.bind(this, shape.id, shape.type, shape.name)}>
                            <span className={"h-3 w-3 rounded-full border outline outline-1 outline-black " + (shape.name == selectedShape ? "bg-primary" : " bg-white")}></span>
                            <p>{shape.name}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="lg:h-[calc(100vh-415px)] h-[40vh] w-auto overflow-auto scrollbar-custom">
                      {shapeId == 0 ? (
                        <p className="font-lato md:text-sm text-xs tracking-[3%] mt-5" onClick={selectEdge.bind(this, " . . . . . ")}>
                          &nbsp; Please choose the shape first.. &nbsp;{" "}
                        </p>
                      ) : (
                        <div>
                          {edges.map(function (edges, index) {
                            const three_d_file = edges.three_d_file;
                            edges = edges.Edge;
                            return (
                              <button
                                className={"w-full text-left py-3 border-b border-[#D9D9D9] cursor-pointer lg:flex lg:justify-between hover:bg-[#FFF3E5] " + (edges.name == selectedEdge ? "bg-[#FFF3E5]" : "bg-white")}
                                key={index}
                                onClick={selectEdge.bind(this, edges.name, three_d_file)}
                              >
                                <h6 className="font-lato md:text-sm text-xs tracking-[3%]">&nbsp; {edges.name} &nbsp;</h6>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* DIMENTION */}
                <div className={"sm:mb-1 " + (isOpenDimension === true ? "order-0 sm:static fixed sm:h-auto h-[calc(100vh-302px)] sm:w-auto w-[100vw] bg-white left-0 bottom-0 sm:px-0 px-4 sm:z-0 z-20" : "order-2")}>
                  <div
                    className={
                      "relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                      (isOpenDimension === true ? "text-white bg-primary after:top-[21px] after:border-white after:rotate-45" : "text-black " + bgDimension + " after:top-[18px] after:border-black after:rotate-[225deg]")
                    }
                    onClick={showDimension}
                  >
                    Dimension
                    <br />
                    <span className="font-lato text-xs tracking-[3%]">{selectedDimension.name}</span>
                  </div>

                  <div className={"border-x border-b border-primary " + (isOpenDimension === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                    {shapeId == 2 ? (
                      <div className="lg:h-[calc(100vh-383px)] h-[252px] w-auto overflow-auto scrollbar-custom">
                        {dimensions.map(function (dimension, index) {
                          if (index > 0) posB.push([0, posB[index - 1][1] - 0.2, 0]);
                          //console.log("Position Botttom ",posB)
                          return (
                            <button
                              className={"w-full text-left pt-3 border-b border-[#D9D9D9] cursor-pointer flex justify-between hover:bg-[#FFF3E5] " + (dimension.name == selectedDimension.name ? "bg-[#FFF3E5]" : "bg-white")}
                              key={index}
                              onClick={selectDimension.bind(this, dimension.id, dimension.name, dimension.panjang, dimension.lebar, index)}
                            >
                              <h6 className="font-lato md:text-sm text-xs tracking-[3%] mb-3">&nbsp; {dimension.name} &nbsp;</h6>
                              <span className="self-end font-lato text-xs tracking-[3%] mb-1 text-[#8D8A8A]">&nbsp; Diameter {dimension.diameter + "cm"} &nbsp;</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="lg:h-[calc(100vh-383px)] h-[252px] w-auto overflow-auto scrollbar-custom">
                        {dimensions.map(function (dimension, index) {
                          return (
                            <button
                              className={"w-full text-left pt-3 border-b border-[#D9D9D9] cursor-pointer flex justify-between hover:bg-[#FFF3E5] " + (dimension.name == selectedDimension.name ? "bg-[#FFF3E5]" : "bg-white")}
                              key={index}
                              onClick={selectDimension.bind(this, dimension.id, dimension.name, dimension.panjang, dimension.lebar)}
                            >
                              <h6 className="font-lato md:text-sm text-xs tracking-[3%] mb-3">&nbsp; {dimension.name} &nbsp;</h6>
                              <span className="self-end font-lato text-xs tracking-[3%] mb-1 text-[#8D8A8A]">&nbsp; {dimension.panjang + "cm (P) x " + dimension.lebar + "cm (L)"} &nbsp;</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* MARBLE PATTERN */}
                <div className={"sm:mb-1 " + (isOpenMarblePattern === true ? "order-0 sm:static fixed sm:h-auto h-[calc(100vh-302px)] sm:w-auto w-[100vw] bg-white left-0 bottom-0 sm:px-0 px-4 sm:z-0 z-20" : "order-3")}>
                  <div
                    className={
                      "relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                      (isOpenMarblePattern === true ? "text-white bg-primary after:top-[21px] after:border-white after:rotate-45" : "text-black " + bgMarblePattern + " after:top-[18px] after:border-black after:rotate-[225deg]")
                    }
                    onClick={showMarblePattern}
                  >
                    Marble pattern
                    <br />
                    <span className="font-lato text-xs tracking-[3%]">{selectedMarblePattern}</span>
                  </div>

                  <div className={"border-x border-b border-primary " + (isOpenMarblePattern === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                    <div className="lg:h-[calc(100vh-383px)] h-[252px] w-auto overflow-auto scrollbar-custom pb-2 grid md:grid-cols-3 grid-cols-2 gap-1 items-start">
                      {marblePatterns.map(function (marblePattern, index) {
                        return (
                          <button
                            className={"relative flex flex-col items-center cursor-pointer border " + (marblePattern.name == selectedMarblePattern ? "border-primary" : "border-white")}
                            key={index}
                            onClick={selectMarblePattern.bind(this, marblePattern.id, marblePattern.name, marblePattern.texture)}
                          >
                            <img src={"assets/img/2D/texture/" + marblePattern.texture} alt="" />
                            <p className="font-lato text-xs text-center">{marblePattern.name}</p>
                            <img className={"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[50%] " + (marblePattern.name == selectedMarblePattern ? "" : "hidden")} src="/assets/icons/IconChecklist.svg" alt="" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div
              className={
                "relative h-[45px] px-4 py-2 mb-1 border border-primary cursor-pointer after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                (isOpenLegTable === true ? "text-white bg-primary after:top-[19px] after:border-white after:rotate-45" : "after:top-[16px] after:border-black after:rotate-[225deg]")
              }
              onClick={showLegTable}
            >
              <h4 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[2px]">TABLE LEG</h4>
            </div>

            <div className={isOpenLegTable === true ? "opacity-100 visible h-auto" : "opacity-0 invisible h-0"}>
              <div className="flex flex-col">
                {/* DESIGN */}
                <div className={"sm:mb-1 " + (isOpenDesign === true ? "order-0 sm:static fixed sm:h-auto h-[calc(100vh-302px)] sm:w-auto w-[100vw] bg-white left-0 bottom-0 sm:px-0 px-4 sm:z-0 z-20" : "order-1")}>
                  <div
                    className={
                      "relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                      (isOpenDesign === true ? "text-white bg-primary after:top-[21px] after:border-white after:rotate-45" : "text-black " + bgDesign + " after:top-[18px] after:border-black after:rotate-[225deg]")
                    }
                    onClick={showDesign}
                  >
                    Design
                    <br />
                    <span className="font-lato text-xs tracking-[3%]">{selectedDesign}</span>
                  </div>

                  <div className={"border-x border-b border-primary " + (isOpenDesign === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                    <div className="flex gap-4 flex-wrap justify-center font-lato md:text-sm text-xs tracking-[3%] pb-3">
                      <p className="cursor-pointer" onClick={selectMaterial.bind(this, 0, " . . . . . ")}>
                        &nbsp; Material :{" "}
                      </p>
                      {materials.map(function (material, index) {
                        return (
                          <div className="cursor-pointer flex items-center gap-1" key={index} onClick={selectMaterial.bind(this, material.id, material.name)}>
                            <span className={"h-3 w-3 rounded-full border outline outline-1 outline-black " + (material.name == selectedMaterial ? "bg-primary" : " bg-white")}></span>
                            <p>{material.name}</p>
                          </div>
                        );
                      })}
                    </div>
                    {materialId == 0 ? (
                      <div className="lg:h-[calc(100vh-415px)] h-[220px] w-auto overflow-auto scrollbar-custom pb-2">
                        <p className="font-lato md:text-sm text-xs tracking-[3%] mt-5" onClick={selectDesign.bind(this, " . . . . . ")}>
                          &nbsp; Please choose the material first.. &nbsp;{" "}
                        </p>
                      </div>
                    ) : (
                      <div className="lg:h-[calc(100vh-415px)] h-[220px] w-auto overflow-auto scrollbar-custom pb-2 grid md:grid-cols-3 grid-cols-2 gap-1 items-start">
                        {designs.map(function (design, index) {
                          return (
                            <button
                              className={"relative flex flex-col items-center cursor-pointer border " + (design.nama == selectedDesign ? "border-primary" : "border-white")}
                              key={index}
                              onClick={selectDesign.bind(this, design.id, design.harga, design.nama, design.file_three_d)}
                            >
                              <img src={base_url + "/assets/img/2D/kaki/" + design.file_two_d} alt="" />
                              <p className="font-lato text-xs text-center">{design.nama}</p>
                              <img className={"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[50%] " + (design.nama == selectedDesign ? "" : "hidden")} src="/assets/icons/IconChecklist.svg" alt="" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* COLOR */}
                <div className={"sm:mb-1 " + (isOpenColor === true ? "order-0 sm:static fixed sm:h-auto h-[calc(100vh-302px)] sm:w-auto w-[100vw] bg-white left-0 bottom-0 sm:px-0 px-4 sm:z-0 z-20" : "order-1")}>
                  {isHideAccordionColor === true ? (
                    <div>
                      <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] " + bgColor}>
                        Color
                        <br />
                        <span className="font-lato text-xs tracking-[3%]">{selectedColor}</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        className={
                          "relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                          (isOpenColor === true ? "text-white bg-primary after:top-[21px] after:border-white after:rotate-45" : "text-black " + bgColor + " after:top-[18px] after:border-black after:rotate-[225deg]")
                        }
                        onClick={showColor}
                      >
                        Color
                        <br />
                        <span className="font-lato text-xs tracking-[3%]">{selectedColor}</span>
                      </div>

                      <div className={"border-x border-b border-primary " + (isOpenColor === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                        <div className="lg:h-[calc(100vh-383px)] h-[252px] w-auto overflow-auto scrollbar-custom">
                          {colors.map(function (color, index) {
                            return (
                              <button
                                className={"w-full text-left py-3 border-b border-[#D9D9D9] cursor-pointer lg:flex lg:justify-between hover:bg-[#FFF3E5] " + (color.name == selectedColor ? "bg-[#FFF3E5]" : "bg-white")}
                                key={index}
                                onClick={selectColor.bind(this, color.name, color.file)}
                              >
                                <h6 className="font-lato md:text-sm text-xs tracking-[3%]">&nbsp; {color.name} &nbsp;</h6>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:mt-auto mt-2 font-jakarta md:text-sm text-xs sm:flex sm:gap-5 ">
          {/* <div className="w-full flex justify-between">
            <span>Table Top :</span>
            <span className="text-right font-semibold">{formatRupiah(priceTableTop)}</span>
          </div>
          <div className="w-full flex justify-between">
            <span>Table Leg :</span>
            <span className="text-right font-semibold">{formatRupiah(priceTableLeg)}</span>
          </div> */}
          <div>
            <div className="w-full flex justify-between">
              <span>Price :</span>
              <span className="text-right font-semibold">{formatRupiah(priceTableTop + priceTableLeg)}</span>
            </div>
            <p className="text-xs my-1 text-right text-[#3a3a3a]">Estimated Working Time 17 - 21 Days</p>
          </div>
          <button className="block ml-auto font-bold text-center border-[3px] border-white bg-primary text-white py-2 px-5 rounded-[15px]">
            <a href="https://wa.me/+6282273386665" target="_blank">
              Call for Enquiry
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomEnquiry;
