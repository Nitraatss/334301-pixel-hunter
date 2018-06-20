import GameScreen from './game-screen';
import StatsView from '../view/stats-view';
import gameHistory from '../game-history';

export default class StatsScreen extends GameScreen {
  constructor(model) {
    super(model);

    this.init();
  }

  init() {
    this._screen = new StatsView(this.model, gameHistory);
  }
}

