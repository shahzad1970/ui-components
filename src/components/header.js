class Header extends Base {
  constructor() {
    super(); // Always call super() first in the constructor.
    this.render();
   
  }

  static get observedAttributes() {
    return ["color", 'background', "size", "elevation", "rounded"];
  }


  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 1em 1.25em;
          border-bottom: 1px solid rgba(0,0,0,0.12);
        }
      </style>
      <slot></slot>  
    `;
  }
}

customElements.define('ui-header', Header);