import Game from './models/Game';

// the program executor
const run = () => {
  const game = new Game();

  while (true) {
    game.run();
  }
};

// start the program if the code is run at codingame
if (typeof isRunAtCodingame === 'boolean') {
  run();
}

export default run;
