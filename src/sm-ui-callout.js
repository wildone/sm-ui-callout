class SmUiCallout {
  beforeRegister() {
    this.is = 'sm-ui-callout';

    this.properties = {

      /**
       * Position of callout arrow, space-separated list
       * (top|bottom)(left|middle|right)
       * @type {String}
       */
      arrow: {
        type: String,
        reflectToAttribute: true
      }

    }
  }
}

Polymer(SmUiCallout);
