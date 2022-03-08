import React, { useState } from "react";
import { LutPlayer } from "components/lutPlayer";
import { LUTCubeLoader } from "three/examples/jsm/loaders/LUTCubeLoader.js";
import { VideoTexture } from "three";
import { createVideo } from "components/lutPlayer/utils";

const lutMap = {
  "Arabica_12.CUBE": null,
  "Ava 614.CUBE": null,
  "Azrael 93.CUBE": null,
  "Bourbon 64.CUBE": null,
  "Byers 11.CUBE": null,
  "Chemical 168.CUBE": null,
  "Clayton 33.CUBE": null,
  "Clouseau 54.CUBE": null,
  "Cobi 3.CUBE": null,
  "Contrail 35.CUBE": null,
  "Cubicle 99.CUBE": null,
  "Django 25.CUBE": null,
  "Domingo 145.CUBE": null,
  "Faded 47.CUBE": null,
  "Folger 50.CUBE": null,
  "Fusion 88.CUBE": null,
  "Hyla 68.CUBE": null,
  "Korben 214.CUBE": null,
  "Lenox 340.CUBE": null,
  "Lucky 64.CUBE": null,
  "McKinnon 75.CUBE": null,
  "Milo 5.CUBE": null,
  "Neon 770.CUBE": null,
  "Paladin 1875.CUBE": null,
  "Pasadena 21.CUBE": null,
  "Pitaya 15.CUBE": null,
  "Reeve 38.CUBE": null,
  "Remy 24.CUBE": null,
  "Sprocket 231.CUBE": null,
  "Teigen 28.CUBE": null,
  "Trent 18.CUBE": null,
  "Tweed 71.CUBE": null,
  "Vireo 37.CUBE": null,
  "Zed 32.CUBE": null,
  "Zeke 39.CUBE": null,
};

const App = () => {
  const [isReady, setIsReady] = useState(false); // integer state
  const LUT_COUNT = 34;

  const videoTexture = new VideoTexture(
    createVideo(`${process.env.PUBLIC_URL}/static/video/1125831246.mp4`)
  );

  return (
    <>
      {Object.keys(lutMap).forEach((name, index) => {
        new LUTCubeLoader().load(
          `${process.env.PUBLIC_URL}/luts/` + name,
          function (result) {
            lutMap[name] = result;
            index === LUT_COUNT && setIsReady(true);
          }
        );
      })}
      {isReady && <LutPlayer lutMap={lutMap} videoTexture={videoTexture} />}
    </>
  );
};

export default App;
