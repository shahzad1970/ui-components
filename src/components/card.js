class Card extends Base {
  constructor() {
    super(); 
    if (!this.hasAttribute('elevation')) {
      this.setAttribute('elevation', "xx-small");
    }
    this.render();

  }

  static get observedAttributes() {
    return ["color", 'background', "size", "elevation", "rounded", "width", "height"];
  }


  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-grid;
          width: 22%;
        
          border-radius: 0.5em;
          grid-template-columns: 1fr;
          grid-template-rows: auto auto 1fr auto;
          grid-template-areas: 
            "image"
            "header"
            "body"
            "footer";
        }
        ::slotted(ui-header) {
          grid-area: header;
        }

        ::slotted(ui-body) {
          grid-area: body;
          overflow-y: auto;
          scrollbar-color: var(--ui-highlight-bg) var(--ui-background);
        }

        ::slotted(ui-footer) {
          grid-area: footer;
        }

        ::slotted(ui-image) {
          grid-area: image;
        }


      </style>
      <slot></slot>  
    `;
  }
}

customElements.define('ui-card', Card);