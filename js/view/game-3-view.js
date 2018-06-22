import AbstractView from './abstract-view';
import activateBackButton from '../activate-back-button';
import showFooter from '../screens/parts/show-footer';
import formGameHeader from '../screens/parts/form-game-header';
import formStatsListMarkup from '../screens/parts/form-stats-list-markup';

class GameThreeView extends AbstractView {
  constructor(gameState, currentQuestion) {
    super();
    this.gameState = gameState;
    this.currentQuestion = currentQuestion;
  }

  get template() {
    return `
      ${formGameHeader(this.gameState.lives, this.gameState.timeLimit)}
      <div class="game">
        <p class="game__task">Найдите рисунок среди изображений</p>
        <form class="game__content  game__content--triple">
          ${this.formOptionsMArkup(this.currentQuestion.options)}
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
    const gameOptions = this.element.querySelectorAll(`.game__option`);

    gameOptions.forEach((option) => {
      option.addEventListener(`click`, (evtOp) => {
        this.onOptionClick(evtOp.target.firstElementChild.alt);
      });
    });

    activateBackButton(this.element);
  }

  formOptionsMArkup(options) {
    return options.map((option) => {
      return `
      <div class="game__option">
        <img src="${option.src}" alt="${option.alt}" width="304" height="455">
      </div>
    `;
    }).join(` `);
  }

  onOptionClick() {
  }

  checkAnswers() {
  }
}

export default GameThreeView;
