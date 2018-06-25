import GameScreen from './game-screen';
import GreetingView from '../view/greeting-view';
import Application from '../application';

export default class GreetingScreen extends GameScreen {
  constructor(model) {
    super(model);
    this.init();
  }

  init() {
    this._screen = new GreetingView();

    this._screen.onGreetingContinueClick = () => {
      Application.showRules();
    };
  }
}

