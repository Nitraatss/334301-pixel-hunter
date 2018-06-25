import GameScreen from './game-screen';
import RulesView from '../view/rules-view';

export default class RulesScreen extends GameScreen {
  constructor(model) {
    super(model);
    this.init();
  }

  init() {
    this._screen = new RulesView();

    this.resetGame();
    this.stopTicking();

    this._screen.onRulesButtonClick = (rulesInputvalue) => {
      this.model.newPlayerName = rulesInputvalue;
      this.showNextGame();
    };
  }
}
