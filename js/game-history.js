const gameHistory = {
  allGames: [],
  addGame(currentGame) {
    this.allGames.unshift(currentGame);
  }
};

export default gameHistory;
