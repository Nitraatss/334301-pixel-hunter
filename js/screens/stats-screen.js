import GameScreen from './game-screen';
import StatsView from '../view/stats-view';

export default class StatsScreen extends GameScreen {
  constructor(model, stats) {
    super(model);

    this.stats = stats;

    this.init();
  }

  init() {
    this._screen = new StatsView(this.model, this.stats);
  }
}

