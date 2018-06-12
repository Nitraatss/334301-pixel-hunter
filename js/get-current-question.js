import gameState from './game-state';
import gameData from './game-data';

const STARTING_GAME_SCREEN_INDEX = 4;

const getCurrentQuestion = () => gameData[gameState.screenIndex - STARTING_GAME_SCREEN_INDEX];

export default getCurrentQuestion;

