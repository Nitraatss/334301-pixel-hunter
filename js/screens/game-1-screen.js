import GameScreen from './game-screen';
import GameOneView from '../view/game-1-view';

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

    this._screen.checkAnswers = (firstOptionValue, secondOptionValue, question) => {
      this.stopTicking();
      if (question.optionOne.correctAnswerValue === firstOptionValue && question.optionTwo.correctAnswerValue === secondOptionValue) {
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

    this._screen.onInputChange = (evtInp) => {
      if (evtInp.target.name === `question1`) {
        firstQuestionChecked = true;
        firstAnswer = evtInp.target.value;
      } else {
        secondQuestionChecked = true;
        secondAnswer = evtInp.target.value;
      }

      if (firstQuestionChecked && secondQuestionChecked) {
        this._screen.checkAnswers(firstAnswer, secondAnswer, this._screen.currentQuestion);
        this.showNextGame();
      }
    };
  }
}
