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
				exercises: 'EXERCISES NOT FOUND'
			},
			success: {
				add: 'Exercise has been adding successfully!',
				update: 'Exercise has been updated successfully!',
				remove: 'Exercise has been removed successfully!'
			}
		};
	}

	onload () {
		this.exercisesContent = $('#exercises-day-content');
		this.loadExecises();
		this.loadExercisesDay();
	}

	loadExercisesDay () {
		const container = this.exercisesContent;
		const day_id = this.day_id;
		this.template = $.templates($('#template-exercises').html());
		let html = '';

		App.api.getDayExercises(day_id).then((res) => {
			if (res.success && res.data.length > 0) {
				html = this.template.render({ exercises: res.data });
			}
			else {
				html = this.template.render({ error: this.message.error.exercises });
			}
			container.html(html);
		})
	}

	loadExecises () {
		App.api.getExercises(App.data.user.company_id).then((res) => {
			let data = res.data.map((item) => {
				return {
					id: item.id,
					text: item.name
				};
			});
			$('.select-with-search').select2({
				data: data,
				placeholder: 'Select an exercise'
			});
		});
	}

	_bindEvents() {

	}
}

export { ExercisesDay as default }
