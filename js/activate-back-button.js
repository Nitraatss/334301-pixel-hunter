import greeting from './screens/greeting';
import showScreen from './show-screen';
import gameState from './game-state';

const activateBackButton = () => {
  const onButtonBackClick = () => {
    gameState.resetParams();
    showScreen(greeting);
  };

  const buttonBack = document.querySelector(`button.back`);

  buttonBack.addEventListener(`click`, onButtonBackClick);
};

export default activateBackButton;
