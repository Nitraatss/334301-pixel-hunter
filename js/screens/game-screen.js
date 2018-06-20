import Application from '../application';
import gameData from '../game-data';

const STARTING_GAME_SCREEN_INDEX = 0;
const FINAL_GAME_SCREEN_INDEX = 9;
const ANSWERS_NUMBER = 10;
const NO_LIVES = 0;

export default class GameScreen {
  constructor(model) {
    this.model = model;
  }

  init() {
  }

  initGame() {
    this.model.resetParams();
  }

  get screen() {
    return this._screen;
  }

  getCurrentQuestion() {
    return gameData[this.model.gameIndex];
  }

  showGame(questions, gameIndex) {
    if (questions[gameIndex].type === `game-1`) {
      Application.showGameOne();
    }

    if (questions[gameIndex].type === `game-2`) {
      Application.showGameTwo();
    }

    if (questions[gameIndex].type === `game-3`) {
      Application.showGameThree();
    }
  }

  showNextGame() {
    if (this.model.lives < NO_LIVES) {
      if (this.model.answers.length !== ANSWERS_NUMBER) {
        let i = this.model.answers.length;
        while (i < (ANSWERS_NUMBER)) {
          this.model.addAnswer({
            answers: false,
            time: 0
          });
          i++;
        }
      }

      Application.showStats();
    } else {
      this.model.gameIndexInc();

      const currentGameIndex = this.model.gameIndex;

      if (currentGameIndex >= STARTING_GAME_SCREEN_INDEX && currentGameIndex <= FINAL_GAME_SCREEN_INDEX) {
        this.showGame(gameData, currentGameIndex);
      } else {
        Application.showStats();
      }
    }
  }

  startTicking() {
    this.checkTime();

    this.interval = setInterval(this.checkTime.bind(this), 1000);
  }

  stopTicking() {
    clearInterval(this.interval);
  }

  checkTime() {
    if (timer.tick() <= 0) {
      this.stopTicking();
      Application.showResult();
    } else {
      timer.updateTime();
      timer.updateTimerSeconds();
    }
  }
}
