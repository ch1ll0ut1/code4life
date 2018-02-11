import DiagnosisController from '../controllers/DiagnosisController';
import LaboratoryController from '../controllers/LaboratoryController';
import MoleculeController from '../controllers/MoleculeController';
import SampleController from '../controllers/SampleController';
import StartController from '../controllers/StartController';
import Controller from '../lib/Controller';
import MoleculeModule from './MoleculeModule';
import Player from './Player';
import Project from './Project';
import Sample from './Sample';
import Action from '../lib/actions';

export default class Game {
  public projects: Project[] = [];
  public samples: Sample[] = [];
  public players: Player[];
  public mySelf: Player;
  public opponent: Player;
  public moleculeModule: MoleculeModule;
  public loopCount = 0;
  public roomControllers: Controller[];

  public constructor() {
    this.players = [
      new Player(0, this),
      new Player(1, this),
    ];
    this.moleculeModule = new MoleculeModule();
    this.roomControllers = [
      new SampleController(this),
      new DiagnosisController(this),
      new MoleculeController(this),
      new LaboratoryController(this),
      new StartController(this),
    ];
    this.mySelf = this.players[0];
    this.opponent = this.players[1];

    this.readProjects();
  }

  public run() {
    this.loopCount++;

    this.readPlayers();
    this.readMoleculeModule();
    this.readSamples();

    if (this.mySelf.eta) {
      return Action.wait();
    }

    this.roomControllers.forEach((controller) => controller.run());
  }

  private readProjects() {
    this.projects = [];
    const projectCount = parseInt(readline(), 10);

    for (let i = 0; i < projectCount; i++) {
      const inputs = readline().split(' ');
      this.projects.push(new Project(inputs));
    }
  }

  private readPlayers() {
    for (let i = 0; i < 2; i++) {
      const inputs = readline().split(' ');
      this.players[i].setInput(inputs);
    }
  }

  private readMoleculeModule() {
    const inputs = readline().split(' ');
    this.moleculeModule.setInput(inputs);
  }

  private readSamples() {
    this.samples = [];
    const sampleCount = parseInt(readline(), 10);

    for (let i = 0; i < sampleCount; i++) {
      const inputs = readline().split(' ');
      this.samples.push(new Sample(inputs));
    }
  }
}
