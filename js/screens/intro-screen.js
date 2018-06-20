import GameScreen from './game-screen';
import IntroView from '../view/intro-view';
import Application from '../application';

export default class IntroScreen extends GameScreen {
  constructor(model) {
    super(model);
    this.init();
  }

  init() {
    this._screen = new IntroView();

    this._screen.onIntroAsteriskClick = () => {
      Application.showGreeting();
    };
  }
}
