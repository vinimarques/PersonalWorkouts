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
				exercises: 'NENHUM DADO ENCONTRADO'
			},
			success: {
				add: 'Exercício do Dia adicionado com sucesso!',
				update: 'Exercício do Dia atualizado com sucesso!',
				remove: 'Exercício do Dia removido com sucesso!'
			}
		};
	}

	onload () {
		this.exercisesContent = $('#exercises-day-content');
		$('.plan-link').attr('href', '/plans/' + this.plan_id);
		this.loadExecises();
		this.loadExercisesDay();
		this.loadDay();
	}

	loadDay () {
		App.api.getDay(this.day_id)
			.then((res) => {
				$('.page__title').text(res.data.name);
			});
	}

	loadExercisesDay () {
		const container = this.exercisesContent;
		const day_id = this.day_id;

		$('[name="day_id"]').val(day_id);

		this.template = $.templates($('#template-exercises-day').html());
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
				placeholder: 'Selecione um exercício'
			});
		});
	}

	_bindEvents() {
		$('.modal-add-exercises-day form').on('submit', (ev) => {
			ev.preventDefault();
			let data = this.validator.getData(ev.target);
			let dataSend = this.validator.getDataSend(ev.target);
			let isValide = this.validator.isValide(data);

			if (isValide.error) {
				this.validator.resetErrors(ev.target);
				this.validator.showErrors(isValide.errors);
				return false;
			}

			App.api.saveDayExercise(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.add, App.config.timeCloseModal);
						$(ev.target)[0].reset();
						this.loadExercisesDay();
					}
				});
		});

		$('.modal-edit-exercises-day form').on('submit', (ev) => {
			ev.preventDefault();

			let data = this.validator.getData(ev.target);
			let dataSend = this.validator.getDataSend(ev.target);
			let isValide = this.validator.isValide(data);

			if (isValide.error) {
				this.validator.resetErrors(ev.target);
				this.validator.showErrors(isValide.errors);
				return false;
			}

			App.api.updateDayExercise(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.update, App.config.timeCloseModal);
						$(ev.target)[0].reset();
						this.loadExercisesDay();
					}
				});
		});

		$('.modal-remove-exercises-day form').on('submit', (ev) => {
			ev.preventDefault();
			let dataSend = this.validator.getDataSend(ev.target);
			if (!dataSend.day_exercise_id) return false;
			App.api.removeDayExercise(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.remove, App.config.timeCloseModal);
						this.loadExercisesDay();
					}
				});
		});

		$('body').on('click', '.actions .exercises-day-delete', (ev) => {
			ev.preventDefault();
			let line = $(ev.target).parents('.ttable__body__row'),
				name = line.find('.exercises-day-name').text(),
				id = line.data('exercises-day-id');

			$('.modal-remove-exercises-day input').val(id);
			$('.modal-remove-exercises-day .exercises-day-remove-name').text(name);
			App.openModal('remove-exercises-day');
		});

		$('body').on('click', '.actions .exercises-day-edit', (ev) => {
			ev.preventDefault();
			let line = $(ev.target).parents('.ttable__body__row'),
				id = line.data('exercises-day-id');

			App.loader.show();
			App.api.getDayExercise(id).then((res) => {
				App.loader.hide();
				App.helpers.populateForm('.modal-edit-exercises-day form', res.data);
				App.openModal('edit-exercises-day');
			});
		});
	}
}

export { ExercisesDay as default }
