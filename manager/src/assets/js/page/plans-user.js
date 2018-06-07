'use strict';

/**
 * Import
 */

import Page from '../components/page';
import CalendarInline from '../components/calendar';

/**
 *
 */
class PlansUser extends Page {
	constructor() {
		super();
		this.calendar = new CalendarInline();
	}

	init(page, ctx) {
		super.load(page);
		this.calendar = new CalendarInline();
	}

	onload() {
		// this.calendar.setHighlight(exercises);
		this.calendar.render();
	}
}

export { PlansUser as default }
