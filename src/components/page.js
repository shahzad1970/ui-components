class Page extends Base {
  constructor() {
    super();
    this.renderRootCss();

    this.render();

  }

  static get observedAttributes() {
    return ["color", 'background', "size", "elevation", "rounded", "gap"];
  }

  

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100vw;
          height: 100vh;
          overflow: auto;
         
        }
      </style>
      <slot></slot>  
    `;
  }

  appendToHead(elementType, attributes, textContent) {
    // Generate a unique selector based on attributes to find an existing element
    const selector = Object.entries(attributes).reduce((acc, [key, value]) => {
      return `${acc}[${key}="${value}"]`;
    }, elementType);

    // Try to find an existing element in the document head
    let element = document.head.querySelector(selector);

    // If the element doesn't exist, create a new one
    if (!element) {
      element = document.createElement(elementType);
      for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
      document.head.appendChild(element);
    }

    // Set or update the text content if provided
    if (textContent !== undefined) {
      element.textContent = textContent;
    }
  }

  renderRootCss() {

    if (!this.hasAttribute('color')) {
      this.setAttribute("color", "WindowText")
    }

    if (!this.hasAttribute('background')) {
      this.setAttribute("background", "Window")
    }


    // Set HTML attributes
    document.documentElement.lang = 'en';

    // Charset meta tag
    this.appendToHead('meta', { charset: 'utf-8' });

    // Viewport meta tag
    this.appendToHead('meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    });

    // Roboto font link
    this.appendToHead('link', {
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
      rel: 'stylesheet'
    });

    // Favicon link
    this.appendToHead('link', {
      rel: 'shortcut icon',
      href: 'https://raw.githubusercontent.com/google/material-design-icons/master/av/svg/production/ic_play_arrow_24px.svg'
    });

    // Document title
    this.appendToHead('title', {}, 'UI Elements');

    // Custom style
    this.appendToHead('style', {}, `
        body {
            margin: 0;
            padding: 0;
            font-family:  Roboto, "Segoe UI", -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }
    `);
  }


}

customElements.define('ui-page', Page);


