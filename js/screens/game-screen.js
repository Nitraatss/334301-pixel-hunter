import Application from '../application';
import gameData from '../game-services/game-data';
import {Timer} from '../timer';

const STARTING_GAME_SCREEN_INDEX = 0;
const FINAL_GAME_SCREEN_INDEX = 9;
const ANSWERS_NUMBER = 10;
const NO_LIVES = 0;
const FAILED_TIME = 30;

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
      Application.showGameOne().startTicking();
    }

    if (questions[gameIndex].type === `tinder-like`) {
      Application.showGameTwo().startTicking();
    }

    if (questions[gameIndex].type === `one-of-three`) {
      Application.showGameThree().startTicking();
    }
  }

  showNextGame() {
    this.stopTicking();

    if (this.model.lives < NO_LIVES) {
      if (this.model.answers.length !== ANSWERS_NUMBER) {
        for (let i = this.model.answers.length; i < ANSWERS_NUMBER; i++) {
          this.model.addAnswer({
            answers: false,
            time: 0
          });
        }
      }

      Application.showStats();
    } else {
      this.model.gameIndexInc();

      const currentGameIndex = this.model.gameIndex;

      if (currentGameIndex >= STARTING_GAME_SCREEN_INDEX && currentGameIndex <= FINAL_GAME_SCREEN_INDEX) {
        this.showGame(gameData.allQuestions, currentGameIndex);
      } else {
        Application.showStats();
      }
    }
  }

  startTicking() {
    this.timer = new Timer(this.model.timeLimit);

    this.checkTime();

    this.interval = setInterval(this.checkTime.bind(this), 1000);
  }

  stopTicking() {
    if (this.interval) {
      clearInterval(this.interval);
    }
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
