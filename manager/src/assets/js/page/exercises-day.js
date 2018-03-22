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
		this.index = 1;

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
				let obj = _.groupBy(res.data, 'id');
				let data = [];

				Object.keys(obj).map((id) => {
					let d = JSON.parse(JSON.stringify(obj[id][0]));
					d.exercise_name = [];

					obj[id].map((exercise) => {
						d.exercise_name.push(exercise.exercise_name);
					});

					data.push(d);
				});

				html = this.template.render({ exercises: data });
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
					text: `${item.name} - ${item.muscle_group_name}`
				};
			});

			this.dataExercises = data;

			$('#exercise-id-1').select2({
				data: data,
				placeholder: 'Selecione um exercício'
			});
			$('#exercise-id-1').on('select2:open', function (e) {
				setTimeout(() => {
					$('.select2-container--open .select2-search__field').focus();
				}, 100);
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
						$(ev.target).find('.select2-create-after').select2('destroy');
						$(ev.target).find('.-after-render').remove();
						this.index = 1;
						$('#exercise-id-1').val(null).trigger('change');
						this.loadExercisesDay();
					}
				});
		});

		window.addEventListener('modal:add-exercises-day', () => {
			$('.modal-add-exercises-day').find('.select2-create-after').select2('destroy');
			$('.modal-add-exercises-day').find('.-after-render').remove();
			this.index = 1;
			$('#exercise-id-1').val(null).trigger('change');
		}, false);

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

		$('.modal-add-exercises-day .--add-exercise').on('click', (ev) => {
			this.index++;
			let btn = $('.modal-add-exercises-day .--add-exercise');
			let combo = `<label class="formm__item -after-render">
								<span class="formm__select2">
									<select name="exercise_id" class="select2-create-after" id="exercise-id-${this.index}" data-type="array"><option></option></select>
									<em></em>
								</span>
							</label>`;

			$(combo).insertBefore(btn);
			$(`#exercise-id-${this.index}`).select2({
				data: this.dataExercises,
				placeholder: 'Selecione um exercício'
			});
			$(`#exercise-id-${this.index}`).on('select2:open', function (e) {
				setTimeout(() => {
					$('.select2-container--open .select2-search__field').focus();
				}, 100);
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
