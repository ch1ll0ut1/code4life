import Action from '../lib/actions';
import Controller from '../lib/Controller';
import Module from '../models/Module';
import Sample from '../models/Sample';

export default class SampleController extends Controller {
  public location = Module.SAMPLES;

  public runRoom() {
    const { mySelf } = this.game;
    const carriedSamples = mySelf.getCarriedSamples();

    if (carriedSamples.length < mySelf.SAMPLES_CARRY_CAPACITY) {
      Action.takeSample(this.getNextRank(carriedSamples));
    } else {
      Action.goToDiagnosis();
    }
  }

  private getNextRank(carriedSamples: Sample[]) {
    const { mySelf } = this.game;
    const rankSum = carriedSamples.reduce((a, b) => a + b.rank, 0);

    switch (mySelf.getTotalExpertise()) {
      case 0: return Sample.ranks.A;
      case 1: return rankSum > 0 ? Sample.ranks.B : Sample.ranks.A;
      case 2: return rankSum > 0 ? Sample.ranks.B : Sample.ranks.C;
      default: return Sample.ranks.C;
    }
  }
}
