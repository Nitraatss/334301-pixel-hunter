import greeting from './screens/greeting';
import showScreen from './show-screen';

const activateBackButton = (parent) => {
  const onButtonBackClick = () => {
    showScreen(greeting);
  };

  const buttonBack = parent.querySelector(`button.back`);

  buttonBack.addEventListener(`click`, onButtonBackClick);
};

export default activateBackButton;
