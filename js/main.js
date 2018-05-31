'use strict';

const FIRST_SCREEN_INDEX = 0;

const sortScreens = (screens) => {
  const screensList = [`loader`, `greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`];

  return screensList.map((item) => screens.find((screen) => screen.id === item));
};

const showScreen = (screen) => {
  mainCentral.innerHTML = ``;
  mainCentral.appendChild(screen.content.cloneNode(true));
};

const showNextScreen = () => {
  screenIndex = screenIndex + 1;
  switchScreen(screenIndex);
};

const showPreviousScreen = () => {
  screenIndex = screenIndex - 1;
  switchScreen(screenIndex);
};

const switchScreen = () => {
  if (screenIndex > screens.length - 1) {
    screenIndex = screens.length - 1;
  } else if (screenIndex < FIRST_SCREEN_INDEX) {
    screenIndex = FIRST_SCREEN_INDEX;
  }

  showScreen(screens[screenIndex]);
};

const createArrows = () => {
  const arrowsElement = document.createElement(`div`);
  const arrowsMarkup = `
    <style>
      .arrows__wrap {
        position: absolute;
        top: 95px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>
  `;

  arrowsElement.classList.add(`arrows__wrap`);
  arrowsElement.innerHTML = arrowsMarkup;

  body.appendChild(arrowsElement.cloneNode(true));

  return arrowsElement;
};

const body = document.querySelector(`body`);
const mainCentral = document.querySelector(`main.central`);
let screens = Array.from(document.querySelectorAll(`template`)).map((item) => ({
  content: item.content,
  id: item.id
}));

screens.push({
  content: mainCentral.querySelector(`#main`).cloneNode(true),
  id: `loader`
});

screens = sortScreens(screens);

let screenIndex = FIRST_SCREEN_INDEX;

switchScreen(screenIndex);
createArrows();

const arrowsButtons = document.querySelectorAll(`button.arrows__btn`);
const leftArrow = arrowsButtons[0];
const rightArrow = arrowsButtons[1];

leftArrow.addEventListener(`click`, () => {
  showPreviousScreen();
});

rightArrow.addEventListener(`click`, () => {
  showNextScreen();
});

document.addEventListener(`keydown`, (evt) => {
  switch (evt.key) {
    case `ArrowRight`:
      showNextScreen();
      break;
    case `ArrowLeft`:
      showPreviousScreen();
      break;
  }
});
