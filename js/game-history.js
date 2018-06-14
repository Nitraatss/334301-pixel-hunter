class History {
  constructor() {
    this.allGames = [];
  }

  addGame(currentGame) {
    this.allGames.unshift(currentGame);
  }
}

const gameHistory = new History();

export default gameHistory;
