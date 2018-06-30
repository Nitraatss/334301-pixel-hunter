import AbstractView from './abstract-view';
import activateBackButton from '../activate-back-button';
import showFooter from '../screens/parts/show-footer';
import formGameHeader from '../screens/parts/form-game-header';
import formStatsListMarkup from '../screens/parts/form-stats-list-markup';

class GameOneView extends AbstractView {
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
        <form class="game__content">
          ${this.formOptionsMArkup(this.currentQuestion.answers)}
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
    const inputs = this.element.querySelectorAll(`input`);

    inputs.forEach((input) => {
      input.addEventListener(`change`, (evtInp) => {
        this.onInputChange(evtInp.target.name, evtInp.target.value);
      });
    });

    activateBackButton(this.element, this.onBackButton.bind(this));
  }

  formOptionsMArkup(options) {
    return options.map((option, optionId) => `
        <div class="game__option">
          <img src="${option.image.url}" alt="${option.type}" width="${option.image.width}" height="${option.image.height}">
          <label class="game__answer game__answer--photo">
            <input name="question${optionId}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question${optionId}" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>
      `
    ).join(` `);
  }

  onInputChange() {
  }

  checkAnswers() {
  }

  onBackButton() {
  }
}

export default GameOneView;
