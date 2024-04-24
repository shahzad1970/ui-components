
class Button extends Base {

  // Custom web component constructor
  constructor() {
    super();
    this.render();
  }

  // List of attributes that this element will observe
  static get observedAttributes() {
    return ["color", 'background', "rounded", "round", "fab", "size", "elevation", "outlined", "disabled"];
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {
              position: relative;
              font-size: 0.875em;
              line-height: 1em;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              padding: 0.5em 1em; 
              gap: 0.5em;
              user-select: none;
              cursor: pointer;
            }

            :host(:hover) {
              background-color: var(--ui-highlight-fg);
            }
    

            :host([rounded]) {
              border-radius: 0.20em;
            }

            :host([round]) {
              border-radius: 99999px; 
            }

            :host([fab]) {
              border-radius: 99999px;
              line-height: unset;
              padding: 0 0;
              width: 2em;
              height: 2em;
            }

            :host([outlined]) {
              border: 0.10em solid currentColor;
            }

            :host([disabled]) {
              background-color: color-mix(in srgb, #000000 30%, #ffffff);
              color: color-mix(in srgb, #000000 70%, #ffffff);
              pointer-events: none;
              opacity: 0.5;
            }


        </style>
        <slot></slot>
    `;
  }


}

customElements.define("ui-button", Button);