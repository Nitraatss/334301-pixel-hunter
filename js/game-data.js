import createDOMElement from './create-dom-element';

const DATA_SERVER = `https://es.dump.academy/pixel-hunter/questions`;

class LoadService {
  constructor() {
    this.allQuestions = [];
  }

  checkLoad(response) {
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      return [];
    }
    return this.showError(`Неизвестный статус: ${response.status} ${response.statusText}`);
  }

  showError(errorMessage) {
    const errorMarkup = `
      <section class="modal-error modal-error__wrap">
        <div class="modal-error__inner">
          <h2 class="modal-error__title">Произошла ошибка!</h2>
          <p class="modal-error__text">${errorMessage}</p>
          <p class="modal-error__text">Пожалуйста, перезагрузите страницу.</p>
        </div>
      </section>
    `;

    const errorModal = createDOMElement(errorMarkup);

    const body = document.querySelector(`body`);

    body.appendChild(errorModal);
  }

  formQuestions(questions) {
    this.allQuestions = questions;
  }

  loadQuestions() {
    return fetch(DATA_SERVER).then(this.checkLoad).then(this.formQuestions.bind(this)).catch(this.showError);
  }
}

const gameData = new LoadService();

export default gameData;
