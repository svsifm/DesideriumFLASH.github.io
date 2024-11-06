/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Fragmentoestrella extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "fragmentoestrella",
        "./Fragmentoestrella/costumes/fragmentoestrella.png",
        { x: 360, y: 360 }
      ),
      new Costume(
        "fragmentoestrella_naranja",
        "./Fragmentoestrella/costumes/fragmentoestrella_naranja.png",
        { x: 360, y: 360 }
      ),
      new Costume(
        "fragmentoestrella_rosa",
        "./Fragmentoestrella/costumes/fragmentoestrella_rosa.png",
        { x: 360, y: 360 }
      ),
      new Costume(
        "fragmentoestrella_morado",
        "./Fragmentoestrella/costumes/fragmentoestrella_morado.png",
        { x: 360, y: 360 }
      ),
      new Costume(
        "fragmentoestrella_azul",
        "./Fragmentoestrella/costumes/fragmentoestrella_azul.png",
        { x: 360, y: 360 }
      ),
      new Costume(
        "fragmentoestrella_verde",
        "./Fragmentoestrella/costumes/fragmentoestrella_verde.png",
        { x: 360, y: 360 }
      ),
    ];

    this.sounds = [
      new Sound("aparece", "./Fragmentoestrella/sounds/aparece.wav"),
      new Sound("desaparece", "./Fragmentoestrella/sounds/desaparece.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
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
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.mensajeFinnivel = 0;
    this.stage.vars.fragmentoestrellaAparecio = 0;
    this.stage.vars.fragmentoestrellaSonidoa = 0;
    this.stage.vars.fragmentoestrellaDesaparecio = 0;
    this.stage.vars.fragmentoestrellaSonidod = 0;
    while (!(this.toNumber(this.stage.vars.mensajeFinnivel) === 1)) {
      if (this.toNumber(this.stage.vars.fragmentoestrellaSonidoa) === 1) {
        yield* this.playSoundUntilDone("aparece");
        this.stage.vars.fragmentoestrellaAparecio = 1;
        this.stage.vars.fragmentoestrellaSonidoa = 0;
      }
      if (this.toNumber(this.stage.vars.fragmentoestrellaSonidod) === 1) {
        yield* this.playSoundUntilDone("desaparece");
        this.stage.vars.fragmentoestrellaDesaparecio = 1;
        this.stage.vars.fragmentoestrellaSonidod = 0;
      }
      yield;
    }
  }

  *whenIReceiveNivel1() {
    this.stage.vars.vidalilian = 5000;
    this.stage.vars.vidacompletarecuperada = 0;
    this.costume = "fragmentoestrella";
    while (!(this.toNumber(this.stage.vars.mensajeFinnivel) === 1)) {
      if (this.compare(this.stage.vars.vidalilian, 5000) < 0) {
        this.stage.vars.vidacompletarecuperada = 0;
        this.stage.vars.fragmentoestrellaAparecio = 0;
        this.stage.vars.fragmentoestrellaDesaparecio = 0;
        this.goto(this.random(-240, 240), this.random(-180, 180));
        this.goto(this.x, -60);
        if (this.toNumber(this.stage.vars.fragmentoestrellaAparecio) === 0) {
          this.stage.vars.fragmentoestrellaSonidoa = 1;
        } else {
          this.stage.vars.fragmentoestrellaSonidoa = 0;
        }
        while (!(this.toNumber(this.stage.vars.vidacompletarecuperada) === 1)) {
          this.visible = true;
          this.costumeNumber++;
          if (this.touching(this.sprites["Lilian"].andClones())) {
            this.stage.vars.vidalilian += 500;
            this.visible = false;
            if (
              this.toNumber(this.stage.vars.fragmentoestrellaDesaparecio) === 0
            ) {
              this.stage.vars.fragmentoestrellaSonidod = 1;
            } else {
              this.stage.vars.fragmentoestrellaSonidod = 0;
            }
            if (this.toNumber(this.stage.vars.vidalilian) === 5000) {
              this.stage.vars.vidacompletarecuperada = 1;
            } else {
              this.stage.vars.fragmentoestrellaAparecio = 0;
              this.stage.vars.fragmentoestrellaDesaparecio = 0;
              this.goto(this.random(-240, 240), this.random(-180, 180));
              this.goto(this.x, -60);
              yield* this.wait(3);
              if (
                this.toNumber(this.stage.vars.fragmentoestrellaAparecio) === 0
              ) {
                this.stage.vars.fragmentoestrellaSonidoa = 1;
                this.stage.vars.fragmentoestrellaDesaparecio = 0;
              } else {
                this.stage.vars.fragmentoestrellaSonidoa = 0;
              }
            }
          }
          yield;
        }
      }
      yield;
    }
  }

  *whenIReceiveFinnivel() {
    this.stage.vars.vidacompletarecuperada = 1;
    this.stage.vars.mensajeFinnivel = 1;
    this.visible = false;
    return;
  }
}