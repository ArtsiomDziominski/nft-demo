<template>
  <div class="main-block">
    <div class="main-block__body">
      <div class="description-block">
        <h1 class="main-block__title">
          Buy NFT and start making passive income
        </h1>
        <p>Anthurium it is a company which integrated of innovative technologies that simplify and enhance the process
          of earning while ensuring safety.</p>
        <button class="main-button">MINT NFT <img src="~/assets/images/ready-to-get/arrow.svg" alt="arrow up"></button>
      </div>
      <div class="wrapper-canvas" ref="wrapperCanvas">
        <canvas ref="canvas"/>
      </div>

      <!--      <CardNFT class="card" :is-minting="true">-->
      <!--        <template #button>-->
      <!--          <NuxtLink to="/mint">-->
      <!--            <v-btn class="card__button" :color="mainGreen">-->
      <!--              Mint-->
      <!--            </v-btn>-->
      <!--          </NuxtLink>-->
      <!--        </template>-->
      <!--      </CardNFT>-->
    </div>
<!--    <MainGridImage/>-->
  </div>
</template>

<script setup lang="ts">
import MainGridImage from "~/components/main/MainGridImage";
import CardNFT from "~/components/CardNFT";
import {
  BoxGeometry, CameraHelper,
  Color, DirectionalLight,
  Fog,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three"
import {onMounted, Ref, ref} from "vue";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const canvas: Ref<HTMLCanvasElement> = ref(null);
const bgColor = new Color('#121212')
const scene = new Scene();
scene.fog = new Fog(bgColor, 0.1, 75);
scene.background = bgColor;


const wrapperCanvas = ref(null);


const light = new DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
light.shadow.camera.top = 2;
light.shadow.camera.bottom = -2;
light.shadow.camera.left = -2;
light.shadow.camera.right = 2;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 40;
light.castShadow = true; // default false
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.receiveShadow = true;
scene.add(light);

let textureLoader = new TextureLoader();
let renderer
let controls
let cube
let camera
let width
let height

const size = 800;


// const gridHelper = new GridHelper( size, divisions );
// scene.add( gridHelper );

const glfLoader = new GLTFLoader();
glfLoader.load('/cube/scene.gltf', (gltf) => {
  const model = gltf.scene;
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      // child.material = new MeshPhongMaterial({
      //   map: map,
      //   color: '#a6ff00',
      // });
      console.log(child)
    }
  })

  cube = gltf

  scene.add(model);

})

onMounted(() => {
  width = wrapperCanvas.value.clientWidth
  height = wrapperCanvas.value.clientHeight
  camera = new PerspectiveCamera(75, width / height, 0.3, 1000);
  camera.position.set(0, 0, 3)
  scene.add(camera)
  setRenderer();
  loop()
  animate();
})

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(loop)
}

const animate = () => {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.002;
  // cube.rotation.y += 0.002;
  renderer.render(scene, camera);
};

function setRenderer() {
  if (canvas.value) {
    renderer = new WebGLRenderer({canvas: canvas.value, alpha: true});
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio * 4)
    renderer.shadowMap.enabled = true;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    const geometry = new BoxGeometry(1.5, 1.5, 1.5);
    // const materials = [
    //   new MeshBasicMaterial({
    //     color: '#658d1b',
    //     transparent: false,
    //     opacity: 0.2
    //   }),
    //   new MeshBasicMaterial({
    //     color: '#658d1b',
    //     transparent: false,
    //     opacity: 0.2
    //   }),
    //   new MeshBasicMaterial({
    //     color: '#658d1b',
    //     transparent: false,
    //     opacity: 0.2
    //   }),
    //   new MeshBasicMaterial({
    //     color: '#658d1b',
    //     transparent: false,
    //     opacity: 0.2
    //   }),
    //   new MeshBasicMaterial({
    //     color: '#658d1b',
    //     transparent: false,
    //     opacity: 0.2
    //   }),
    //   new MeshBasicMaterial({
    //     color: '#658d1b',
    //     transparent: false,
    //     opacity: 0.2
    //   }),
    // ];

    cube = new Mesh(geometry, new MeshBasicMaterial({
      color: '#658d1b',
      transparent: false,
      opacity: 1
    }));
    // cube.castShadow = true;
    // cube.receiveShadow = true;
    // scene.add(cube);


    // const helper = new CameraHelper(light.shadow.camera);
    // scene.add(helper);
    updateRenderer();
  }
}

function updateRenderer() {
  renderer.setSize(width, height);
  renderer.render(scene, camera)
}

</script>


<style scoped lang="scss">
.main-block {
  position: relative;
  height: 100%;
  min-height: calc(100vh - 56px);
  width: 100vw;
  overflow: hidden;

  &__body {
    height: 100%;
    min-height: 100vh;
    width: 100%;
    min-width: 100vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 50px 0 50px 50px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 255, 0);
    z-index: 10;

    .description-block {
      max-width: 40%;
      display: flex;
      flex-direction: column;
      gap: 50px;

      .main-block__title {
        font-size: 52px;
        margin: 0 0 30px 0;
        background: -webkit-linear-gradient(var(--main-green), #04E8FFFF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      p {
        font-size: 25px;
        font-weight: 600;
      }

      .main-button {
        width: 250px;
      }
    }

    .wrapper-canvas {
      width: 60%;
      height: 100%;
      min-height: 100vh;
    }

    .card {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;

      &__button {
        margin-top: 20px;
        color: var(--text-color);
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .main-block {

    &__body {
      flex-direction: column;
      justify-content: center;
      gap: 50px;
      padding: 80px 10px 50px 10px;

      .main-block__title {
        width: 90%;
        margin: 0;
        font-size: 30px;
        text-align: center;
      }

      .card {

        &__button {

        }
      }
    }
  }
}

</style>
