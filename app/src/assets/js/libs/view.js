'use strict';

/**
* Views
*
* @author Nodo
*/

class View {
	/**
	 *
	 */
	constructor () {
		let settings = {
			dynamicNavbar: window.consts.VIEW_DYNAMIC_NAVBAR,
			preroute: () => {
			}
		};
		this._main = App.addView(window.consts.VIEW_MAIN, settings);
	}

	/**
	 *
	 */
	get main () {
		return this._main;
	}

	/**
	 *
	 */
	get router () {
		return this.main.router;
	}
}

export { View as default}
