import showNextScreen from '../show-next-screen';
import gameState from '../game-state';
import getCurrentQuestion from '../get-current-question';
import GameTwoView from '../view/game-2-view';

const AVERAGE_TIME = 15;

const gameTwo = () => {
  const gameTwoScreen = new GameTwoView(gameState, getCurrentQuestion());

  gameTwoScreen.checkAnswer = (answer, question) => {
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

  gameTwoScreen.onInputChange = (evtInp) => {
    const currentAnswer = evtInp.target.value;

    gameTwoScreen.checkAnswer(currentAnswer, gameTwoScreen.currentQuestion);
    showNextScreen();
  };

  return gameTwoScreen;
};

export default gameTwo;
