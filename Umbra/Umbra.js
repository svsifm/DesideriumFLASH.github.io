/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Umbra extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Umbra", "./Umbra/costumes/Umbra.png", { x: 360, y: 360 }),
      new Costume(
        "UmbraAtacante_idle",
        "./Umbra/costumes/UmbraAtacante_idle.png",
        { x: 360, y: 360 }
      ),
      new Costume(
        "UmbraAtacante_ataque",
        "./Umbra/costumes/UmbraAtacante_ataque.png",
        { x: 360, y: 360 }
      ),
    ];

    this.sounds = [
      new Sound("Umbra_pasos", "./Umbra/sounds/Umbra_pasos.wav"),
      new Sound("Chomp", "./Umbra/sounds/Chomp.wav"),
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "FinNivel" },
        this.whenIReceiveFinnivel
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Nivel1" },
        this.whenIReceiveNivel1
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Nivel2" },
        this.whenIReceiveNivel2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "UmbraAtaca" },
        this.whenIReceiveUmbraataca
      ),
    ];
  }

  *whenIReceiveFinnivel() {
    this.stage.vars.mensajeFinnivel = 1;
    this.stage.vars.umbraCaminando = 0;
    this.visible = false;
    return;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.umbraCaminando = 0;
    this.stage.vars.mensajeFinnivel = 0;
    while (!(this.toNumber(this.stage.vars.mensajeFinnivel) === 1)) {
      if (this.toNumber(this.stage.vars.musicaNivel1) === 1) {
        if (this.toNumber(this.stage.vars.umbraCaminando) === 1) {
          yield* this.playSoundUntilDone("Umbra_pasos");
        }
      } else {
        this.visible = false;
      }
      yield;
    }
  }

  *whenIReceiveNivel1() {
    this.costume = "Umbra";
    yield* this.wait(3);
    this.size = 20;
    this.visible = true;
    this.goto(270, -100);
    while (!(this.toNumber(this.stage.vars.mensajeFinnivel) === 1)) {
      if (this.compare(this.stage.vars.obstCulos, 3) < 0) {
        this.x -= 4;
      }
      if (
        this.toNumber(this.stage.vars.obstCulos) === 3 ||
        this.compare(this.stage.vars.obstCulos, 3) > 0
      ) {
        this.x -= 5;
      }
      if (this.touching(this.sprites["Lilian"].andClones())) {
        this.broadcast("daño");
        this.stage.vars.vidalilian -= 500;
        this.stage.vars.umbraCaminando = 0;
        this.visible = false;
        yield* this.wait(1);
        this.goto(270, -100);
        this.visible = true;
      }
      if (this.compare(this.x, 260) < 0) {
        this.stage.vars.umbraCaminando = 1;
      }
      if (this.compare(this.x, -260) < 0) {
        this.stage.vars.obstCulos++;
        this.stage.vars.umbraCaminando = 0;
        this.visible = false;
        yield* this.wait(1);
        this.goto(270, -100);
        this.visible = true;
      }
      yield;
    }
  }

  *whenIReceiveNivel2() {
    this.costume = "UmbraAtacante_idle";
    this.size = 50;
    yield* this.wait(3);
    this.visible = true;
    this.goto(50, -60);
    yield* this.wait(2);
    while (!(this.toNumber(this.stage.vars.mensajeFinalizar) === 1)) {
      this.broadcast("UmbraAtaca");
      yield* this.wait(2);
      this.costume = "UmbraAtacante_idle";
      yield* this.wait(3);
      yield;
    }
  }

  *whenIReceiveUmbraataca() {
    this.costume = "UmbraAtacante_ataque";
    this.size = 50;
    if (this.toNumber(this.stage.vars.musicaNivel2) === 1) {
      yield* this.playSoundUntilDone("Chomp");
      if (this.touching(this.sprites["Lilian"].andClones())) {
        this.broadcast("daño");
        this.stage.vars.vidalilian -= 500;
      }
    }
  }
}