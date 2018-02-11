import Game from './Game';
import Molecule, { MoleculeType } from './Molecule';
import MoleculeModule from './MoleculeModule';
import Sample from './Sample';

export default class Player {
  public readonly SAMPLES_CARRY_CAPACITY = 3;
  public readonly MOLECULES_CARRY_CAPACITY = 10;

  public readonly id: number;
  public readonly game: Game;
  public target: string;
  public eta: number;
  public score: number;
  public storage: {[key in MoleculeType]: number};
  public expertise: {[key in MoleculeType]: number};

  public constructor(id: number, game: Game) {
    this.id = id;
    this.game = game;
    this.target = '';
    this.eta = 0;
    this.score = 0;
    this.storage = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
    };
    this.expertise = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
    };
  }

  public setInput(inputs: any) {
    this.target = inputs[0];
    this.eta = parseInt(inputs[1], 10);
    this.score = parseInt(inputs[2], 10);
    this.storage.A = parseInt(inputs[3], 10);
    this.storage.B = parseInt(inputs[4], 10);
    this.storage.C = parseInt(inputs[5], 10);
    this.storage.D = parseInt(inputs[6], 10);
    this.storage.E = parseInt(inputs[7], 10);
    this.expertise.A = parseInt(inputs[8], 10);
    this.expertise.B = parseInt(inputs[9], 10);
    this.expertise.C = parseInt(inputs[10], 10);
    this.expertise.D = parseInt(inputs[11], 10);
    this.expertise.E = parseInt(inputs[12], 10);
  }

  public getUsedStorage() {
    return Object.values(this.storage).reduce((a, b) => a + b);
  }

  public getTotalExpertise() {
    return Object.values(this.expertise).reduce((a, b) => a + b);
  }

  public getCarriedSamples() {
    return this.game.samples.filter((sample) => sample.isCarriedBy(this));
  }

  public canTakeMoreMolecule(available: MoleculeModule) {
    const costs = [0, 0, 0, 0, 0];
    this.getCarriedSamples().forEach((sample) => {
      const a = sample.costs.A - this.expertise.A;
      if (a > 0) {
        costs[0] += a;
      }

      const b = sample.costs.B - this.expertise.B;
      if (b > 0) {
        costs[1] += b;
      }

      const c = sample.costs.C - this.expertise.C;
      if (c > 0) {
        costs[2] += c;
      }

      const d = sample.costs.D - this.expertise.D;
      if (d > 0) {
        costs[3] += d;
      }

      const e = sample.costs.E - this.expertise.E;
      if (e > 0) {
        costs[4] += e;
      }

    });

    if (costs[0] > this.storage.A && available.available.A) {
      return Molecule.A;
    }

    if (costs[1] > this.storage.B && available.available.B) {
      return Molecule.B;
    }

    if (costs[2] > this.storage.C && available.available.C) {
      return Molecule.C;
    }

    if (costs[3] > this.storage.D && available.available.D) {
      return Molecule.D;
    }

    if (costs[4] > this.storage.E && available.available.E) {
      return Molecule.E;
    }
  }

  public needMolucule(sample: Sample) {
    if ((sample.costs.A - this.expertise.A) > this.storage.A) {
      return Molecule.A;
    }

    if ((sample.costs.B - this.expertise.B) > this.storage.B) {
      return Molecule.B;
    }

    if ((sample.costs.C - this.expertise.C) > this.storage.C) {
      return Molecule.C;
    }

    if ((sample.costs.D - this.expertise.D) > this.storage.D) {
      return Molecule.D;
    }

    if ((sample.costs.E - this.expertise.E) > this.storage.E) {
      return Molecule.E;
    }
  }
}
