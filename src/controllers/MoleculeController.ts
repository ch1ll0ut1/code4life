import Action from '../lib/actions';
import Controller from '../lib/Controller';
import Module from '../models/Module';

export default class MoleculeController extends Controller {
  public location = Module.MOLECULES;

  public runRoom() {
    const { mySelf } = this.game;
    const usedStorage = mySelf.getUsedStorage();

    if (usedStorage < mySelf.MOLECULES_CARRY_CAPACITY) {
      this.takeMolecule();
    } else {
      Action.goToLaboratory();
    }
  }

  private takeMolecule() {
    const { mySelf, moleculeModule } = this.game;
    const mySamples = mySelf.getCarriedSamples();
    const availableSample = mySamples.find((sample) => sample.isAvailable(moleculeModule, mySelf));

    if (availableSample) {
      const molecule = mySelf.needMolucule(availableSample);
      if (molecule) {
        return Action.takeMolecule(molecule);
      }
    }

    const moreMolecule = mySelf.canTakeMoreMolecule(moleculeModule);

    if (moreMolecule) {
      return Action.takeMolecule(moreMolecule);
    }

    return Action.goToLaboratory();
  }
}
