import greeting from './screens/greeting';
import showScreen from './show-screen';
import gameState from './game-state';

const activateBackButton = (element) => {
  const onButtonBackClick = () => {
    gameState.resetParams();
    showScreen(greeting);
  };

  const buttonBack = element.querySelector(`button.back`);

  buttonBack.addEventListener(`click`, onButtonBackClick);
};

export default activateBackButton;
