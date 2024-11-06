/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BotonSalir extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "boton_Salir_normal",
        "./BotonSalir/costumes/boton_Salir_normal.png",
        { x: 200, y: 60 }
      ),
      new Costume(
        "boton_Salir_seleccion",
        "./BotonSalir/costumes/boton_Salir_seleccion.png",
        { x: 200, y: 60 }
      ),
      new Costume(
        "boton_Salir_eleccion",
        "./BotonSalir/costumes/boton_Salir_eleccion.png",
        { x: 200, y: 60 }
      ),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Nivel1" },
        this.whenIReceiveNivel1
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Salir" },
        this.whenIReceiveSalir
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenIReceiveNivel1() {
    this.visible = false;
  }
  
  *whenIReceiveSalir() {
    this.stopAllSounds();  // Detener los sonidos
    this.broadcast("Salir");  // Se notifica a Stage que el juego debe pausar
    this.stopAll();
  } 
  
  *whenGreenFlagClicked() {
    this.visible = true;
    while (true) {
      this.costume = "boton_Salir_normal";
      if (this.touching(this.sprites["Cursor"].andClones())) {
        this.costume = "boton_Salir_seleccion";
        if (this.keyPressed("g")) {
          this.costume = "boton_Salir_eleccion";
        }
      }
      yield;
    }
  }
}
