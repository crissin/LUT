import React, { useState } from "react";
import { LutPlayer } from "components/lutPlayer";
import { LUTCubeLoader } from "three/examples/jsm/loaders/LUTCubeLoader.js";
import { VideoTexture } from "three";
import { createVideo } from "components/lutPlayer/utils";

const lutMap = {
  "log3g10_rec709_1.CUBE": null,
};

const App = () => {
  const [isReady, setIsReady] = useState(false); // integer state
  const LUT_COUNT = 1;

  const videoTexture = new VideoTexture(
    createVideo(`${process.env.PUBLIC_URL}/static/video/21125831246.mp4`)
  );

  return (
    <>
      {Object.keys(lutMap).forEach((name, index) => {
        new LUTCubeLoader().load(
          `${process.env.PUBLIC_URL}/luts/` + name,
          function (result) {
            lutMap[name] = result;
            index + 1 === LUT_COUNT && setIsReady(true);
          }
        );
      })}
      {isReady && <LutPlayer lutMap={lutMap} videoTexture={videoTexture} />}
    </>
  );
};

export default App;
