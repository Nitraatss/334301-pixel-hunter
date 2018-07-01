import GameScreen from './game-screen';
import OneOfThreeView from '../view/one-of-three-view';

const PHOTO_TYPE_QUESTION_INCORRECT_OPTIONS_NUMBER = 2;
const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

export default class OneOfThreeScreen extends GameScreen {
  constructor(model) {
    super(model);

    this.init();
  }

  init() {
    this._screen = new OneOfThreeView(this._model, this.getCurrentQuestion());

    this._screen.onBackButton = () => this.stopTicking();

    this._screen.setCorrectAnswer = (options) => {
      const numberOfPaintingOptions = options.reduce(function (accumulator, item) {
        if (item.type === AnswerType.PAINTING) {
          return accumulator + 1;
        } else {
          return accumulator;
        }
      }, 0);

      if (numberOfPaintingOptions === PHOTO_TYPE_QUESTION_INCORRECT_OPTIONS_NUMBER) {
        return AnswerType.PHOTO;
      } else {
        return AnswerType.PAINTING;
      }
    };

    this._screen.checkAnswer = (answer, options) => {
      this.stopTicking();

      const correctAnswer = this._screen.setCorrectAnswer(options);

      if (answer === correctAnswer) {
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

    this._screen.onOptionClick = (currentAnswer, currenQuestionOptions) => {
      this._screen.checkAnswer(currentAnswer, currenQuestionOptions);
      this.showNextGame();
    };
  }
}
