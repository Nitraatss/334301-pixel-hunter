import creatDOMElement from '../create-dom-element';
import activateBackButton from '../activate-back-button';
import showFooter from './parts/show-footer';
import formGameHeader from './parts/form-game-header';
import formStatsListMarkup from './parts/form-stats-list-markup';
import showNextScreen from '../show-next-screen';
import gameState from '../game-state';
import getCurrentQuestion from '../get-current-question';

const AVERAGE_TIME = 15;

const formMarkup = (currentQuestion) => `
  ${formGameHeader(gameState.lives, gameState.timeLimit)}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${currentQuestion.optionOne.src}" alt="Option 1" width="468" height="458">
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
        <img src="${currentQuestion.optionTwo.src}" alt="Option 2" width="468" height="458">
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
        ${formStatsListMarkup(gameState.answers)}
      </ul>
    </div>
  </div>
  ${showFooter()}
`;

const checkAnswers = (firstOptionValue, secondOptionValue, question) => {
  if (question.optionOne.correctAnswerValue === firstOptionValue && question.optionTwo.correctAnswerValue === secondOptionValue) {
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

const gameOne = {
  element: () => creatDOMElement(formMarkup(getCurrentQuestion())),
  init: () => {
    let firstAnswer;
    let secondAnswer;
    const currentQuestion = getCurrentQuestion();

    activateBackButton(gameOne);

    const onInputChange = (evtInp) => {
      if (evtInp.target.name === `question1`) {
        firstQuestionChecked = true;
        firstAnswer = evtInp.target.value;
      } else {
        secondQuestionChecked = true;
        secondAnswer = evtInp.target.value;
      }

      if (firstQuestionChecked && secondQuestionChecked) {
        checkAnswers(firstAnswer, secondAnswer, currentQuestion);
        showNextScreen();
      }
    };

    const inputs = document.querySelectorAll(`input`);

    let firstQuestionChecked = false;
    let secondQuestionChecked = false;

    inputs.forEach((input) => {
      input.addEventListener(`change`, onInputChange);
    });
  }
};

export default gameOne;
