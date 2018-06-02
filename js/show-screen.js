const mainCentral = document.querySelector(`main.central`);

/* Отображение определьной страницы */
const showScreen = ({screen, init}) => {
  mainCentral.innerHTML = ``;
  mainCentral.appendChild(screen);

  init();
};

export default showScreen;
