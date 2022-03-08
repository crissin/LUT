import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import VideoPlayerScreen from "./videoPlayerScreen";
import styled from "styled-components/macro";
import { EffectComposer } from "three/examples/jsm//postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { LUTPass } from "three/examples/jsm/postprocessing/LUTPass.js";
import { LUTCubeLoader } from "three/examples/jsm/loaders/LUTCubeLoader.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { Dropdown } from "./dropdown";
import useAnimationFrame from "use-animation-frame";

export const LutPlayer = ({ lutMap, videoTexture }) => {
  const sceneRef = new THREE.Scene();
  const cameraRef = new THREE.PerspectiveCamera(45, 1, 0.1, 900);
  const renderer = new THREE.WebGLRenderer({
    //    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });

  const canvasRef = useRef();
  const videoPlayerScreenRef = useRef(null);
  const tvDivRef = useRef(null); // ref for dom element for scale / position
  const composerRef = useRef();
  const lutPassRef = useRef();

  const [selection, setSelection] = useState("log3g10_rec709_1.CUBE");

  useEffect(() => {
    const CAMERA_Z = 50;

    cameraRef.position.z = CAMERA_Z;

    sceneRef.add(cameraRef);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0);

    lutPassRef.current = new LUTPass();
    lutPassRef.current.renderToScreen = true;

    composerRef.current = new EffectComposer(renderer);
    composerRef.current.setPixelRatio(window.devicePixelRatio);
    composerRef.current.setSize(window.innerWidth, window.innerHeight);
    composerRef.current.addPass(new RenderPass(sceneRef, cameraRef));
    composerRef.current.addPass(new ShaderPass(GammaCorrectionShader));

    composerRef.current.addPass(lutPassRef.current);

    canvasRef.current = renderer.domElement;
    canvasRef.current.classList.add("main-canvas");
    document.body.appendChild(canvasRef.current);

    cameraRef.aspect = window.innerWidth / window.innerHeight;
    cameraRef.updateProjectionMatrix();

    videoPlayerScreenRef.current = new VideoPlayerScreen({
      scene: sceneRef,
      texture: videoTexture,
      opts: {
        duration: 1.5,
        debug: false,
        easing: "easeOut",
        uniforms: {
          // width: {value: 0.35, type:'f', min:0., max:1},
        },
      },
      camera: cameraRef,
      el: tvDivRef.current,
    });

    const onResize = () => {
      cameraRef.aspect = window.innerWidth / window.innerHeight;
      cameraRef.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      videoPlayerScreenRef.current.onResize();
    };

    const addEventListeners = () => {
      window.addEventListener("resize", onResize);
    };

    addEventListeners();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateLUT = () => {
    const lut = lutMap[selection];
    lutPassRef.current.lut = lut.texture3D;
  };

  // assigned lut on mount
  useEffect(() => {
    updateLUT();
  }, []);

  useAnimationFrame(
    (e) => {
      updateLUT();
      composerRef.current.render();
    },
    [selection]
  );

  return (
    <Container>
      <CanvasContainer ref={canvasRef} />
      <VideoPlayerContainer>
        <VideoPlayer ref={tvDivRef} />
      </VideoPlayerContainer>

      <Dropdown lutMap={lutMap} setSelection={setSelection} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 0;
  zindex: 2;
  textalign: center;
  width: 100%;
  height: 100vh;
`;

const CanvasContainer = styled.div`
  height: 100vh;
  width: 100vw;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  zindex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const VideoPlayer = styled.div`
  height: calc(600vw / 16);
  width: calc(600vw / 9);
  backgroundcolor: none;
  opacity: 0;
`;

const VideoPlayerContainer = styled.div`
  display: flex;
  alignitems: center;
  justifycontent: center;
  height: 100vh;
`;
