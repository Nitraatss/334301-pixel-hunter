const createDOMElement = (markup) => {
  let newElement;

  newElement = document.createElement(`div`);

  newElement.innerHTML = markup;

  return newElement;
};

export default createDOMElement;
