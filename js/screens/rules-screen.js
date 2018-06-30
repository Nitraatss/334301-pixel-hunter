import GameScreen from './game-screen';
import RulesView from '../view/rules-view';

export default class RulesScreen extends GameScreen {
  constructor(model) {
    super(model);
    this.init();
  }

  init() {
    this._screen = new RulesView(this._model);

    this._screen.onRulesButtonClick = (rulesInputvalue) => {
      this._model.newPlayerName = rulesInputvalue;
      this.showNextGame();
    };
  }
}
