import { MoleculeType } from './Molecule';

export default class MoleculeModule {
  public available: {[key in MoleculeType]: number};

  public constructor() {
    this.available = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
    };
  }

  public setInput(inputs: any) {
    this.available.A = parseInt(inputs[0], 10);
    this.available.B = parseInt(inputs[1], 10);
    this.available.C = parseInt(inputs[2], 10);
    this.available.D = parseInt(inputs[3], 10);
    this.available.E = parseInt(inputs[4], 10);
  }
}
