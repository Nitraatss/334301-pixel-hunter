import AbstractView from './abstract-view';
import activateBackButton from '../activate-back-button';
import showFooter from '../screens/parts/show-footer';
import formGameHeader from '../screens/parts/form-game-header';
import formStatsListMarkup from '../screens/parts/form-stats-list-markup';

class OneOfThreeView extends AbstractView {
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
        <form class="game__content  game__content--triple">
          ${this.formOptionsMarkup(this.currentQuestion.answers)}
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
    const gameContent = this.element.querySelector(`.game__content`);
    const gameOptionsImages = gameContent.querySelectorAll(`img`);

    gameOptionsImages.forEach((option) => {
      option.addEventListener(`click`, () => {
        this.onOptionClick(option.alt, this.currentQuestion.answers);
      });
    });

    activateBackButton(this.element, this.onBackButton.bind(this));
  }

  formOptionsMarkup(options) {
    return options.map((option) => `
      <div class="game__option">
        <img src="${option.image.url}" alt="${option.type}" width="${option.image.width}" height="${option.image.height}">
      </div>
    `
    ).join(` `);
  }

  onOptionClick() {
  }

  checkAnswers() {
  }

  setCorrectAnswer() {
  }

  onBackButton() {
  }
}

export default OneOfThreeView;

