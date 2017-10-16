'use strict';

/**
 * Import
 */

import Page from '../components/page';
import Validator from '../components/validator';
import _ from 'lodash';

/**
 *
 */
class ExercisesDay extends Page {
	constructor() {
		super();
		this.validator = new Validator();
	}

	init(page, ctx) {
		super.load(page);
		this.plan_id = parseInt(ctx.params.plan);
		this.day_id = parseInt(ctx.params.day);
		this.message = {
			error: {
				days: 'EXERCISES NOT FOUND'
			},
			success: {
				add: 'Exercise has been adding successfully!',
				update: 'Exercise has been updated successfully!',
				remove: 'Exercise has been removed successfully!'
			}
		};

		console.log(this);
	}

	_bindEvents() {

	}
}

export { ExercisesDay as default }
