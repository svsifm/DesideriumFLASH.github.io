/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Meteorito extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("meteorito", "./Meteorito/costumes/meteorito.png", {
        x: 360,
        y: 360,
      }),
    ];

    this.sounds = [
      new Sound("meteorito_caida", "./Meteorito/sounds/meteorito_caida.wav"),
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
    ];
  }

  *whenIReceiveFinnivel() {
    this.stage.vars.mensajeFinnivel = 1;
    this.visible = false;
    return;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.meteoritoCayendo = 0;
    this.stage.vars.mensajeFinnivel = 0;
    while (!(this.toNumber(this.stage.vars.mensajeFinnivel) === 1)) {
      if (this.toNumber(this.stage.vars.musicaNivel1) === 1) {
        if (this.toNumber(this.stage.vars.meteoritoCayendo) === 1) {
          yield* this.playSoundUntilDone("meteorito_caida");
          if (this.toNumber(this.stage.vars.meteoritoCayendo) === 0) {
            this.audioEffects.clear();
          }
        }
      } else {
        this.visible = false;
      }
      yield;
    }
  }

  *whenIReceiveNivel1() {
    this.stage.vars.obstCulos = 0;
    while (!(this.toNumber(this.stage.vars.mensajeFinnivel) === 1)) {
      if (this.compare(this.stage.vars.obstCulos, 4) > 0) {
        this.goto(this.random(-240, 240), this.random(-180, 180));
        this.goto(this.x, 200);
        this.visible = true;
        while (!(this.toNumber(this.stage.vars.mensajeFinnivel) === 1)) {
          this.stage.vars.meteoritoCayendo = 1;
          this.y -= 5;
          this.direction += 15;
          if (this.touching(this.sprites["Lilian"].andClones())) {
            this.broadcast("daño");
            this.stage.vars.vidalilian -= 500;
            this.stage.vars.meteoritoCayendo = 0;
            this.visible = false;
            yield* this.wait(1);
            this.goto(this.random(-240, 240), this.random(-180, 180));
            this.goto(this.x, 250);
            this.visible = true;
          }
          if (this.compare(this.y, -235) < 0) {
            this.stage.vars.obstCulos++;
            this.stage.vars.meteoritoCayendo = 0;
            this.visible = false;
            yield* this.wait(1);
            this.goto(this.random(-240, 240), this.random(-180, 180));
            this.goto(this.x, 250);
            this.visible = true;
          }
          yield;
        }
      }
      yield;
    }
  }
}