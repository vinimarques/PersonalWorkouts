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
class Exercises extends Page {
	constructor() {
		super();
		this.validator = new Validator();
	}

	init(page, ctx) {
		super.load(page);

		this.search = '';
		this.exercises = '';
		this.message = {
			error: {
				exercises: 'EXERCISES NOT FOUND'
			},
			success: {
				add: 'Exercise has been adding successfully!',
				update: 'Exercise has been updated successfully!',
				remove: 'Exercise has been removed successfully!'
			}
		}
	}

	onload() {
		this.exercisesContent = $('#exercises-content');
		this.loadExercises();
	}

	_bindEvents() {
		$('.modal-add-exercise form').on('submit', (ev) => {
			ev.preventDefault();

			let data = this.validator.getData(ev.target);
			let dataSend = this.validator.getDataSend(ev.target);
			let isValide = this.validator.isValide(data);

			if (isValide.error) {
				this.validator.resetErrors(ev.target);
				this.validator.showErrors(isValide.errors);
				return false;
			}

			App.api.saveExercise(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.add, App.config.timeCloseModal);
						$(ev.target)[0].reset();
						this.loadExercises();
					}
				});
		});

		$('.modal-edit-exercise form').on('submit', (ev) => {
			ev.preventDefault();

			let data = this.validator.getData(ev.target);
			let dataSend = this.validator.getDataSend(ev.target);
			let isValide = this.validator.isValide(data);

			if (isValide.error) {
				this.validator.resetErrors(ev.target);
				this.validator.showErrors(isValide.errors);
				return false;
			}

			App.api.updateExercise(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.update, App.config.timeCloseModal);
						$(ev.target)[0].reset();
						this.loadExercises();
					}
				});
		});

		$('.modal-remove-exercise form').on('submit', (ev) => {
			ev.preventDefault();

			let dataSend = this.validator.getDataSend(ev.target);
			if (!dataSend.exercise_id) return false;
			App.api.removeExercise(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.remove, App.config.timeCloseModal);
						this.loadExercises();
					}
				});
		});

		$('body').on('click', '.actions .exercise-delete', (ev) => {
			ev.preventDefault();

			let line = $(ev.target).parents('.ttable__body__row'),
				name = line.find('.exercise-name').text(),
				id = line.data('exercise-id');

			$('.modal-remove-exercise input').val(id);
			$('.modal-remove-exercise .exercise-remove-name').text(name);
			App.openModal('remove-exercise');
		});

		$('body').on('click', '.actions .exercise-edit', (ev) => {
			ev.preventDefault();

			let line = $(ev.target).parents('.ttable__body__row'),
				name = line.find('.exercise-name').text(),
				id = line.data('exercise-id');

			App.loader.show();
			App.api.getExercise(id).then((res) => {
				App.loader.hide();
				App.helpers.populateForm('.modal-edit-exercise form', res.data);
				App.openModal('edit-exercise');
			});
		});
	}

	loadExercises() {
		const container = this.exercisesContent;
		const company_id = App.data.user.company_id;
		this.template = $.templates($('#template-exercises').html());
		let html = '';

		App.api.getExercises(company_id).then((res) => {
			if (res.success && res.data.length > 0) {
				this.exercises = res.data;
				html = this.template.render({ exercises: res.data });
			}
			else {
				html = this.template.render({ error: this.message.error.exercises });
			}
			container.html(html);
		})
	}

	_searchKeyUp(ev) {
		let value = ev.target.value;
		clearTimeout(this.timeSearch);
		this.timeSearch = setTimeout(() => {
			this.search = value;
			this.highlight(value);
		}, 700);
	}

	highlight(word) {
		let result = _.filter(this.exercises, (o) => {
			return o.name.toLowerCase().indexOf(word.toLowerCase()) !== -1;
		});
		let html = '';

		if (result && result.length > 0) {
			html = this.template.render({ exercises: result });
		}
		else {
			html = this.template.render({ error: this.message.error.exercises });
		}
		this.exercisesContent.html(html);
	}
}

export { Exercises as default }
