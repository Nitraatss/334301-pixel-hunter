import showNextScreen from '../show-next-screen';
import IntroView from '../view/intro-view';

const intro = () => {
  const introScreen = new IntroView();

  introScreen.onIntroAsteriskClick = () => {
    showNextScreen();
  };

  return introScreen;
};

export default intro;
