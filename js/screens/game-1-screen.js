import GameScreen from './game-screen';
import GameOneView from '../view/game-1-view';

const FIRST_INPUT_ID = `0`;

export default class GameOneScreen extends GameScreen {
  constructor(model) {
    super(model);

    this.init();
  }

  init() {
    let firstQuestionChecked = false;
    let secondQuestionChecked = false;
    let firstAnswer;
    let secondAnswer;

    this._screen = new GameOneView(this.model, this.getCurrentQuestion());

    this._screen.onBackButton = () => this.stopTicking();

    this._screen.checkAnswers = (firstOptionValue, secondOptionValue, answers) => {
      this.stopTicking();

      if (answers[0].type === firstOptionValue && answers[1].type === secondOptionValue) {
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

    this._screen.onInputChange = (inputName, inputValue) => {
      if (inputName === `question${FIRST_INPUT_ID}`) {
        firstQuestionChecked = true;
        firstAnswer = inputValue;
      } else {
        secondQuestionChecked = true;
        secondAnswer = inputValue;
      }

      if (firstQuestionChecked && secondQuestionChecked) {
        this._screen.checkAnswers(firstAnswer, secondAnswer, this._screen.currentQuestion.answers);
        this.showNextGame();
      }
    };
  }
}
