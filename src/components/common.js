
class uiCommon {

  static Instance() {
    if (!uiCommon.instance) {
      uiCommon.instance = new uiCommon();
    }
    return uiCommon.instance;
  }

  constructor() {

  }

  colorPalette = {
    "ui-red": "#f44336",
    "ui-pink": "#e91e63",
    "ui-purple": "#9c27b0",
    "ui-indigo": "#3f51b5",
    "ui-blue": "#2196f3",
    "ui-lightblue": "#03a9f4",
    "ui-cyan": "#00bcd4",
    "ui-teal": "#009688",
    "ui-green": "#4caf50",
    "ui-lightgreen": "#8bc34a",
    "ui-lime": "#cddc39",
    "ui-yellow": "#ffeb3b",
    "ui-amber": "#ffc107",
    "ui-orange": "#ff9800",
    "ui-deeporange": "#ff5722",
    "ui-brown": "#795548",
    "ui-grey": "#9e9e9e",
    "ui-bluegrey": "#607d8b"
  };

  attributeHandler(target, key, value) {

    switch (key) {
      case 'elevation':
        this.setElementBoxElevation(target, value);
        break;

      case 'size':
        this.setElementFontSize(target, value);
        break;

      case 'width':
        this.getElementCssRule(target).style.width = value;
        break;

      case 'height':
        this.getElementCssRule(target).style.height = value;
        break;

      case 'gap':
        this.getElementCssRule(target).style.gap = value;
        break;

      case 'color':
        this.setElementColor(target, value);
        break;
      case 'background':
        this.setElementBackgroundColor(target, value);
        break;
      default:
        break;
    }

  }


  buildColor(pColor) {
    let color = pColor;
    if (pColor.startsWith("ui-")) {
      let result = pColor.match(/\d+$/);
      if (result) {
        let colorIndex = result[0];
        let colorName = pColor.replace("-" + colorIndex, "")
        switch (colorIndex) {
          case '50': color = `color-mix(in srgb, ${this.colorPalette[colorName]} 10%, #ffffff)`; break;
          case '100': color = `color-mix(in srgb, ${this.colorPalette[colorName]} 27%, #ffffff)`; break;
          case '200': color = `color-mix(in srgb, ${this.colorPalette[colorName]} 54%, #ffffff)`; break;
          case '300': color = `color-mix(in srgb, ${this.colorPalette[colorName]} 75%, #ffffff)`; break;
          case '400': color = `color-mix(in srgb, ${this.colorPalette[colorName]} 90%, #ffffff)`; break;
          case '500': color = `color-mix(in srgb, ${this.colorPalette[colorName]} 100%, #000000)`; break;
          case '600': color = `color-mix(in srgb, ${this.colorPalette[colorName]} 92%, #000000)`; break;
          case '700': color = `color-mix(in srgb, ${this.colorPalette[colorName]} 83%, #000000)`; break;
          case '800': color = `color-mix(in srgb, ${this.colorPalette[colorName]} 79%, #000000)`; break;
          case '900': color = `color-mix(in srgb, ${this.colorPalette[colorName]} 65%, #000000)`; break;


        }
      }
    }

    return color;

  }

  getElementCssRule(target) {
    if (!target.cssRules && target.shadowRoot.querySelector("style").sheet) {
      let sheet = target.shadowRoot.querySelector("style").sheet;
      let i = sheet.insertRule(":host { }", sheet.cssRules.length);
      target.cssRules = sheet.cssRules[i];
    }
    return target.cssRules;
  }

