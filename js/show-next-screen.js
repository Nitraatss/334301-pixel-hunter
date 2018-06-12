import gameState from './game-state';
import gameData from './game-data';
import showScreen from './show-screen';
import intro from './screens/intro';
import greeting from './screens/greeting';
import rules from './screens/rules';
import gameOne from './screens/game-1';
import gameTwo from './screens/game-2';
import gameThree from './screens/game-3';
import stats from './screens/stats';

const INTRO_SCREEN_INDEX = 1;
const GREETING_SCREEN_INDEX = 2;
const RULES_SCREEN_INDEX = 3;
const STARTING_GAME_SCREEN_INDEX = 4;
const FINAL_GAME_SCREEN_INDEX = 13;
const ANSWERS_NUMBER = 10;

const showGame = (questions, screenIndex) => {
  if (questions[screenIndex - STARTING_GAME_SCREEN_INDEX].type === `game-1`) {
    showScreen(gameOne);
  }

  if (questions[screenIndex - STARTING_GAME_SCREEN_INDEX].type === `game-2`) {
    showScreen(gameTwo);
  }

  if (questions[screenIndex - STARTING_GAME_SCREEN_INDEX].type === `game-3`) {
    showScreen(gameThree);
  }
};

const showNextScreen = () => {
  if (!gameState.lives) {
    if (gameState.answers.length !== ANSWERS_NUMBER) {
      let i = gameState.answers.length;
      while (i < (ANSWERS_NUMBER)) {
        gameState.addAnswer({
          answers: false,
          time: 0
        });
        i++;
      }
    }

    showScreen(stats);
  } else {
    gameState.screenIndexInc();

    const currentScreenIndex = gameState.screenIndex;

    if (currentScreenIndex === INTRO_SCREEN_INDEX) {
      showScreen(intro);
    } else if (currentScreenIndex === GREETING_SCREEN_INDEX) {
      showScreen(greeting);
    } else if (currentScreenIndex === RULES_SCREEN_INDEX) {
      showScreen(rules);
    } else if (currentScreenIndex >= STARTING_GAME_SCREEN_INDEX && currentScreenIndex <= FINAL_GAME_SCREEN_INDEX) {
      showGame(gameData, currentScreenIndex);
    } else {
      showScreen(stats);
    }
  }
};

export default showNextScreen;
