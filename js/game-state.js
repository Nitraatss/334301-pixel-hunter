class GameModel {
  constructor() {
    this.playerName = ``;
    this.lives = 3;
    this.answers = [];
    this.gameIndex = -1;
    this.timeLimit = 30;
    this.result = ``;
  }

  gameIndexInc() {
    this.gameIndex = this.gameIndex + 1;
  }

  looseLife() {
    this.lives = this.lives - 1;
  }

  addAnswer(answer) {
    this.answers.push(answer);
  }

  set newPlayerName(newName) {
    this.playerName = newName;
  }

  set finalResult(calculatedResult) {
    this.result = calculatedResult;
  }

  resetParams() {
    this.lives = 3;
    this.answers = [];
    this.gameIndex = -1;
  }
}

const gameState = new GameModel();

export default gameState;
