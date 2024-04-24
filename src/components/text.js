class Text extends Base {
  constructor() {
    super();
    this.render();
   
  }

  static get observedAttributes() {
    return ["color", 'background', "size", "elevation", "rounded"];
  }


  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
      </style>
      <slot></slot>  
    `;
  }
}

customElements.define('ui-text', Text);