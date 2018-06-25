const MINIMUM_TIME = 0;
const EDGE_TIME = 5;
const BASIC_COLOR = `#00222d`;
const RED_COLOR = `red`;

export class Timer {
  constructor(time) {
    this.time = time;
  }

  updateTime() {
    const gameTimer = document.querySelector(`.game__timer`);

    if (this.time > MINIMUM_TIME) {
      gameTimer.textContent = this.time;
    } else {
      gameTimer.textContent = MINIMUM_TIME;
    }

    if (this.time <= EDGE_TIME) {
      if (this.time % 2 === 0) {
        gameTimer.style.color = BASIC_COLOR;
      } else {
        gameTimer.style.color = RED_COLOR;
      }
    }
  }

  tick() {
    return this.time--;
  }
}

export const createTestTimer = (timerLimit) => ({
  tick: () => {
    return --timerLimit > MINIMUM_TIME ? timerLimit : `Ваше время вышло`;
  }
});
