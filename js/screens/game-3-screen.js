import GameScreen from './game-screen';
import GameThreeView from '../view/game-3-view';

const AVERAGE_TIME = 15;

export default class GameThreeScreen extends GameScreen {
  constructor(model) {
    super(model);

    this.init();
  }

  init() {
    this._screen = new GameThreeView(this.model, this.getCurrentQuestion());

    this._screen.checkAnswer = (answer) => {
      if (answer === `paint`) {
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

    this._screen.onOptionClick = (evtOp) => {
      const currentAnswer = evtOp.target.firstElementChild.alt;

      this._screen.checkAnswer(currentAnswer);
      this.showNextGame();
    };
  }
}
