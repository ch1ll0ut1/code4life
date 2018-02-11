import Module from '../models/Module';
import Sample from '../models/Sample';

class Action {
  public static goToDiagnosis() {
    return print('GOTO ' + Module.DIAGNOSIS);
  }

  public static goToMolecules() {
    return print('GOTO ' + Module.MOLECULES);
  }

  public static goToLaboratory() {
    return print('GOTO ' + Module.LABORATORY);
  }

  public static goToSamples() {
    return print('GOTO ' + Module.SAMPLES);
  }

  public static dropSample(sample: Sample) {
    return print('CONNECT ' + sample.id);
  }

  public static takeMolecule(molecule: string) {
    return print('CONNECT ' + molecule);
  }

  public static takeSample(rank: number) {
    return print('CONNECT ' + rank);
  }

  public static diagnoseSample(sample: Sample) {
    return print('CONNECT ' + sample.id);
  }

  public static researchMedicine(sample: Sample) {
    return print('CONNECT ' + sample.id);
  }

  public static wait() {
    return print('WAIT');
  }

  private constructor() {}
}

export default Action;
