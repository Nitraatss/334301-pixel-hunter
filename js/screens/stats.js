import creatDOMElement from '../create-dom-element';
import gameHistory from '../game-history';
import gameState from '../game-state';
import activateBackButton from '../activate-back-button';
import formStatsListMarkup from './parts/form-stats-list-markup';
import showFooter from './parts/show-footer';
import {showResults} from '../show-results';

const FAST_TIME = 10;
const SLOW_TIME = 20;

const formCorrectAnswersMarkup = (answers) => {
  let correctAnswersResult = 0;

  answers.forEach((answer) => {
    if (answer.correct) {
      correctAnswersResult = correctAnswersResult + 100;
    }
  });

  return `
      <td class="result__points">×&nbsp;100</td>
      <td class="result__total">${correctAnswersResult}</td>
  `;
};

const formFastAnswersMarkup = (answers) => {
  let fastAnswerCounter = 0;

  answers.forEach((answer) => {
    if (answer.time < FAST_TIME && answer.correct) {
      fastAnswerCounter = fastAnswerCounter + 1;
    }
  });

  if (fastAnswerCounter) {
    return `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${fastAnswerCounter}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${fastAnswerCounter * 50}</td>
        </tr>
      `;
  } else {
    return ``;
  }
};

const formLivesMarkup = (lives) => {
  if (lives) {
    return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${lives * 50}</td>
      </tr>
    `;
  } else {
    return ``;
  }
};

const formSlowAnswersMarkup = (answers) => {
  let slowAnswerCounter = 0;

  answers.forEach((answer) => {
    if (answer.time > SLOW_TIME && answer.correct) {
      slowAnswerCounter = slowAnswerCounter + 1;
    }
  });

  if (slowAnswerCounter) {
    return `
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${slowAnswerCounter}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">-${slowAnswerCounter * 50}}</td>
        </tr>
      `;
  } else {
    return ``;
  }
};

const formTabelMarkup = (game, tabelNumber) => {
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

  if (tabelNumber === 1 && game.result > 0) {
    tabelMarkup.headerText = `<h1>ПОБЕДА!</h1>`;
  } else if (tabelNumber === 1 && game.result < 0) {
    tabelMarkup.headerText = `<h1>FAIL</h1>`;
  } else {
    tabelMarkup.headerText = ``;
  }

  if (game.result > 0) {
    tabelMarkup.correctAnswersResult = formCorrectAnswersMarkup(game.answers);
    tabelMarkup.fastAnswers = formFastAnswersMarkup(game.answers);
    tabelMarkup.lives = formLivesMarkup(game.lives);
    tabelMarkup.slowAnswers = formSlowAnswersMarkup(game.answers);
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
          <td class="result__number">${tabelNumber}.</td>
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
};

const formTabelsMarkup = (currentGame, history) => {
  currentGame.finalResult = showResults(currentGame.answers, currentGame.lives);

  history.addGame({
    playerName: currentGame.playerName,
    lives: currentGame.lives,
    answers: currentGame.answers,
    result: currentGame.result
  });

  let tabelId = 0;

  return history.allGames.map((game) => {
    tabelId = tabelId + 1;
    return formTabelMarkup(game, tabelId);
  }).join(` `);
};

const formMarkup = () => `
  <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>
  <div class="result">
    ${formTabelsMarkup(gameState, gameHistory)}
  </div>
  ${showFooter()}
`;

const stats = {
  element: () => creatDOMElement(formMarkup()),
  init: () => {
    activateBackButton();
  }
};

export default stats;
