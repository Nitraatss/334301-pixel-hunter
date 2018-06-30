import GameScreen from './game-screen';
import TinderLikeView from '../view/tinder-like-view';

export default class TinderLikeScreen extends GameScreen {
  constructor(model) {
    super(model);

    this.init();
  }

  init() {
    this._screen = new TinderLikeView(this._model, this.getCurrentQuestion());

    this._screen.onBackButton = () => this.stopTicking();

    this._screen.checkAnswer = (answer, question) => {
      this.stopTicking();

      if (answer === question.type) {
        this._model.addAnswer({
          correct: true,
          time: this.calculateTime()
        });
      } else {
        this._model.addAnswer({
          correct: false,
          time: this.calculateTime()
        });

        this._model.looseLife();
      }
    };

    this._screen.onInputChange = (currentAnswer) => {
      this._screen.checkAnswer(currentAnswer, this._screen.currentQuestion.answers[0]);
      this.showNextGame();
    };
  }
}


