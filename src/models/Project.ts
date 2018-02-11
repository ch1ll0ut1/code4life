import { MoleculeType } from './Molecule';

export default class Project {
  private expertise: {[key in MoleculeType]: number};

  public constructor(inputs: any) {
    this.expertise = {
      A: parseInt(inputs[0], 10),
      B: parseInt(inputs[1], 10),
      C: parseInt(inputs[2], 10),
      D: parseInt(inputs[3], 10),
      E: parseInt(inputs[4], 10),
    };
  }

  public getExpertiseCount() {
    return Object.values(this.expertise).reduce((a, b) => a + b);
  }
}
