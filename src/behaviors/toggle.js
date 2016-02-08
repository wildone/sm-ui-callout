const easings = simpla.constants.easings,
      ANIMATION = {
        frames: [
          { transform: 'scale(0.9, 0.8)', opacity: 0 },
          { transform: 'scale(1, 1)', opacity: 1 }
        ],
        opts: {
          easing: easings.easeOutCubic,
          fill: 'both',
          duration: 120
        }
      };


export default {

  properties: {

    /**
     * Keep track of whether callout shown or hidden
     * @type {Boolean}
     */
    active: {
      type: Boolean,
      observer: '_activeChanged'
    }

  },

  /**
   * Convinience method to toggle the active property
   * @return {undefined}
   */
  toggle() {
    this.active = !this._active;
  },

  /**
   * Open and close the callout on active change
   * @param  {Boolean} active state of the active property
   * @return {undefined}
   */
  _activeChanged(active) {
    active ? this._showCallout() : this._hideCallout()
  },

  /**
   * Animate the callout in
   * @return {undefined}
   */
  _showCallout() {
    this.toggleAttribute('visible', true, this);
    this.animate(ANIMATION.frames, ANIMATION.opts);
  },

  /**
   * Animate the callout out
   * @return {undefined}
   */
  _hideCallout() {
    let animation;

    animation = this.animate(ANIMATION.frames.slice().reverse(), ANIMATION.opts);
    animation.onfinish = () => {
      this.toggleAttribute('visible', false, this);
    }
  }

}
