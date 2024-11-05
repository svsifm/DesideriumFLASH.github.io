import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Lilian from "./Lilian/Lilian.js";
import Umbra from "./Umbra/Umbra.js";
import Meteorito from "./Meteorito/Meteorito.js";
import Fragmentoestrella from "./Fragmentoestrella/Fragmentoestrella.js";
import BotonJugar from "./BotonJugar/BotonJugar.js";
import BotonSalir from "./BotonSalir/BotonSalir.js";
import Cursor from "./Cursor/Cursor.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Lilian: new Lilian({
    x: 70,
    y: -50,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.LEFT_RIGHT,
    costumeNumber: 1,
    size: 50,
    visible: false,
    layerOrder: 6,
  }),
  Umbra: new Umbra({
    x: 141,
    y: -100,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 50,
    visible: false,
    layerOrder: 7,
  }),
  Meteorito: new Meteorito({
    x: -202,
    y: -171,
    direction: 180,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 30,
    visible: false,
    layerOrder: 1,
  }),
  Fragmentoestrella: new Fragmentoestrella({
    x: 223,
    y: -60,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 6,
    size: 20,
    visible: false,
    layerOrder: 2,
  }),
  BotonJugar: new BotonJugar({
    x: 0,
    y: -35,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: true,
    layerOrder: 3,
  }),
  BotonSalir: new BotonSalir({
    x: 0,
    y: -105,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 4,
  }),
  Cursor: new Cursor({
    x: -125,
    y: -35,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 20,
    visible: true,
    layerOrder: 5,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
