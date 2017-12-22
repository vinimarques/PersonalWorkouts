'use strict';

/**
 *
 */
import Page from 'libs/page';
import _ from 'lodash';
import moment from 'moment';

moment.locale('pt-BR');

/**
 *
 */
class Home extends Page {

	constructor (page) {
		super(page);
		this.burnPerSecond = 0.08333;
	}

	onPageAfterAnimation () {
		this.bindEvents();
		this.load();
	}

	bindEvents () {
		var that = this;

		$('.page-home__content__exercises__item__title').on('click', function () {
			$(this).parent().toggleClass('-active');
		})

		$('.btn-timer').on('click', function () {
			$(this).toggleClass('-playing');

			if (that.playing) that.pause();
			else that.play();
		});

		$('.selected-date__month').on('click', (e) => {
			e.stopImmediatePropagation();
			this.calendar.open();
		});
	}

	load () {
		let date = Date.now();

		if (!App.dateSelected) App.dateSelected = date;

		this.loadDayInfo(App.dateSelected);

		App.api.getCalendar()
			.then((res) => {
				if (res.success) {
					let dates = [];
					res.data.map((item) => {
						dates.push(moment(item.date, 'x').toDate())
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
							setTimeout(() => {
								this.loadDayInfo(new Date(year, month, day).getTime());
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

		let $titleWrapper = $('.date-content__title');
		let $timeWrapper = $('.date-content__time span');
		let $contentWrapper = $('.page-home__content');

		App.api.getCalendarDate(date)
			.then((res) => {
				if (res.success) {
					let day = moment(date, 'x').format('DD-MM-YYYY-MMMM-ddd').split('-');
					let month = day[1];
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
							let plan_name = '';
							let days_per_week = '';

							let workouts = res.data.map((item) => {
								days_per_week = item.days_per_week;
								day_name = item.day_name;
								plan_name = item.plan_name;

								item.hasDescription = item.exercise_description !== '' && item.exercise_description !== null;
								return item;
							});

							$titleWrapper.text(plan_name);

							html = template({
								hasResult: true,
								workouts,
								plan_name,
								days_per_week,
								day_name
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
					})
				}
			});
	}

	formatTime (timer) {
		let minutes = parseInt(timer / 60, 10);
		let seconds = parseInt(timer % 60, 10);
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		return minutes + ":" + seconds;
	}

	setBurn () {
		let time = this.timer || 0;
		let burn = this.burnPerSecond * time;
		$('.date-content__burn span').text(burn.toFixed(1) + ' Kcal');
	}

	play () {
		this.playing = true;

		this.interval = setInterval(() => {
			this.timer++;
			$('.date-content__time span').text(this.formatTime(this.timer));
			this.setBurn();
		}, 1000);
	}

	pause () {
		this.playing = false;
		clearInterval(this.interval);

		App.api.saveTime(this.timer, App.dateSelected)
			.then((res) => {
				console.log(res);
			})
	}
}

export { Home as default }
