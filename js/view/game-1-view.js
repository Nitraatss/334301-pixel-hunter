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
        <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
        <form class="game__content">
          <div class="game__option">
            <img src="${this.currentQuestion.optionOne.src}" alt="Option 1" width="468" height="458">
            <label class="game__answer game__answer--photo">
              <input name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input name="question1" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>
          <div class="game__option">
            <img src="${this.currentQuestion.optionTwo.src}" alt="Option 2" width="468" height="458">
            <label class="game__answer  game__answer--photo">
              <input name="question2" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input name="question2" type="radio" value="paint">
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
    const inputs = this.element.querySelectorAll(`input`);

    inputs.forEach((input) => {
      input.addEventListener(`change`, (evtInp) => {
        this.onInputChange(evtInp.target.name, evtInp.target.value);
      });
    });

    activateBackButton(this.element);
  }

  onInputChange() {
  }

  checkAnswers() {
  }
}

export default GameOneView;
