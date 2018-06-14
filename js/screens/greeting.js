import showNextScreen from '../show-next-screen';
import GreetingView from '../view/greeting-view';

const greeting = () => {
  const greetingScreen = new GreetingView();

  greetingScreen.onGreetingContinueClick = () => {
    showNextScreen();
  };

  return greetingScreen;
};

export default greeting;
