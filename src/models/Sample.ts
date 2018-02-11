import { MAX_AVAILABLE_MOLECULES } from '../config';
import { MoleculeType } from './Molecule';
import MoleculeModule from './MoleculeModule';
import Player from './Player';

class Sample {
  public static readonly ranks = {
    A: 1,
    B: 2,
    C: 3,
  };

  public readonly costs: {[key in MoleculeType]: number};
  public readonly id: number;
  public readonly carriedBy: number;
  public readonly rank: number;
  public readonly expertiseGain: MoleculeType;
  public readonly health: number;
  public readonly isDiagnosed: boolean;

  public constructor(inputs: any) {
    this.id = parseInt(inputs[0], 10);
    this.carriedBy = parseInt(inputs[1], 10);
    this.rank = parseInt(inputs[2], 10);
    this.expertiseGain = inputs[3];
    this.health = parseInt(inputs[4], 10);
    this.costs = {
      A: parseInt(inputs[5], 10),
      B: parseInt(inputs[6], 10),
      C: parseInt(inputs[7], 10),
      D: parseInt(inputs[8], 10),
      E: parseInt(inputs[9], 10),
    };

    this.isDiagnosed = this.health !== -1;
  }

  public isCarriedBy(player: Player) {
    return this.carriedBy === player.id;
  }

  public canCarryBy(player: Player) {
    return this.getRequiredStorage(player) <= player.MOLECULES_CARRY_CAPACITY;
  }

  public getTotalCosts() {
    return Object.values(this.costs).reduce((a, b) => a + b);
  }

  public canBuiltBy(player: Player) {
    const max = MAX_AVAILABLE_MOLECULES;
    return this.costs.A <= (max + player.expertise.A)
      && this.costs.B <= (max + player.expertise.B)
      && this.costs.C <= (max + player.expertise.C)
      && this.costs.D <= (max + player.expertise.D)
      && this.costs.E <= (max + player.expertise.E);
  }

  public isAvailable(molecules: MoleculeModule, player: Player) {
    return (this.costs.A - player.expertise.A) <= (molecules.available.A + player.storage.A)
      && (this.costs.B - player.expertise.B) <= (molecules.available.B + player.storage.B)
      && (this.costs.C - player.expertise.C) <= (molecules.available.C + player.storage.C)
      && (this.costs.D - player.expertise.D) <= (molecules.available.D + player.storage.D)
      && (this.costs.E - player.expertise.E) <= (molecules.available.E + player.storage.E);
  }

  private getRequiredStorage(player?: Player) {
    if (!player) {
      return this.getTotalCosts();
    }

    let totalCosts = 0;

    if (player.expertise.A && this.costs.A) {
      totalCosts += Math.max(0, this.costs.A - player.expertise.A);
    }

    if (player.expertise.B && this.costs.B) {
      totalCosts += Math.max(0, this.costs.B - player.expertise.B);
    }

    if (player.expertise.C && this.costs.C) {
      totalCosts += Math.max(0, this.costs.C - player.expertise.C);
    }

    if (player.expertise.D && this.costs.D) {
      totalCosts += Math.max(0, this.costs.D - player.expertise.D);
    }

    if (player.expertise.E && this.costs.E) {
      totalCosts += Math.max(0, this.costs.E - player.expertise.E);
    }

    return totalCosts;
  }
}

export default Sample;
