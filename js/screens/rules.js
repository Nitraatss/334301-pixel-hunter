import gameState from '../game-state';
import showNextScreen from '../show-next-screen';
import RulesView from '../view/rules-view';

const rules = () => {
  const rulesScreen = new RulesView();

  rulesScreen.onRulesInputChange = (rulesButton, rulesInput) => {
    rulesButton.disabled = !rulesInput.value;
  };

  rulesScreen.onRulesButtonClick = (rulesInput) => {
    gameState.newPlayerName = rulesInput.value;
    showNextScreen();
  };

  return rulesScreen;
};

export default rules;
