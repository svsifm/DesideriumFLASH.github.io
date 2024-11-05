/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Lilian extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Lilian_idle", "./Lilian/costumes/Lilian_idle.png", {
        x: 360,
        y: 360,
      }),
      new Costume("Lilian_salto", "./Lilian/costumes/Lilian_salto.png", {
        x: 360,
        y: 360,
      }),
      new Costume(
        "LilianAtacante_idle",
        "./Lilian/costumes/LilianAtacante_idle.png",
        { x: 360, y: 360 }
      ),
      new Costume(
        "LilianAtacante_ataque",
        "./Lilian/costumes/LilianAtacante_ataque.png",
        { x: 360, y: 360 }
      ),
    ];

    this.sounds = [
      new Sound("roblox_oof", "./Lilian/sounds/roblox_oof.wav"),
      new Sound("Lilian_pasos", "./Lilian/sounds/Lilian_pasos.wav"),
      new Sound("Lilian_salto", "./Lilian/sounds/Lilian_salto.wav"),
      new Sound("Bonk", "./Lilian/sounds/Bonk.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "space" },
        this.whenKeySpacePressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "left arrow" },
        this.whenKeyLeftArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "right arrow" },
        this.whenKeyRightArrowPressed
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Nivel1" },
        this.whenIReceiveNivel1
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "FinNivel" },
        this.whenIReceiveFinnivel
      ),
      new Trigger(Trigger.BROADCAST, { name: "daño" }, this.whenIReceiveDaO),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Nivel2" },
        this.whenIReceiveNivel2
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "f" }, this.whenKeyFPressed),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.lilianCaminando = 0;
    this.stage.vars.lilianVolando = 0;
    this.stage.vars.mensajeFinalizar = 0;
    while (!(this.toNumber(this.stage.vars.mensajeFinalizar) === 1)) {
      if (
        (this.keyPressed("left arrow") || this.keyPressed("right arrow")) &&
        this.toNumber(this.stage.vars.lilianVolando) === 0
      ) {
        this.stage.vars.lilianCaminando = 1;
      } else {
        this.stage.vars.lilianCaminando = 0;
      }
      if (this.toNumber(this.stage.vars.lilianCaminando) === 1) {
        if (
          this.toNumber(this.stage.vars.musicaNivel1) === 1 ||
          this.toNumber(this.stage.vars.musicaNivel2) === 1
        ) {
          yield* this.playSoundUntilDone("Lilian_pasos");
        }
      }
      if (this.keyPressed("space")) {
        if (this.toNumber(this.stage.vars.musicaNivel1) === 1) {
          this.stage.vars.lilianVolando = 1;
        }
      }
      if (this.toNumber(this.stage.vars.lilianVolando) === 1) {
        if (this.toNumber(this.stage.vars.musicaNivel1) === 1) {
          yield* this.playSoundUntilDone("Lilian_salto");
        }
      }
      yield;
    }
  }

  *whenKeySpacePressed() {
    if (this.toNumber(this.stage.vars.musicaNivel1) === 1) {
      this.costume = "Lilian_salto";
      yield* this.glide(0.3, this.x, this.y + 100);
      yield* this.wait(0.5);
      yield* this.glide(1.2, this.x, this.y + -100);
      this.costume = "Lilian_idle";
      this.stage.vars.lilianVolando = 0;
    }
  }

  *whenKeyLeftArrowPressed() {
    if (
      this.toNumber(this.stage.vars.musicaNivel1) === 1 ||
      this.toNumber(this.stage.vars.musicaNivel2) === 1
    ) {
      this.direction = -90;
      this.move(10);
    }
  }

  *whenKeyRightArrowPressed() {
    if (
      this.toNumber(this.stage.vars.musicaNivel1) === 1 ||
      this.toNumber(this.stage.vars.musicaNivel2) === 1
    ) {
      this.direction = 90;
      this.move(10);
    }
  }

  *whenIReceiveNivel1() {
    this.visible = true;
    this.costume = "Lilian_idle";
    this.direction = 90;
    this.goto(0, -50);
  }

  *whenIReceiveFinnivel() {
    this.stage.vars.lilianCaminando = 0;
    this.stage.vars.lilianVolando = 0;
    this.visible = false;
    return;
  }

  *whenIReceiveDaO() {
    yield* this.playSoundUntilDone("roblox_oof");
  }

  *whenIReceiveNivel2() {
    yield* this.wait(3);
    this.visible = true;
    this.costume = "LilianAtacante_idle";
    this.direction = 90;
    this.goto(-150, -20);
  }

  *whenKeyFPressed() {
    if (this.toNumber(this.stage.vars.musicaNivel2) === 1) {
      this.costume = "LilianAtacante_ataque";
      if (this.touching(this.sprites["Umbra"].andClones())) {
        this.stage.vars.vidaumbra -= 250;
        yield* this.startSound("Bonk");
      }
      yield* this.wait(0.5);
      this.costume = "LilianAtacante_idle";
    }
  }
}
