class AbstractView {
  constructor() {
  }

  get template() {
    throw new Error(`Update method`);
  }

  get element() {
    if (!this._element) {
      this.render();

      this.bind();
    }

    return this._element;
  }

  render() {
  }

  bind() {
  }
}

export default AbstractView;
