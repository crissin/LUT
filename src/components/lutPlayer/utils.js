import * as THREE from "three";

export const createVideo = (srcURL) => {
  const video = document.createElement("video");
  video.crossOrigin = "anonymous";
  video.loop = true;
  video.muted = true;
  video.src = srcURL;
  video.setAttribute("webkit-playsinline", "webkit-playsinline");
  video.play();
  return video;
};

let vec = new THREE.Vector3();

export const rotateCamera = ({ camera, cameraZ, mouse, reset }) => {
  // have to shift z when move to prevent clipping

  camera.position.lerp(vec.set(mouse.x * 9, 3 + mouse.y * 1, cameraZ), 0.05);

  camera.lookAt(0, 0, 0);
};

export const threedDTo2D = ({ camera, mesh, domElement }) => {
  let camUnit;
  let bounds;

  const calculateUnitSize = (distance = mesh.position.z) => {
    const vFov = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * distance;
    const width = height * camera.aspect;

    return { width, height };
  };

  const updateSize = () => {
    camUnit = calculateUnitSize(camera.position.z - mesh.position.z);

    const x = bounds.width / window.innerWidth;
    const y = bounds.height / window.innerHeight;

    if (!x || !y) return;

    mesh.scale.x = camUnit.width * x;
    mesh.scale.y = camUnit.height * y;
  };

  const setBounds = () => {
    const rect = domElement.getBoundingClientRect();

    bounds = {
      left: rect.left,
      top: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
    };

    updateSize();
    updatePosition();
  };

  const updatePosition = (y) => {
    updateY(y);
    updateX(0);
  };

  const updateY = (y = 0) => {
    const { top } = bounds;

    mesh.position.y = camUnit.height / 2 - mesh.scale.y / 2;
    mesh.position.y -= ((top - y) / window.innerHeight) * camUnit.height;
  };

  const updateX = (x = 0) => {
    const { left } = bounds;

    mesh.position.x = -(camUnit.width / 2) + mesh.scale.x / 2;
    mesh.position.x += ((left + x) / window.innerWidth) * camUnit.width;
  };

  return {
    setBounds,
    updatePosition,
  };
};
