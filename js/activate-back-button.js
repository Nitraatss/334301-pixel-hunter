import Application from "./application";
import gameState from "./game-state";
import createDOMElement from "./create-dom-element";

const FIRST_GAME_SCREEN_INDEX = 0;
const FINAL_GAME_SCREEN_INDEX = 9;

const showConfirmModal = (stopTimer = () => {}) => {
  const errorMarkup = `
      <section class="modal-confirm modal-confirm__wrap">
        <form class="modal-confirm__inner">
          <button class="modal-confirm__close" type="button">Закрыть</button>
          <h2 class="modal-confirm__title">Подтверждение</h2>
          <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal-confirm__btn-wrap">
            <button class="modal-confirm__btn">Ок</button>
            <button class="modal-confirm__btn">Отмена</button>
          </div>
        </form>
      </section>
    `;

  const errorModal = createDOMElement(errorMarkup);
  const body = document.querySelector(`body`);
  body.appendChild(errorModal);

  const modalClose = errorModal.querySelector(`.modal-confirm__close`);
  const modalConfirmButtonWrapper = errorModal.querySelector(`.modal-confirm__btn-wrap`);
  const confirmButton = modalConfirmButtonWrapper.childNodes[1];
  const canselButton = modalConfirmButtonWrapper.childNodes[3];

  confirmButton.addEventListener(`click`, (evtB) => {
    evtB.preventDefault();

    stopTimer();
    Application.showGreeting();
    body.removeChild(body.lastChild);
  });

  canselButton.addEventListener(`click`, (evtB) => {
    evtB.preventDefault();
    body.removeChild(body.lastChild);
  });

  modalClose.addEventListener(`click`, () => {
    body.removeChild(body.lastChild);
  });
};

const activateBackButton = (element, stopTimer = () => {}) => {
  const onButtonBackClick = () => {
    if (gameState.gameIndex >= FIRST_GAME_SCREEN_INDEX && gameState.gameIndex <= FINAL_GAME_SCREEN_INDEX) {
      showConfirmModal(stopTimer);
    } else {
      stopTimer();
      Application.showGreeting();
    }
  };

  const buttonBack = element.querySelector(`button.back`);

  buttonBack.addEventListener(`click`, onButtonBackClick);
};

export default activateBackButton;
