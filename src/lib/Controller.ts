import Game from '../models/Game';

export default abstract class Controller {
  public abstract location: string;

  public constructor(
    public game: Game,
  ) {

  }

  public abstract runRoom(): void;

  public run() {
    const { mySelf } = this.game;
    const { eta, target } = mySelf;

    if (!eta && target === this.location) {
      this.runRoom();
    }
  }
}
