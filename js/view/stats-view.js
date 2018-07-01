import AbstractView from './abstract-view';
import activateBackButton from '../activate-back-button';
import showFooter from '../screens/parts/show-footer';
import formStatsListMarkup from '../screens/parts/form-stats-list-markup';

const FAST_TIME = 10;
const SLOW_TIME = 20;
const STATS_INDEX = -1;

class StatsView extends AbstractView {
  constructor(gameState, gameHistory) {
    super();
    this.gameState = gameState;
    this.gameHistory = gameHistory;
  }

  get template() {
    return `
      <header class="header">
        <div class="header__back">
          <button class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.svg" width="101" height="44">
          </button>
        </div>
      </header>
      <div class="result">
        ${this._formTabelsMarkup(this.gameHistory)}
      </div>
      ${showFooter()}
    `;
  }

  bind() {
    activateBackButton(this.element);
    this.gameState.gameIndex = STATS_INDEX;
  }

  checkAnswers() {
  }

  _formTabelsMarkup(history) {
    return history.map((result, tabelId) => this._formTabelMarkup(result, tabelId)).join(` `);
  }

  _formTabelMarkup(game, tabelNumber) {
    const tabelMarkup = {
      headerText: ``,
      listItems: ``,
      correctAnswersResult: ``,
      fastAnswers: ``,
      lives: ``,
      slowAnswers: ``,
      totalResult: ``
    };

    tabelMarkup.listItems = formStatsListMarkup(game.answers);

    if (!tabelNumber && game.result > 0) {
      tabelMarkup.headerText = `<h1>ПОБЕДА!</h1>`;
    } else if (!tabelNumber && game.result < 0) {
      tabelMarkup.headerText = `<h1>FAIL</h1>`;
    } else {
      tabelMarkup.headerText = ``;
    }

    if (game.result > 0) {
      tabelMarkup.correctAnswersResult = StatsView.formCorrectAnswersMarkup(game.answers);
      tabelMarkup.fastAnswers = StatsView.formFastAnswersMarkup(game.answers);
      tabelMarkup.lives = StatsView.formLivesMarkup(game.lives);
      tabelMarkup.slowAnswers = StatsView.formSlowAnswersMarkup(game.answers);
      tabelMarkup.totalResult = `
      <tr>
        <td colspan="5" class="result__total  result__total--final">${game.result}</td>
      </tr>
    `;
    } else {
      tabelMarkup.correctAnswersResult = `
      <td class="result__total"></td>
      <td class="result__total  result__total--final">FAIL</td>
    `;
    }

    return `
      ${tabelMarkup.headerText}
      <table class="result__table">
        <tr>
          <td class="result__number">${tabelNumber + 1}.</td>
          <td colspan="2">
            <ul class="stats">
              ${tabelMarkup.listItems}
            </ul>
          </td>
          ${tabelMarkup.correctAnswersResult}
        </tr>
        ${tabelMarkup.fastAnswers}
        ${tabelMarkup.lives}
        ${tabelMarkup.slowAnswers}
        ${tabelMarkup.totalResult}
    </table>
  `;
  }

  static formCorrectAnswersMarkup(answers) {
    const correctAnswersResult = answers.reduce((accumulator, answer) => answer.correct ? accumulator + 100 : accumulator, 0);

    return `
      <td class="result__points">×&nbsp;100</td>
      <td class="result__total">${correctAnswersResult}</td>
  `;
  }

  static formFastAnswersMarkup(answers) {
    const fastAnswersNumber = answers.filter((answer) => answer.time < FAST_TIME && answer.correct).length;

    return fastAnswersNumber ? `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${fastAnswersNumber}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${fastAnswersNumber * 50}</td>
        </tr>
      ` :
      ``;
  }

  static formLivesMarkup(lives) {
    return lives ? `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${lives * 50}</td>
      </tr>
    ` :
      ``;
  }

  static formSlowAnswersMarkup(answers) {
    const slowAnswersNumber = answers.filter((answer) => answer.time > SLOW_TIME && answer.correct).length;

    return slowAnswersNumber ? `
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${slowAnswersNumber}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">-${slowAnswersNumber * 50}</td>
        </tr>
      ` :
      ``;
  }
}

export default StatsView;
