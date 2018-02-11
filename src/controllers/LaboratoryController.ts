import Action from '../lib/actions';
import Controller from '../lib/Controller';
import Module from '../models/Module';

export default class LaboratoryController extends Controller {
  public location = Module.LABORATORY;

  public runRoom() {
    const { mySelf } = this.game;
    const mySamples = mySelf.getCarriedSamples();

    // research medicine
    for (const mySample of mySamples) {
      const molecule = mySelf.needMolucule(mySample);

      if (!molecule) {
        // mySelf.setFocusedProject(mySample.expertiseGain)
        return Action.researchMedicine(mySample);
      }
    }

    if (mySamples.length >= 1) {
      return Action.goToMolecules();
    }

    return Action.goToSamples();
  }
}
