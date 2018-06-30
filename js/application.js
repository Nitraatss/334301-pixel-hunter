import IntroScreen from './screens/intro-screen';
import GreetingScreen from './screens/greeting-screen';
import RulesScreen from './screens/rules-screen';
import showScreen from './show-screen';
import gameState from './game-state';
import StatsScreen from './screens/stats-screen';
import GameOneScreen from './screens/game-1-screen';
import GameTwoScreen from './screens/game-2-screen';
import GameThreeScreen from './screens/game-3-screen';
import gameData from './game-services/game-data';
import {showResults} from './show-results';
import StatsService from './game-services/stats-service';

export default class Application {
  static showIntro() {
    gameData.loadQuestions().then(
        () => {
          const gameScreen = new IntroScreen(gameState);
          showScreen(gameScreen.screen);
        }
    );
  }

  static showGreeting() {
    const gameScreen = new GreetingScreen(gameState);
    showScreen(gameScreen.screen);
  }

  static showRules() {
    const gameScreen = new RulesScreen(gameState);
    showScreen(gameScreen.screen);
  }

  static showGameOne() {
    const gameScreen = new GameOneScreen(gameState);
    showScreen(gameScreen.screen);
    return gameScreen;
  }

  static showGameTwo() {
    const gameScreen = new GameTwoScreen(gameState);
    showScreen(gameScreen.screen);
    return gameScreen;
  }

  static showGameThree() {
    const gameScreen = new GameThreeScreen(gameState);
    showScreen(gameScreen.screen);
    return gameScreen;
  }

  static showStats() {
    gameState.finalResult = showResults(gameState.answers, gameState.lives);

    const gameStats = new StatsService(gameState.playerName);

    gameStats.saveResult(
        {
          playerName: gameState.playerName,
          lives: gameState.lives,
          answers: gameState.answers,
          result: gameState.result
        }
    )
    .then(
        () => gameStats.loadResults()
    )
    .then(
        () => {
          const gameScreen = new StatsScreen(gameState, gameStats.previousResults.reverse());
          showScreen(gameScreen.screen);
        }
    );
  }
}
