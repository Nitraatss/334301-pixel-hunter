const createDOMElement = (markup, id) => {
  let newElement;

  newElement = document.createElement(`div`);

  newElement.id = id;
  newElement.innerHTML = markup;

  return newElement;
};

export default createDOMElement;
