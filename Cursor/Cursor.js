/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cursor extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("cursor", "./Cursor/costumes/cursor.png", { x: 360, y: 360 }),
    ];

    this.sounds = [
      new Sound("Pop", "./Cursor/sounds/Pop.wav"),
      new Sound("Connect", "./Cursor/sounds/Connect.wav"),
      new Sound("Disconnect", "./Cursor/sounds/Disconnect.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "up arrow" },
        this.whenKeyUpArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "down arrow" },
        this.whenKeyDownArrowPressed
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "g" }, this.whenKeyGPressed),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.goto(-125, -35);
  }

  *whenKeyUpArrowPressed() {
    if (this.toNumber(this.stage.vars.musicaInicio) === 1) {
      yield* this.startSound("Pop");
      this.goto(-125, -35);
    }
  }

  *whenKeyDownArrowPressed() {
    if (this.toNumber(this.stage.vars.musicaInicio) === 1) {
      yield* this.startSound("Pop");
      this.goto(-125, -105);
    }
  }

  *whenKeyGPressed() {
    if (this.touching(this.sprites["BotonJugar"].andClones())) {
      yield* this.playSoundUntilDone("Connect");
      this.stage.costume = "Fondo_PlanetaEspacio";
      this.broadcast("Nivel1");
    }
    if (this.touching(this.sprites["BotonSalir"].andClones())) {
      yield* this.playSoundUntilDone("Disconnect");
      /* TODO: Implement stop all */ null;
    }
    this.visible = false;
  }
}
