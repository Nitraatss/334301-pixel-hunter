import Application from '../application';
import gameData from '../game-services/game-data';
import {Timer} from '../timer';

const STARTING_GAME_SCREEN_INDEX = 0;
const FINAL_GAME_SCREEN_INDEX = 9;
const ANSWERS_NUMBER = 10;
const NO_LIVES = 0;
const FAILED_TIME = 30;
const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

export default class GameScreen {
  constructor(model) {
    this._model = model;
  }

  init() {
  }

  resetGame() {
    this._model.resetParams();
  }

  get screen() {
    return this._screen;
  }

  getCurrentQuestion() {
    return gameData.allQuestions[this._model.gameIndex];
  }

  showGame(questions, gameIndex) {
    if (questions[gameIndex].type === QuestionType.TWO_OF_TWO) {
      Application.showGameTwoOfTwo().startTicking();
    }

    if (questions[gameIndex].type === QuestionType.TINDER_LIKE) {
      Application.showGameTinderLike().startTicking();
    }

    if (questions[gameIndex].type === QuestionType.ONE_OF_THREE) {
      Application.showGameOneOfThree().startTicking();
    }
  }

  showNextGame() {
    this.stopTicking();

    if (this._model.lives < NO_LIVES) {
      if (this._model.answers.length !== ANSWERS_NUMBER) {
        for (let i = this._model.answers.length; i < ANSWERS_NUMBER; i++) {
          this._model.addAnswer({
            answers: false,
            time: 0
          });
        }
      }

      Application.showStats();
    } else {
      this._model.gameIndexInc();

      const currentGameIndex = this._model.gameIndex;

      if (currentGameIndex >= STARTING_GAME_SCREEN_INDEX && currentGameIndex <= FINAL_GAME_SCREEN_INDEX) {
        this.showGame(gameData.allQuestions, currentGameIndex);
      } else {
        Application.showStats();
      }
    }
  }

  startTicking() {
    this.timer = new Timer(this._model.timeLimit);

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

      this._model.looseLife();

      this._model.addAnswer({
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

    const spendedTime = this._model.timeLimit - currentTime;

    return spendedTime;
  }
}
