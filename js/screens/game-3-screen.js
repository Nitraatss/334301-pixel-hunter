import GameScreen from './game-screen';
import GameThreeView from '../view/game-3-view';

export default class GameThreeScreen extends GameScreen {
  constructor(model) {
    super(model);

    this.init();
  }

  init() {
    this._screen = new GameThreeView(this.model, this.getCurrentQuestion());

    this._screen.checkAnswer = (answer) => {
      this.stopTicking();
      if (answer === `painting`) {
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

    this._screen.onOptionClick = (currentAnswer) => {
      this._screen.checkAnswer(currentAnswer);
      this.showNextGame();
    };
  }
}
