'use strict';

const SCREEN_INDEX = {
  FIRST: 0,
  SECOND: 1,
  THIRD: 2
};

const changeElementPosition = (arr, oldIndex, newIndex) => {
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);

  return arr;
};

const sortScreens = (screens) => {
  let i;

  for (i = SCREEN_INDEX.FIRST; i < screens.length; i++) {
    if (screens[i].id === `loader`) {
      changeElementPosition(screens, i, SCREEN_INDEX.FIRST);
      break;
    }
  }

  for (i = SCREEN_INDEX.SECOND; i < screens.length; i++) {
    if (screens[i].id === `greeting`) {
      changeElementPosition(screens, i, SCREEN_INDEX.SECOND);
      break;
    }
  }

  for (i = SCREEN_INDEX.THIRD; i < screens.length; i++) {
    if (screens[i].id === `greeting`) {
      changeElementPosition(screens, i, SCREEN_INDEX.THIRD);
      break;
    }
  }

  for (i = SCREEN_INDEX.THIRD + 1; i < screens.length; i++) {
    if (screens[i].id === `stats`) {
      changeElementPosition(screens, i, (screens.length - 1));
      break;
    }
  }
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
    screenIndex = SCREEN_INDEX.FIRST;
  } else if (screenIndex < SCREEN_INDEX.FIRST) {
    screenIndex = screens.length - 1;
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
const screens = Array.from(document.querySelectorAll(`template`)).map((item) => {
  return {
    content: item.content,
    id: item.id
  };
});

screens.push({
  content: mainCentral.querySelector(`#main`).cloneNode(true),
  id: `loader`
});

sortScreens(screens);

let screenIndex = SCREEN_INDEX.FIRST;
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
