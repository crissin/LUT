import * as THREE from "three";
import { TimelineMax, Power2, TweenMax, Power4 } from "gsap";
import { threedDTo2D } from "./utils";

const fragment = `
uniform float opacity;
uniform float time;
uniform float progress;
uniform float width;
uniform float scaleX;
uniform float scaleY;
uniform float transition;
uniform float radius;
uniform float swipe;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D displacement;
uniform vec4 resolution;
varying vec2 vUv;
varying vec4 vPosition;
vec2 mirrored(vec2 v) {
vec2 m = mod(v,2.);
return mix(m,2.0 - m, step(1.0 ,m));
}
void main()	{
vec2 newUV = (vUv - vec2(0.5))  + vec2(0.5);
vec4 noise = texture2D(displacement, mirrored(newUV+time*0.04));
// float prog = 0.6*progress + 0.2 + noise.g * 0.06;
float prog = progress*0.8 -0.05 + noise.g * 0.06;
float intpl = pow(abs(smoothstep(0., 1., (prog*2. - vUv.x + 0.5))), 10.);

vec4 t1 = texture2D( texture1, (newUV - 0.5) * (1.0 - intpl) + 0.5 ) ;
vec4 t2 = texture2D( texture2, (newUV - 0.5) * intpl + 0.5 );
gl_FragColor = mix( t1, t2, intpl );
 gl_FragColor.a = opacity;
}
`;

const vertex = `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}`;
class VideoPlayerScreen {
  constructor({ opts, scene, texture, currentItemIndex, camera, el }) {
    this.scene = scene;

    this.uniforms = opts.uniforms;
    this.duration = opts.duration || 1;
    this.easing = opts.easing || "easeInOut";

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.texture = texture;
    this.time = 0;
    this.current = 0;
    this.currentItemIndex = 3;

    this.camera = camera;
    this.el = el;

    this.paused = true;
    this.initiate(() => {
      //    this.setupResize();
      this.settings();
      this.addObjects();
      //    this.resize();
      //  this.clickEvent();
      this.play();
    });
    console.log("  this.texture", this.texture);
  }
  initiate(cb) {
    cb();
  }

  settings() {
    this.settings = { progress: 0.5 };

    Object.keys(this.uniforms).forEach((item) => {
      this.settings[item] = this.uniforms[item].value;
    });
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      transparent: true,
      //  opacity: 0.275,
      uniforms: {
        opacity: { type: "f", value: 1 },
        time: { type: "f", value: 0 },
        progress: { type: "f", value: 0 },
        border: { type: "f", value: 0 },
        intensity: { type: "f", value: 0 },
        scaleX: { type: "f", value: 40 },
        scaleY: { type: "f", value: 40 },
        transition: { type: "f", value: 40 },
        swipe: { type: "f", value: 0 },
        width: { type: "f", value: 0 },
        radius: { type: "f", value: 0 },
        texture1: { type: "f", value: this.texture },
        texture2: { type: "f", value: this.texture },
        displacement: {
          type: "f",
          value: new THREE.TextureLoader().load(
            `${process.env.PUBLIC_URL}/static/img21.jpeg`
          ),
        },
        resolution: { type: "v4", value: new THREE.Vector4() },
      },

      // wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32);

    this.plane = new THREE.Mesh(this.geometry, this.material);

    this.plane.position.z = -28;

    this.threedDTo2D = threedDTo2D({
      camera: this.camera,
      mesh: this.plane,
      domElement: this.el,
    });

    this.threedDTo2D.setBounds();

    this.scene.add(this.plane);
  }

  onResize() {
    this.threedDTo2D.setBounds();
  }

  updatePosition(y) {
    this.threedDTo2D.updatePosition(y);
  }

  stop() {
    this.paused = true;
  }

  play() {
    this.paused = false;
  }

  next({ texture }) {
    let tl = new TimelineMax();
    this.texture = texture;
    if (this.isRunning) tl.kill();

    //  if (this.isRunning) return;
    this.isRunning = true;
    let nextTexture = this.texture;
    this.material.uniforms.texture2.value = nextTexture;
    tl.to(this.material.uniforms.progress, this.duration, {
      value: 1,
      ease: Power2[this.easing],
      onComplete: () => {
        this.material.uniforms.texture1.value = nextTexture;
        this.material.uniforms.progress.value = 0;
        this.isRunning = false;
      },
    });
  }
}
export default VideoPlayerScreen;
