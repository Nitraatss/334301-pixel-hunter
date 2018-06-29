import AbstractView from './abstract-view';
import activateBackButton from '../activate-back-button';
import showFooter from '../screens/parts/show-footer';
import formGameHeader from '../screens/parts/form-game-header';
import formStatsListMarkup from '../screens/parts/form-stats-list-markup';

class GameTwoView extends AbstractView {
  constructor(gameState, currentQuestion) {
    super();
    this.gameState = gameState;
    this.currentQuestion = currentQuestion;
  }

  get template() {
    return `
      ${formGameHeader(this.gameState.lives, this.gameState.timeLimit)}
      <div class="game">
        <p class="game__task">${this.currentQuestion.question}</p>
        <form class="game__content  game__content--wide">
          <div class="game__option">
            <img src="${this.currentQuestion.answers[0].image.url}" alt="${this.currentQuestion.answers[0].type}" width="${this.currentQuestion.answers[0].image.width}" height="${this.currentQuestion.answers[0].image.height}">
            <label class="game__answer  game__answer--photo">
              <input name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--wide  game__answer--paint">
              <input name="question1" type="radio" value="painting">
              <span>Рисунок</span>
            </label>
          </div>
        </form>
        <div class="stats">
          <ul class="stats">
            ${formStatsListMarkup(this.gameState.answers)}
          </ul>
        </div>
      </div>
      ${showFooter()}
    `;
  }

  bind() {
    const gameAnswers = this.element.querySelectorAll(`.game__answer`);

    gameAnswers.forEach((answer) => {
      answer.querySelector(`input`).addEventListener(`change`, (evtInp) => {
        this.onInputChange(evtInp.target.value);
      });
    });

    activateBackButton(this.element);
  }

  onInputChange() {
  }

  checkAnswer() {
  }
}

export default GameTwoView;
