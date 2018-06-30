import GameScreen from './game-screen';
import StatsView from '../view/stats-view';

export default class StatsScreen extends GameScreen {
  constructor(model, stats) {
    super(model);

    this._stats = stats;

    this.init();
  }

  init() {
    this._screen = new StatsView(this._model, this._stats);
  }
}

