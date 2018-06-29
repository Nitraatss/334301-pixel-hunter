import NetworkService from "./network-service";

const DATA_SERVER = `https://es.dump.academy/pixel-hunter/questions`;

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

const gameData = new LoadService();

export default gameData;

