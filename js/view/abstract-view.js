import createDOMElement from '../create-dom-element';

class AbstractView {
  constructor() {
  }

  get template() {
    throw new Error(`Update method`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();

      this.bind();
    }

    return this._element;
  }

  render() {
    return createDOMElement(this.template);
  }

  bind() {
  }
}

export default AbstractView;
