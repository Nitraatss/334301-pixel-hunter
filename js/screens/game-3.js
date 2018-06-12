import creatDOMElement from '../create-dom-element';
import activateBackButton from '../activate-back-button';
import showFooter from './parts/show-footer';
import formGameHeader from './parts/form-game-header';
import formStatsListMarkup from './parts/form-stats-list-markup';
import showNextScreen from '../show-next-screen';
import gameState from '../game-state';
import getCurrentQuestion from '../get-current-question';

const AVERAGE_TIME = 15;

const formOptionsMArkup = (options) =>
  options.map((option) => {
    return `
      <div class="game__option">
        <img src="${option.src}" alt="${option.alt}" width="304" height="455">
      </div>
    `;
  }).join(` `);

const formMarkup = (currentQuestion) => `
  ${formGameHeader(gameState.lives, gameState.timeLimit)}
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${formOptionsMArkup(currentQuestion.options)}
    </form>
    <div class="stats">
      <ul class="stats">
        ${formStatsListMarkup(gameState.answers)}
      </ul>
    </div>
  </div>
  ${showFooter()}
`;

const checkAnswer = (answer) => {
  if (answer === `photo`) {
    gameState.addAnswer({
      correct: true,
      time: AVERAGE_TIME
    });
  } else {
    gameState.addAnswer({
      correct: false,
      time: AVERAGE_TIME
    });

    gameState.looseLife();
  }
};

const gameThree = {
  element: () => creatDOMElement(formMarkup(getCurrentQuestion())),
  init: () => {
    activateBackButton();

    const onOptionClick = (evt) => {
      const currentAnswer = evt.target.firstElementChild.alt;

      checkAnswer(currentAnswer);
      showNextScreen();
    };

    const gameOptions = document.querySelectorAll(`.game__option`);

    gameOptions.forEach((option) => {
      option.addEventListener(`click`, onOptionClick);
    });
  }
};

export default gameThree;
