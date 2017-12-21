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
	}

	onPageAfterAnimation () {
		this.bindEvents();
		this.load();
	}

	bindEvents () {
		$('.page-home__content__exercises__item__title').on('click', function () {
			$(this).parent().toggleClass('-active');
		})

		$('.btn-timer').on('click', function () {
			$(this).toggleClass('-playing');
		});

		$('.selected-date__month').on('click', (e) => {
			e.stopImmediatePropagation();
			this.calendar.open();
		});
	}

	load () {
		let date = Date.now();
		this.loadDayInfo(date);

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
							this.loadDayInfo(new Date(year, month, day).getTime());
						}
					});
				}
			});
	}

	loadDayInfo (date) {
		var $dayWrapper = $('.selected-date__day');
		var $monthWrapper = $('.selected-date__month');

		App.api.getCalendarDate(date)
			.then((res) => {
				if (res.success) {
					let day = moment(date, 'x').format('DD-MM-YYYY-MMMM-ddd').split('-');
					let month = day[1];
					let year = day[2];
					let monthName = day[3];
					let dayName = day[4];
					day = day[0];

					$dayWrapper.html(`<span>${day}</span><small>${dayName}</small>`);
					$monthWrapper.html(`<span>${monthName} / ${year}</span><em class="icon icon-arrow-down"></em>`);

					if (res.data.length > 0) {

					}
					else {

					}
				}
				this.container.removeClass('-loading -loading-content');
			});
	}
}

export { Home as default }
