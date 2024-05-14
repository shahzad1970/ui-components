
class Base extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
  }

  connectedCallback() {
    this.constructor.observedAttributes.forEach(attr => {
      this.attributeChangedCallback(attr, null, this.getAttribute(attr));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      uiCommon.Instance().attributeHandler(this, name, newValue);
    }
  }

}
