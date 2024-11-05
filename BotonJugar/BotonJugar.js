/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BotonJugar extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "boton_Jugar_normal",
        "./BotonJugar/costumes/boton_Jugar_normal.png",
        { x: 200, y: 60 }
      ),
      new Costume(
        "boton_Jugar_seleccion",
        "./BotonJugar/costumes/boton_Jugar_seleccion.png",
        { x: 200, y: 60 }
      ),
      new Costume(
        "boton_Jugar_eleccion",
        "./BotonJugar/costumes/boton_Jugar_eleccion.png",
        { x: 200, y: 60 }
      ),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Nivel1" },
        this.whenIReceiveNivel1
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    while (true) {
      this.costume = "boton_Jugar_normal";
      if (this.touching(this.sprites["Cursor"].andClones())) {
        this.costume = "boton_Jugar_seleccion";
        if (this.keyPressed("g")) {
          this.costume = "boton_Jugar_eleccion";
        }
      }
      yield;
    }
  }

  *whenIReceiveNivel1() {
    this.visible = false;
  }
}
