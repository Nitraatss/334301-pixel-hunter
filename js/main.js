'use strict';

const FIRST_SCREEN_INDEX = 0;

const showScreen = (screen) => {
  mainCentral.innerHTML = ``;
  mainCentral.appendChild(screen.cloneNode(true));
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
    screenIndex = FIRST_SCREEN_INDEX;
  } else if (screenIndex < FIRST_SCREEN_INDEX) {
    screenIndex = screens.length - 1;
  }

  showScreen(screens[screenIndex]);
};

const creatArrows = () => {
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

const onLeftArrowClick = () => {
  showPreviousScreen();
};

const onRightArrowClick = () => {
  showNextScreen();
};

const body = document.querySelector(`body`);
const mainCentral = document.querySelector(`main.central`);
const screens = Array.from(document.querySelectorAll(`template`)).map((item) => item.content);

let screenIndex = FIRST_SCREEN_INDEX;
switchScreen(screenIndex);
creatArrows();

const arrowsButtons = document.querySelectorAll(`button.arrows__btn`);
const leftArrow = arrowsButtons[0];
const rightArrow = arrowsButtons[1];

leftArrow.addEventListener(`click`, onLeftArrowClick);
rightArrow.addEventListener(`click`, onRightArrowClick);

document.addEventListener(`keydown`, (evt) => {
  if (evt.key === `ArrowRight`) {
    showNextScreen();
  }

  if (evt.key === `ArrowLeft`) {
    showPreviousScreen();
  }
});
