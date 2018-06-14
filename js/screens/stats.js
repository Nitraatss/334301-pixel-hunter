import gameHistory from '../game-history';
import gameState from '../game-state';
import StatsView from '../view/stats-view';

const stats = () => new StatsView(gameState, gameHistory);

export default stats;

