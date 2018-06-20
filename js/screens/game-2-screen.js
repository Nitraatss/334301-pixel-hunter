import GameScreen from './game-screen';
import GameTwoView from '../view/game-2-view';

const AVERAGE_TIME = 15;

export default class GameTwoScreen extends GameScreen {
  constructor(model) {
    super(model);

    this.init();
  }

  init() {
    this._screen = new GameTwoView(this.model, this.getCurrentQuestion());

    this._screen.checkAnswer = (answer, question) => {
      if (answer === question.correctAnswerValue) {
        this.model.addAnswer({
          correct: true,
          time: AVERAGE_TIME
        });
      } else {
        this.model.addAnswer({
          correct: false,
          time: AVERAGE_TIME
        });

        this.model.looseLife();
      }
    };

    this._screen.onInputChange = (evtInp) => {
      const currentAnswer = evtInp.target.value;

      this._screen.checkAnswer(currentAnswer, this._screen.currentQuestion);
      this.showNextGame();
    };
  }
}


