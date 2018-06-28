import createDOMElement from './create-dom-element';

const DATA_SERVER = `https://es.dump.academy/pixel-hunter/questions`;
const APP_ID = `2448148822122`;
const RESULTS_SERVER = `https://es.dump.academy/pixel-hunter/stats/`;

class NetworkService {
  constructor() {
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
}

class LoadService extends NetworkService {
  constructor() {
    super();
    this.allQuestions = [];
  }

  formQuestions(questions) {
    this.allQuestions = questions;
  }

  loadQuestions() {
    return fetch(DATA_SERVER).then(this.checkLoad).then(this.formQuestions.bind(this)).catch(this.showError);
  }
}

export const gameData = new LoadService();

export default class StatsService extends NetworkService {
  constructor(username) {
    super();
    this.previousResults = [];
    this.resultsUrl = `${RESULTS_SERVER}${APP_ID}-${username}`;
  }

  saveResult(result) {
    return fetch(`${this.resultsUrl}`, {
      method: `POST`,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': `application/json`
      }
    }).
      catch(this.showError);
  }

  formResults(results) {
    this.previousResults = results;
  }

  loadResults() {
    return fetch(this.resultsUrl).then(this.checkLoad).then(this.formResults.bind(this)).catch(this.showError);
  }
}
