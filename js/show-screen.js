const mainCentral = document.querySelector(`main.central`);

const showScreen = (screen) => {
  mainCentral.innerHTML = ``;
  mainCentral.appendChild(screen);
};

export default showScreen;
