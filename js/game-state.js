const gameState = {
  playerName: ``,
  lives: 3,
  answers: [],
  screenIndex: 0,
  timeLimit: 30,
  result: ``,
  screenIndexInc() {
    this.screenIndex = this.screenIndex + 1;
  },
  looseLife() {
    this.lives = this.lives - 1;
  },
  addAnswer(answer) {
    this.answers.push(answer);
  },
  set newPlayerName(newName) {
    this.playerName = newName;
  },
  set finalResult(calculatedResult) {
    this.result = calculatedResult;
  },
  resetParams() {
    this.lives = 3;
    this.answers = [];
    this.screenIndex = 3;
  }
};

export default gameState;
