import AbstractView from './abstract-view';
import createDOMElement from '../create-dom-element';
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
        <p class="game__task">Угадай, фото или рисунок?</p>
        <form class="game__content  game__content--wide">
          <div class="game__option">
            <img src="${this.currentQuestion.src}" alt="Option 1" width="705" height="455">
            <label class="game__answer  game__answer--photo">
              <input name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--wide  game__answer--paint">
              <input name="question1" type="radio" value="paint">
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

  render() {
    return createDOMElement(this.template);
  }

  bind() {
    const gameAnswers = this.element.querySelectorAll(`.game__answer`);

    gameAnswers.forEach((answer) => {
      answer.querySelector(`input`).addEventListener(`change`, (evtInp) => {
        this.onInputChange(evtInp);
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
