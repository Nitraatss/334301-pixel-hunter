import GameScreen from './game-screen';
import RulesView from '../view/rules-view';

export default class RulesScreen extends GameScreen {
  constructor(model) {
    super(model);
    this.init();
  }

  init() {
    this._screen = new RulesView();

    this._screen.onRulesInputChange = (rulesButton, rulesInput) => {
      rulesButton.disabled = !rulesInput.value;
    };

    this._screen.onRulesButtonClick = (rulesInput) => {
      this.model.newPlayerName = rulesInput.value;
      this.showNextGame();
    };
  }
}
