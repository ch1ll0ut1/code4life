import Action from '../lib/actions';
import Controller from '../lib/Controller';
import Module from '../models/Module';

export default class DiagnosisController extends Controller {
  public location = Module.DIAGNOSIS;

  public runRoom() {
    const { mySelf } = this.game;
    const carriedSamples = mySelf.getCarriedSamples();

    for (const sample of carriedSamples) {
      if (!sample.isDiagnosed) {
        return Action.diagnoseSample(sample);
      } else if (!sample.canCarryBy(mySelf)) {
        return Action.dropSample(sample);
      } else if (!sample.canBuiltBy(mySelf)) {
        return Action.dropSample(sample);
      }
    }

    if (carriedSamples.length === 0) {
      return Action.goToSamples();
    }

    return Action.goToMolecules();
  }
}