  setElementBoxElevation(target, shadow) {

    let value = ""

    // create for following xx-small, x-small, small, medium, large, x-large, xx-large, xxx-large

    switch (shadow) {
      case 'xx-small':
        value = `0px 2px 1px -1px rgba(0, 0, 0, 0.10), 0px 1px 1px 0px rgba(0, 0, 0,  0.07), 0px 1px 3px 0px rgba(0, 0, 0,  0.06)`;
        break;
      case 'x-small':
        value = `0px 3px 1px -2px rgba(0, 0, 0, 0.10), 0px 2px 2px 0px rgba(0, 0, 0,  0.07), 0px 1px 5px 0px rgba(0, 0, 0,  0.06)`;
        break;
      case 'small':
        value = `0px 3px 3px -2px rgba(0, 0, 0, 0.10), 0px 3px 4px 0px rgba(0, 0, 0,  0.07), 0px 1px 8px 0px rgba(0, 0, 0,  0.06)`;
        break;
      case 'medium':
        value = `0px 2px 4px -1px rgba(0, 0, 0, 0.10), 0px 4px 5px 0px rgba(0, 0, 0,  0.07), 0px 1px 10px 0px rgba(0, 0, 0,  0.06)`;
        break;
      case 'large':
        value = `0px 3px 5px -1px rgba(0, 0, 0, 0.10), 0px 6px 10px 0px rgba(0, 0, 0,  0.07), 0px 1px 18px 0px rgba(0, 0, 0,  0.06)`;
        break;
      case 'x-large':
        value = `0px 5px 5px -3px rgba(0, 0, 0, 0.10), 0px 8px 10px 1px rgba(0, 0, 0,  0.07), 0px 3px 14px 2px rgba(0, 0, 0,  0.06)`;
        break;
      case 'xx-large':
        value = `0px 7px 8px -4px rgba(0, 0, 0, 0.10), 0px 12px 17px 2px rgba(0, 0, 0,  0.07), 0px 5px 22px 4px rgba(0, 0, 0,  0.06)`;
        break;
      case 'xxx-large':
        value = `0px 8px 10px -5px rgba(0, 0, 0, 0.10), 0px 16px 24px 2px rgba(0, 0, 0,  0.07), 0px 6px 30px 5px rgba(0, 0, 0,  0.06)`;
        break;
      default:
        value = shadow;
        break;
    }

    let cssRules = this.getElementCssRule(target);
    cssRules.style.boxShadow = value;

  }


  setElementFontSize(target, size) {
    let cssRules = this.getElementCssRule(target);
    cssRules.style.fontSize = size;
  }

  setElementColor(target, color) {
    let cssRules = this.getElementCssRule(target);
    cssRules.style.color = this.buildColor(color);
    this.setBorderColor(target);
  }

  setElementBackgroundColor(target, color) {
    let cssRules = this.getElementCssRule(target);
    cssRules.style.backgroundColor = this.buildColor(color);
    if (target.getAttribute("color") == undefined) {
      let computedColor = window.getComputedStyle(target).backgroundColor ? window.getComputedStyle(target).backgroundColor : target.style.backgroundColor;

      let luminance = this.luminance(computedColor);

      if (luminance > 0.35) {
        cssRules.style.color = "#000000";
      } else {
        cssRules.style.color = "#ffffff";
      }

    }
    this.setBorderColor(target);
  }

  setBorderColor(target) {
    let cssRules = this.getElementCssRule(target);
    let bg = window.getComputedStyle(target).backgroundColor;
    let color = window.getComputedStyle(target).color;

    let c = `color-mix(in srgb, ${bg} 70%, ${color})`;


    cssRules.style.setProperty("--ui-background", bg);
    cssRules.style.setProperty("--ui-color", color);
    cssRules.style.setProperty("--ui-highlight-bg", c);
    

    let cl = `color-mix(in srgb, ${bg} 90%, ${color})`;
    cssRules.style.setProperty("--ui-highlight-bg-light", cl);

    let fgColor = this.colorMix(c);
    if (fgColor != null) {

      let luminance = this.luminance(fgColor);

      if (luminance > 0.35) {
        cssRules.style.setProperty("--ui-highlight-fg", "#000000");
      } else {
        cssRules.style.setProperty("--ui-highlight-fg", "#ffffff");
      }
    }


  }

  colorMix(input) {
    // Extract the colors and the percentage from the input string
    const regex = /rgb\((\d+), (\d+), (\d+)\) (\d+)%?, rgb\((\d+), (\d+), (\d+)\)/;
    const matches = input.match(regex);

    if (!matches) {
      return null
    }

    // Parse colors and percentage
    const r1 = parseInt(matches[1], 10);
    const g1 = parseInt(matches[2], 10);
    const b1 = parseInt(matches[3], 10);
    const percentage = parseInt(matches[4], 10) / 100; // Convert percentage to a decimal
    const r2 = parseInt(matches[5], 10);
    const g2 = parseInt(matches[6], 10);
    const b2 = parseInt(matches[7], 10);

    // Calculate the mixed color components
    const r = Math.round(r1 * percentage + r2 * (1 - percentage));
    const g = Math.round(g1 * percentage + g2 * (1 - percentage));
    const b = Math.round(b1 * percentage + b2 * (1 - percentage));

    return `rgb(${r}, ${g}, ${b})`;
  }

  luminance(color) {
    let [r, g, b] = color.match(/\d*\.?\d+/g);
    const a = [r, g, b].map(function (v) {
      if (v < 1) {
        v *= 255;
      }

      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.10126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

}

