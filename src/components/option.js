class Option extends Base {
  constructor() {
    super();
    this.render();

  }

  static get observedAttributes() {
    return ["color", 'background', "size", "elevation", "rounded", "selected", "value", "label"];
  }

  connectedCallback() {
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);

  }



  onClick() {
    if (this.hasAttribute('selected')) {
      this.removeAttribute('selected');
    } else {
      this.setAttribute('selected', '');
    }

    const event = new CustomEvent('selected', {
      detail: {
        selected: this.hasAttribute('selected'),
        value: this.getAttribute('value')
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get value() {
    return this.getAttribute('value');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get label() {
    return this.getAttribute('label');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
          display: block;
          cursor: pointer;
          padding: 0.5em 1em;
          padding-left: 1.75em;
        }

        :host(:hover), :host([selected]:hover) {
          background-color: var(--ui-highlight-bg);
          color: var(--ui-highlight-fg);
        }

        :host([selected])::before {
          position: absolute;
          left: 0.5em;
          content: "✔";
          display: inline-block;
        }

        :host([selected]) {
          background-color: var(--ui-highlight-bg-light);
        }


      </style>
      <slot></slot>  
    `;
  }
}

customElements.define('ui-option', Option);