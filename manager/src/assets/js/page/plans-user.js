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
	}

	init(page, ctx) {
		super.load(page);
		this.user_id = parseInt(ctx.params.user);
		this.calendar = new CalendarInline();
	}

	onload() {
		// this.calendar.setHighlight(exercises);
		this.calendar.render();
		this.loadUser();
	}

	loadUser () {
		App.api.getUser(this.user_id).then((res) => {
			$('.user-name').text(res.data.name);
		})
	}
}

export { PlansUser as default }
