import NetworkService from "./network-service";

const APP_ID = `2448148822122`;
const RESULTS_SERVER = `https://es.dump.academy/pixel-hunter/stats/`;

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
