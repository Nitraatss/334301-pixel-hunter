import Application from "./application";

const activateBackButton = (element) => {
  const onButtonBackClick = () => {
    Application.showRules();
  };

  const buttonBack = element.querySelector(`button.back`);

  buttonBack.addEventListener(`click`, onButtonBackClick);
};

export default activateBackButton;
