import creatDOMElement from '../create-dom-element';
import activateBackButton from '../activate-back-button';
import showFooter from './parts/show-footer';
import formStatsListMarkup from './parts/form-stats-list-markup';
import formGameHeader from './parts/form-game-header';
import showNextScreen from '../show-next-screen';
import gameState from '../game-state';
import getCurrentQuestion from '../get-current-question';

const AVERAGE_TIME = 15;

const formMarkup = (currentQuestion) => `
  ${formGameHeader(gameState.lives, gameState.timeLimit)}
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${currentQuestion.src}" alt="Option 1" width="705" height="455">
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
        ${formStatsListMarkup(gameState.answers)}
      </ul>
    </div>
  </div>
  ${showFooter()}
`;

const checkAnswer = (answer, question) => {
  if (answer === question.correctAnswerValue) {
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

const gameTwo = {
  element: () => creatDOMElement(formMarkup(getCurrentQuestion())),
  init: () => {
    activateBackButton(gameTwo);

    const onInputChange = (evt) => {
      const currentAnswer = evt.target.value;
      const currentQuestion = getCurrentQuestion();

      checkAnswer(currentAnswer, currentQuestion);
      showNextScreen();
    };

    const gameAnswers = document.querySelectorAll(`.game__answer`);

    gameAnswers.forEach((answer) => {
      answer.querySelector(`input`).addEventListener(`change`, onInputChange);
    });
  }
};

export default gameTwo;
