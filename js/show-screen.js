const mainCentral = document.querySelector(`main.central`);

const showScreen = (screen) => {
  mainCentral.innerHTML = ``;
  mainCentral.appendChild(screen.element());
  screen.init();
};

export default showScreen;
