import Action from '../lib/actions';
import Controller from '../lib/Controller';
import Module from '../models/Module';

export default class StartController extends Controller {
  public location = Module.START_POS;

  public runRoom() {
    Action.goToSamples();
  }
}
