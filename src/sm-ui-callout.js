import toggle from './behaviors/toggle';

class SmUiCallout {
  beforeRegister() {
    this.is = 'sm-ui-callout';

    this.properties = {

      /**
       * Position of callout arrow, space-separated list
       * (top|bottom)(left|center|right)
       * @type {String}
       */
      arrow: {
        type: String,
        reflectToAttribute: true
      }

    }
  }

  get behaviors() {
    return [
      toggle
    ];
  }

  /**
   * Transform origin should match arrow position
   * @return {undefined}
   */
  _setTransformOrigin() {
    this.style['transform-origin'] = this.arrow;
  }

  /**
   * Called by Polymer on attach
   * @return {undefined}
   */
  attached() {

    this._setTransformOrigin();

  }
}

Polymer(SmUiCallout);
