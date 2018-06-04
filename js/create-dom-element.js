const createDOMElement = (markup) => {
  const newElement = document.createElement(`div`);

  newElement.innerHTML = markup;

  return newElement;
};

export default createDOMElement;
