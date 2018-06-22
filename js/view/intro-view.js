import AbstractView from './abstract-view';
import showFooter from '../screens/parts/show-footer';

class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
      ${showFooter()}
    `;
  }

  bind() {
    const mainPlay = this.element.querySelector(`.intro__asterisk`);

    mainPlay.addEventListener(`click`, () => {
      this.onIntroAsteriskClick();
    });
  }

  onIntroAsteriskClick() {
  }
}

export default IntroView;
