import Application from '../application';
import gameData from '../game-data/game-data';
import {Timer} from '../timer';

const STARTING_GAME_SCREEN_INDEX = 0;
const FINAL_GAME_SCREEN_INDEX = 9;
const ANSWERS_NUMBER = 10;
const NO_LIVES = 0;
const FAILED_TIME = 30;

let interval;

export default class GameScreen {
  constructor(model) {
    this.model = model;
  }

  init() {
  }

  resetGame() {
    this.model.resetParams();
  }

  get screen() {
    return this._screen;
  }

  getCurrentQuestion() {
    return gameData.allQuestions[this.model.gameIndex];
  }

  showGame(questions, gameIndex) {
    if (questions[gameIndex].type === `two-of-two`) {
      Application.showGameOne();
    }

    if (questions[gameIndex].type === `tinder-like`) {
      Application.showGameTwo();
    }

    if (questions[gameIndex].type === `one-of-three`) {
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
        this.showGame(gameData.allQuestions, currentGameIndex);

        this.startTicking();
      } else {
        Application.showStats();
      }
    }
  }

  startTicking() {
    this.timer = new Timer(this.model.timeLimit);

    this.checkTime();

    interval = setInterval(this.checkTime.bind(this), 1000);
  }

  stopTicking() {
    clearInterval(interval);
  }

  checkTime() {
    if (this.timer.tick() <= 0) {
      this.stopTicking();

      this.model.looseLife();

      this.model.addAnswer({
        correct: false,
        time: FAILED_TIME
      });

      this.showNextGame();
    } else {
      this.timer.updateTime();
    }
  }

  calculateTime() {
    const currentTime = document.querySelector(`.game__timer`).textContent;

    const spendedTime = this.model.timeLimit - currentTime;

    return spendedTime;
  }
}
