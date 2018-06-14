import showNextScreen from '../show-next-screen';
import gameState from '../game-state';
import getCurrentQuestion from '../get-current-question';
import GameOneView from '../view/game-1-view';

const AVERAGE_TIME = 15;

const gameOne = () => {
  let firstQuestionChecked = false;
  let secondQuestionChecked = false;
  let firstAnswer;
  let secondAnswer;

  const gameOneScreen = new GameOneView(gameState, getCurrentQuestion());

  gameOneScreen.checkAnswers = (firstOptionValue, secondOptionValue, question) => {
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

  gameOneScreen.onInputChange = (evtInp) => {
    if (evtInp.target.name === `question1`) {
      firstQuestionChecked = true;
      firstAnswer = evtInp.target.value;
    } else {
      secondQuestionChecked = true;
      secondAnswer = evtInp.target.value;
    }

    if (firstQuestionChecked && secondQuestionChecked) {
      gameOneScreen.checkAnswers(firstAnswer, secondAnswer, gameOneScreen.currentQuestion);
      showNextScreen();
    }
  };

  return gameOneScreen;
};

export default gameOne;
