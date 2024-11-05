/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Fondo_Inicio", "./Stage/costumes/Fondo_Inicio.png", {
        x: 480,
        y: 360,
      }),
      new Costume(
        "Fondo_PlanetaEspacio",
        "./Stage/costumes/Fondo_PlanetaEspacio.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Fondo_SiguienteNivel",
        "./Stage/costumes/Fondo_SiguienteNivel.png",
        { x: 480, y: 360 }
      ),
      new Costume("Fondo_Nave", "./Stage/costumes/Fondo_Nave.png", {
        x: 480,
        y: 360,
      }),
      new Costume("Fondo_Ganaste", "./Stage/costumes/Fondo_Ganaste.png", {
        x: 480,
        y: 360,
      }),
      new Costume("Fondo_GameOver", "./Stage/costumes/Fondo_GameOver.png", {
        x: 480,
        y: 360,
      }),
    ];

    this.sounds = [
      new Sound("Dance Funky", "./Stage/sounds/Dance Funky.wav"),
      new Sound("Space Ambience", "./Stage/sounds/Space Ambience.wav"),
      new Sound("Mystery", "./Stage/sounds/Mystery.wav"),
      new Sound("Win", "./Stage/sounds/Win.wav"),
      new Sound("Oops", "./Stage/sounds/Oops.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Finalizar" },
        this.whenIReceiveFinalizar
      ),
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
        { name: "Victoria_o_GameOver" },
        this.whenIReceiveVictoriaOGameover
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "FinNivel" },
        this.whenIReceiveFinnivel
      ),
    ];

    this.vars.tiempo = 60;
    this.vars.vidalilian = 5000;
    this.vars.obstCulos = 0;
    this.vars.vidacompletarecuperada = 1;
    this.vars.umbraCaminando = 0;
    this.vars.lilianCaminando = 0;
    this.vars.meteoritoCayendo = 0;
    this.vars.lilianVolando = 0;
    this.vars.fragmentoestrellaSonidoa = 0;
    this.vars.musicaNivel1 = 0;
    this.vars.musicaInicio = 1;
    this.vars.mensajeFinalizar = 0;
    this.vars.fragmentoestrellaAparecio = 0;
    this.vars.fragmentoestrellaDesaparecio = 0;
    this.vars.fragmentoestrellaSonidod = 0;
    this.vars.musicaNivel2 = 0;
    this.vars.mensajeNivel2 = 0;
    this.vars.vidaumbra = 7000;
    this.vars.mensajeFinnivel = 0;

    this.watchers.tiempo = new Watcher({
      label: "tiempo",
      style: "large",
      visible: false,
      value: () => this.vars.tiempo,
      x: 261,
      y: 160,
    });
    this.watchers.vidalilian = new Watcher({
      label: "vidaLilian",
      style: "large",
      visible: false,
      value: () => this.vars.vidalilian,
      x: 363,
      y: 160,
    });
    this.watchers.vidaumbra = new Watcher({
      label: "vidaUmbra",
      style: "large",
      visible: false,
      value: () => this.vars.vidaumbra,
      x: 544,
      y: 159,
    });
  }

  *whenGreenFlagClicked() {
    this.vars.mensajeNivel2 = 0;
    this.vars.mensajeFinalizar = 0;
    this.costume = "Fondo_Inicio";
    this.watchers.tiempo.visible = false;
    this.watchers.vidalilian.visible = false;
    this.watchers.vidaumbra.visible = false;
    this.vars.tiempo = 60;
    this.vars.vidalilian = 5000;
    this.vars.vidaumbra = 7000;
    this.vars.obstCulos = 0;
    this.vars.musicaNivel1 = 0;
    this.vars.musicaNivel2 = 0;
    this.vars.musicaInicio = 1;
    while (true) {
      if (this.toNumber(this.vars.musicaInicio) === 1) {
        yield* this.playSoundUntilDone("Dance Funky");
      }
      if (this.toNumber(this.vars.musicaNivel1) === 1) {
        yield* this.playSoundUntilDone("Space Ambience");
      }
      if (this.toNumber(this.vars.musicaNivel2) === 1) {
        yield* this.playSoundUntilDone("Mystery");
      }
      yield;
    }
  }

  *whenIReceiveFinalizar() {
    this.watchers.tiempo.visible = false;
    this.watchers.vidalilian.visible = false;
    this.watchers.vidaumbra.visible = false;
    this.vars.mensajeFinalizar = 1;
    this.vars.mensajeNivel2 = 0;
  }

  *whenIReceiveNivel1() {
    this.stopAllSounds();
    this.vars.musicaInicio = 0;
    this.costume = "Fondo_PlanetaEspacio";
    this.vars.musicaNivel1 = 1;
    this.watchers.tiempo.visible = true;
    this.watchers.vidalilian.visible = true;
    while (!(this.toNumber(this.vars.mensajeNivel2) === 1)) {
      yield* this.wait(1);
      this.vars.tiempo--;
      if (
        this.toNumber(this.vars.tiempo) === 0 ||
        this.toNumber(this.vars.vidalilian) === 0 ||
        this.compare(this.vars.vidalilian, 0) < 0
      ) {
        this.broadcast("Finalizar");
        this.broadcast("FinNivel");
        return;
      }
      yield;
    }
  }

  *whenIReceiveNivel2() {
    this.vars.musicaNivel1 = 0;
    this.vars.mensajeFinalizar = 0;
    this.vars.vidalilian = 5000;
    this.vars.vidaumbra = 7000;
    this.costume = "Fondo_SiguienteNivel";
    yield* this.wait(3);
    this.vars.mensajeNivel2 = 1;
    this.costume = "Fondo_Nave";
    this.vars.musicaNivel2 = 1;
    this.watchers.vidalilian.visible = true;
    this.watchers.vidaumbra.visible = true;
    while (!(this.toNumber(this.vars.mensajeFinalizar) === 1)) {
      yield* this.wait(1);
      this.vars.tiempo--;
      if (
        this.toNumber(this.vars.vidalilian) === 0 ||
        this.compare(this.vars.vidalilian, 0) < 0 ||
        this.toNumber(this.vars.vidaumbra) === 0 ||
        this.compare(this.vars.vidaumbra, 0) < 0
      ) {
        this.vars.musicaNivel2 = 0;
        this.broadcast("Finalizar");
        this.broadcast("FinNivel");
      }
      yield;
    }
  }

  *whenIReceiveVictoriaOGameover() {
    if (
      this.toNumber(this.vars.vidaumbra) === 0 ||
      this.compare(this.vars.vidaumbra, 0) < 0
    ) {
      this.costume = "Fondo_Ganaste";
      yield* this.playSoundUntilDone("Win");
      /* TODO: Implement stop all */ null;
    }
    if (
      this.toNumber(this.vars.vidalilian) === 0 ||
      this.compare(this.vars.vidalilian, 0) < 0
    ) {
      this.costume = "Fondo_GameOver";
      yield* this.playSoundUntilDone("Oops");
      /* TODO: Implement stop all */ null;
    }
    if (
      this.toNumber(this.vars.musicaNivel1) === 1 &&
      this.compare(this.vars.vidalilian, 0) > 0
    ) {
      this.broadcast("Nivel2");
    }
  }

  *whenIReceiveFinnivel() {
    this.stopAllSounds();
    this.broadcast("Victoria_o_GameOver");
  }
}
