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
		this.calendar.render();
		this.loadUser();
		this.loadCalendar();
	}

	loadCalendar () {
		App.api.getCalendar({user_id: this.user_id}).then((res) => {
			if (res.data.length > 0)
				this.calendar.setHighlight(res.data);
		});
	}

	loadUser () {
		App.api.getUser(this.user_id).then((res) => {
			$('.user-name').text(res.data.name);
		})
	}
}

export { PlansUser as default }
