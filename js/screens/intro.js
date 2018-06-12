import creatDOMElement from '../create-dom-element';
import showFooter from './parts/show-footer';
import showNextScreen from '../show-next-screen';

const formMarkup = () => `
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
  ${showFooter()}
`;

const intro = {
  element: () => creatDOMElement(formMarkup()),

  init: () => {
    const onIntroAsteriskClick = () => {
      showNextScreen();
    };

    const introAsterisk = document.querySelector(`.intro__asterisk`);

    introAsterisk.addEventListener(`click`, onIntroAsteriskClick);
  }
};

export default intro;
