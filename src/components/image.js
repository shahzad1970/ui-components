class Image extends Base {
  constructor() {
    super(); // Always call super() first in the constructor.
    this.render();
   
  }

  static get observedAttributes() {
    return ["color", 'background', "size", "elevation", "rounded", "src"];
  }


  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        img {
          width: 100%;
          height: auto;
          max-width: 100%;
        }
      </style>
      <img src="${this.getAttribute('src')}"></img>
      <slot></slot>  
    `;
  }
}

customElements.define('ui-image', Image);