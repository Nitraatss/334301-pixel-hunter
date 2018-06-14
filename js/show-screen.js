const mainCentral = document.querySelector(`main.central`);

const showScreen = (screen) => {
  const newScreen = screen();
  mainCentral.innerHTML = ``;
  mainCentral.appendChild(newScreen.element);
};

export default showScreen;
