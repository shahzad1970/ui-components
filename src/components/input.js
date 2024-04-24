class Input extends Base {
  constructor() {
    super(); // Always call super() first in the constructor.
    this.render();

  }

  options = null;
  input = null;
  optionDiv = null;

  connectedCallback() {
    this.addEventListener("selected", this.onSelected);

    if (this.options) {
      this.optionDiv.addEventListener('mousemove', this.scrollOptionDiv.bind(this));
      this.input.addEventListener('mousedown', this.openOptions.bind(this));
      this.options.addEventListener("mouseleave", this.toggleOptions.bind(this));
      this.input.addEventListener('input', this.filterOptions.bind(this));
    } else if (this.type == 'checkbox') {
      this.addEventListener('click', this.toggleCheckbox.bind(this));
    }

  }

  disconnectedCallback() {
    this.removeEventListener("selected", this.onSelected);

    if (this.options) {
      this.optionDiv.removeEventListener('mousemove', this.scrollOptionDiv.bind(this));
      this.input.removeEventListener('mousedown', this.openOptions.bind(this));
      this.options.removeEventListener("mouseleave", this.toggleOptions.bind(this));
      this.input.removeEventListener('input', this.filterOptions.bind(this));
    }else if (this.type == 'checkbox') {
      this.removeEventListener('click', this.toggleCheckbox.bind(this));
    }
  }

  toggleCheckbox() {
    if (this.selected) {
      this.selected = false;
    } else {
      this.selected = true;
    }
  }

  onSelected(event) {
    let options = this.options.querySelectorAll('ui-option[selected]');
    this.optionDiv.innerHTML = "";
    for (let option of options) {
      if (option.getAttribute('value') == event.detail.value || this.getAttribute('type') == 'select-multiple') {
        let div = document.createElement('div');
        div.classList.add('option-item');
        div.innerHTML = option.value;
        this.optionDiv.appendChild(div);
      } else {
        option.removeAttribute('selected');
      
      }
    }
    this.optionDiv.scrollLeft = this.optionDiv.scrollWidth;
    this.openOptions()
  }

  scrollOptionDiv(event) {
    let rect = this.optionDiv.getBoundingClientRect();
    let x = event.clientX;
    if (x < rect.left + 50) {
      this.optionDiv.scrollLeft -= 20;
    } else if (x > rect.right - 50) {
      this.optionDiv.scrollLeft += 20;
    }

  }

  // write a function to move the options to below the input field

  openOptions() {
    this.options.style.display = 'block';
    this.options.style.top = this.getBoundingClientRect().bottom + 'px';
    this.options.style.left = this.getBoundingClientRect().left + 'px';
    this.options.style.width = this.getBoundingClientRect().width + 'px';


  }

  toggleOptions() {

    if (this.options.style.display == 'block') {
      this.options.style.display = 'none';
      this.options.querySelectorAll('ui-option').forEach(option => {
        option.style.display = 'block';
      });
      this.input.value = "";
    }
  }

  filterOptions() {
    let searchString = this.input.value.toLowerCase();
    let options = this.options.querySelectorAll('ui-option');
    for (let option of options) {
      let optionVal = option.value + " " + option.label;
      // if searchString is anythere in optionVal, show the option

      if (optionVal.toLowerCase().includes(searchString) || searchString == "") {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    }

  }

  get type() {
    return this.getAttribute('type');
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
  }

  get selected() {
    return this.hasAttribute('selected');
  }

  set selected(value) {
    if (value) {
      this.setAttribute('selected', '');
      this.input.value = "true";
    } else {
      this.removeAttribute('selected');
      this.input.value = "false";
    }
  }

  static get observedAttributes() {
    return ["color", 'background', "rounded", "round", "fab", "size", "elevation", "outlined", "disabled", "type", "selected"];
  }

  render() {
    let html = `
      <style>
        :host {
          position: relative;
          display: flex;
          fiex-direction: row;
          align-items: center;
          user-select: none;
          cursor: text;
          border: 3px solid var(--ui-highlight-bg);
          caret-color: currentColor;
          
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

        input::selection {
          background-color: var(--ui-highlight-bg);
          color: var(--ui-highlight-fg);
        }

        input {
          border: none;
          outline: none;
          font-size: 1em;
          background-color: transparent;
          color: currentColor;
          flex: 1;
          padding: 0.5em 1em;
          min-width: 8em;
        }

        ::slotted(ui-card) {
          position: fixed;
          top: 400px;
          right: 80;
          max-height: calc(vh / 6);
          font-size: 0.85em;
          background-color: var(--ui-background);
          color: var(--ui-color);
          z-index: 100;
          display: none;
        }

        .option-container {
          display: flex;
          flex-direction: row;
          overflow: hidden ;
          gap: 0.5em;
          border: 0;
          font-size: 0.75em;
          margin-left: 0.5em;
          cursor: all-scroll;
        }

        .option-container:empty {
          display: none;
        }

        .option-item {
          padding: 0.25em 0.5em;
          border-radius: 0.25em;
          background-color: var(--ui-highlight-bg);
          color: var(--ui-highlight-fg);
          white-space: nowrap;
         
        }`;

    if (this.type == 'color') {
      html += `
        input {
          padding: 0;
          height: 2.222em;
        }
      `;
    } else if (this.type == 'checkbox') {
      html += `
        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        :host {
          display: inline-flex;
          cursor: pointer;
          justify-content: center;
          align-items: center;
          width: 1.25em;
          height: 1.25em;

        }
        :host(:hover) {
          background-color: var(--ui-highlight-bg);
        }
        :host::before {
          content: "✔";
          opacity: 0;
        }
        :host([selected])::before {
          opacity: 1;
        }
      `
    }

    html += `
      </style>
  
      <slot></slot>
    
      `;

    this.options = this.querySelector('ui-card');
    this.input = document.createElement('input');
    this.input.setAttribute('type',  this.getAttribute('type') || 'text');
    this.shadowRoot.innerHTML = html;

    if (this.options) {
      // create div for each selected option
      this.optionDiv = document.createElement('div');
      // add class to it.
      this.optionDiv.classList.add('option-container');

      this.shadowRoot.appendChild(this.optionDiv);

    }

    this.shadowRoot.appendChild(this.input);



  }
}

customElements.define('ui-input', Input);