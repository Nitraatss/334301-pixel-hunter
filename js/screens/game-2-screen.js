import GameScreen from './game-screen';
import GameTwoView from '../view/game-2-view';

export default class GameTwoScreen extends GameScreen {
  constructor(model) {
    super(model);

    this.init();
  }

  init() {
    this._screen = new GameTwoView(this.model, this.getCurrentQuestion());

    this._screen.checkAnswer = (answer, question) => {
      this.stopTicking();
      if (answer === question.correctAnswerValue) {
        this.model.addAnswer({
          correct: true,
          time: this.calculateTime()
        });
      } else {
        this.model.addAnswer({
          correct: false,
          time: this.calculateTime()
        });

        this.model.looseLife();
      }
    };

    this._screen.onInputChange = (currentAnswer) => {

      this._screen.checkAnswer(currentAnswer, this._screen.currentQuestion);
      this.showNextGame();
    };
  }
}


