'use strict';

/**
 *
 */
import Page from 'libs/page';
import _ from 'lodash';
import moment from 'moment';
import config from '../../config';

moment.locale('pt-BR');

/**
 *
 */
class Home extends Page {

	constructor (page) {
		super(page);
		this.burnPerSecond = config.burnPerSecond;
	}

	onPageAfterAnimation () {
		this.load();
		this.bindEvents();
	}

	bindEvents () {
		var that = this;

		$('.btn-timer').on('click', function () {
			$(this).toggleClass('-playing');

			if (that.playing) that.pause();
			else that.play();
		});

		$('.selected-date__month').on('click', (e) => {
			e.stopImmediatePropagation();
			this.calendar.open();
		});

		$('.more-options').on('click', () => {
			let that = this;
			var buttons = [
				{
					text: 'Inserir tempo manualmente',
					onClick: () => {
						App.modal({
							title:  'Inserir tempo manualmente:',
							text: `
								<div class="form-modal">
									<span class="form-modal__label">Minutos:</span>
									<div class="form-modal__input">
										<input type="tel" maxlength="3" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" name="modal-time">
									</div>
								</div>
							`,
							buttons: [
								{
									text: 'Cancelar'
								},
								{
									text: 'Salvar',
									close: false,
									onClick: function () {
										let time = $('[name="modal-time"]').val();
										let date = App.dateSelected;

										if (time == '' || !date) return false;

										time = parseInt(time) * 60;

										App.api.saveTime(time, date)
											.then((res) => {
												if (res.success) {
													that.loadDayInfo(date);
													App.closeModal();
												}
											});
									}
								}
							]
						});
					}
				},
				{
					text: 'Trocar treino de dia',
					onClick: () => {
						App.modal({
							title:  'Trocar treino de dia:',
							text: `
								<div class="form-modal">
									<span class="form-modal__label">Dia:</span>
									<div class="form-modal__input">
										<input type="date" name="modal-date">
									</div>
								</div>
							`,
							buttons: [
								{
									text: 'Cancelar'
								},
								{
									text: 'Salvar',
									close: false,
									onClick: function () {
										let new_date = $('[name="modal-date"]').val();
										let date = App.dateSelected;

										if (new_date == '' || !date) return false;

										App.api.updateCalendar(new_date, date)
											.then((res) => {
												if (res.success) {
													App.closeModal();
													that.load();
												}
											});
									}
								}
							]
						});
					}
				},
				{
					text: 'Cancel',
					color: 'red'
				}
			];
			App.actions(buttons);
		});
	}

	load () {
		let date = moment().format('YYYY-MM-DD');
		if (!App.dateSelected) App.dateSelected = date;

		this.loadDayInfo(App.dateSelected);

		App.api.getCalendar()
			.then((res) => {
				if (res.success) {
					let dates = [];
					res.data.map((item) => {
						dates.push(moment(item.date, 'YYYY-MM-DD').toDate())
					});

					let monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
					this.calendar = App.calendar({
						events: dates,
						value: [new Date()],
						weekHeader: false,
						toolbarTemplate:
							'<div class="toolbar calendar-custom-toolbar">' +
							'<div class="toolbar-inner">' +
							'<div class="left">' +
							'<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
							'</div>' +
							'<div class="center"></div>' +
							'<div class="right">' +
							'<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
							'</div>' +
							'</div>' +
							'</div>',
						onOpen: (p) => {
							$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
							$('.calendar-custom-toolbar .left .link').on('click', () => {
								this.calendar.prevMonth();
							});
							$('.calendar-custom-toolbar .right .link').on('click', () => {
								this.calendar.nextMonth();
							});
						},
						onMonthYearChangeStart: function (p) {
							$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
						},
						onDayClick: (p, dayContainer, year, month, day) => {
							this.calendar.close();
							this.container.addClass('-loading-content');
							let m = parseInt(month) + 1;
							let d = parseInt(day);

							m = m > 9 ? m : '0' + m;
							d = d > 9 ? d : '0' + d;

							setTimeout(() => {
								this.loadDayInfo(`${year}-${m}-${d}`);
							}, 500);
						}
					});
				}
			});
	}

	loadDayInfo (date) {
		App.dateSelected = date;
		let $dayWrapper = $('.selected-date__day');
		let $monthWrapper = $('.selected-date__month');

		let $timeWrapper = $('.date-content__time span');
		let $contentWrapper = $('.page-home__content');

		App.api.getCalendarDate(date)
			.then((res) => {
				if (res.success) {
					let day = moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY-MMMM-ddd').split('-');
					let year = day[2];
					let monthName = day[3];
					let dayName = day[4];
					day = day[0];

					App.api.getTime(date).then((time) => {
						this.timer = time.data.length > 0 ? time.data[0].time : 0;
						$timeWrapper.text(this.formatTime(this.timer));
						this.setBurn();

						$dayWrapper.html(`<span>${day}</span><small>${dayName}</small>`);
						$monthWrapper.html(`<span>${monthName} / ${year}</span><em class="icon icon-arrow-down"></em>`);

						let $template = $('#template-workout-day').html(),
							template = Template7.compile($template),
							html;

						if (res.data.length > 0) {
							let day_name = '';
							let days_per_week = '';
							let day_note = false;

							let groups = _.groupBy(res.data, 'exercise_group');
							let workouts = [];

							Object.keys(groups).map((item) => {
								groups[item].map((exercise) => {
									day_name = exercise.day_name;
									day_note = exercise.day_note || false;
									this.day_id = exercise.day_id || false;

									exercise.hasDescription = exercise.exercise_description !== '' && exercise.exercise_description !== null;

									return exercise;
								});

								workouts.push({
									type: this.groupType(groups[item].length),
									day_note: day_note,
									exercises: groups[item]
								});
							});

							html = template({
								hasResult: true,
								workouts,
								days_per_week,
								day_name,
								number_exercises: res.data.length > 1 ? res.data.length + ' exercícios' : res.data.length + ' exercício'
							});

							$contentWrapper.html(html);
							this.container.removeClass('-noresult');
							this.container.addClass('-result');
						}
						else {
							html = template({ hasResult: false });
							$contentWrapper.html(html);
							this.container.removeClass('-result');
							this.container.addClass('-noresult');
						}
						this.container.removeClass('-loading -loading-content');

						$('.page-home__content__exercises__item__title').on('click', function () {
							$(this).parent().toggleClass('-active');
						})
					})
				}
			});
	}

	groupType (len) {
		let type = 'normal';

		switch(len) {
			case 1: type = 'normal'; break;
			case 2: type = 'biset'; break;
			case 3: type = 'triset'; break;
			default: type = 'superset'; break;
		}

		return type;
	}

	formatTime (timer) {
		let time = moment.utc(timer*1000).format('HH:mm:ss');
		return time;
	}

	setBurn () {
		let time = this.timer || 0;
		let burn = this.burnPerSecond * time;
		$('.date-content__burn span').text(burn.toFixed(1) + ' Kcal');
	}

	play () {
		this.playing = true;
		this.playStart = moment();
		this.count = 0;

		this.interval = setInterval(() => {
			this.playEnd = moment();
			this.count = this.playEnd.diff(this.playStart, 'seconds');
			$('.date-content__time span').text(this.formatTime(this.timer + this.count));
			this.setBurn();
		}, 1000);
	}

	pause () {
		this.playing = false;
		this.timer = this.timer + this.count;
		this.count = 0;
		clearInterval(this.interval);

		App.api.saveTime(this.timer, App.dateSelected)
			.then((res) => {
				console.log(res);
			})
	}
}

export { Home as default }
