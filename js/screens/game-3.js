import showNextScreen from '../show-next-screen';
import gameState from '../game-state';
import getCurrentQuestion from '../get-current-question';
import GameThreeView from '../view/game-3-view';

const AVERAGE_TIME = 15;

const gameThree = () => {
  const gameThreeScreen = new GameThreeView(gameState, getCurrentQuestion());

  gameThreeScreen.checkAnswer = (answer) => {
    if (answer === `paint`) {
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

  gameThreeScreen.onOptionClick = (evtOp) => {
    const currentAnswer = evtOp.target.firstElementChild.alt;

    gameThreeScreen.checkAnswer(currentAnswer);
    showNextScreen();
  };

  return gameThreeScreen;
};

export default gameThree;
