const MINIMUM_TIME = 0;

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
