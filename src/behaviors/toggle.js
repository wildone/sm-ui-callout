const easings = simpla._constants.easings,
      ANIMATION = {
        frames: [
          { transform: 'scale(0.95, 0.8)', opacity: 0 },
          { transform: 'scale(1, 1)', opacity: 1 }
        ],
        opts: {
          in: {
            easing: easings.easeOutCubic,
            fill: 'both',
            duration: 60
          },
          out: {
            easing: easings.easeOutCubic,
            fill: 'both',
            duration: 90
          }
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
      observer: '_activeChanged',
      notify: true
    },

    _opened: Boolean,

    noCloseOnClick: Boolean,

    noCloseOnEscape: Boolean

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
    let animation;

    this.toggleAttribute('visible', true, this);
    animation = this.animate(ANIMATION.frames, ANIMATION.opts.in);
    animation.onfinish = () => this._opened = true;
  },

  /**
   * Animate the callout out
   * @return {undefined}
   */
  _hideCallout() {
    let animation;

    animation = this.animate(ANIMATION.frames.slice().reverse(), ANIMATION.opts.out);
    animation.onfinish = () => {
      this.toggleAttribute('visible', false, this);
      this._opened = false;
    }
  },

  /**
   * Close the callout on escape key
   * @return {undefined}
   */
  _closeOnEsc() {
    document.addEventListener('keyup', (e) => {
      if (!this.noCloseOnEscape && e.keyCode === 27) {
        this.active = false;
      }
    });
  },

  /**
   * Close on outside (and children) click
   * @return {undefined}
   */
  _closeOnClick() {
    document.addEventListener('click', (e) => {
      if (!this.noCloseOnClick && this._opened && e.target !== this) {
        this.active = false;
      }
    });
  },

  /**
   * Setup listener functions on attach
   * @return {undefined}
   */
  attached() {
    this._closeOnEsc();
    this._closeOnClick();
  }

}
