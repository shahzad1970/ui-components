class Body extends Base {
  constructor() {
    super();
    this.render();
   
  }

  static get observedAttributes() {
    return ["color", 'background', "size", "elevation", "rounded", "gap"];
  }


  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          padding: 1em 1.25em;
          border-bottom: 1px solid rgba(0,0,0,0.12);
         
        }
      </style>
      <slot></slot>  
    `;
  }
}

customElements.define('ui-body', Body);