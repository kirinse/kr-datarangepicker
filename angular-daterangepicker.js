(function() {
	var picker;

	picker = angular.module('daterangepicker', ['ui.bootstrap','angularMoment']);

	picker.value('dateRangePickerConfig', {
		// separator: ' - ',
		// format: 'YYYY-MM-DD'
	});

	picker.directive('dateRangePicker', [
		'$compile',
		'$timeout',
		'$parse',
		'$document',
		'$window',
		'$position',
		'dateRangePickerConfig',
		function($compile, $timeout, $parse, $document, $window, $position, dateRangePickerConfig) {
			var DateRangePicker = function(element, options, cb) {
        // by default, the daterangepicker element is placed at the bottom of HTML body
        this.parentEl = 'body';
        //element that triggered the date range picker
        this.element = element;
        //tracks visible state
        this.isShowing = false;
        //create the picker HTML object
        var DRPTemplate = '<div class="daterangepicker dropdown-menu">' +
                '<div class="calendar first left"></div>' +
                '<div class="calendar second right"></div>' +
                '<div class="ranges">' +
                  '<div class="range_inputs">' +
                    '<div class="daterangepicker_start_input">' +
                      '<label for="daterangepicker_start"></label>' +
                      '<input class="input-mini" type="text" name="daterangepicker_start" value="" />' +
                    '</div>' +
                    '<div class="daterangepicker_end_input">' +
                      '<label for="daterangepicker_end"></label>' +
                      '<input class="input-mini" type="text" name="daterangepicker_end" value="" />' +
                    '</div>' +
                    '<button class="applyBtn" disabled="disabled"></button>&nbsp;' +
                    '<button class="cancelBtn"></button>' +
                  '</div>' +
                '</div>' +
              '</div>';
        if (typeof options !== 'object' || options === null) {
          options = {};
        }
        this.parentEl = (typeof options === 'object' && options.parentEl && angular.element(options.parentEl).length) ? angular.element(options.parentEl) : angular.element(document).find(this.parentEl);
        this.container = angular.element(DRPTemplate);
        this.parentEl.append(this.container);
        this.setOptions(options, cb);

			}
			DateRangePicker.prototype = {
				constructor: DateRangePicker,
				setOptions: function(options, callback) {

				},
				setStartDate: function(startDate) {

				},
				setEndDate: function(endDate) {

				},
				updateView: function () {

				},
				updateFormInputs: function () {

				},
				updateFromControl: function () {

				},
				keydown: function (e) {

				},
				notify: function () {

				},
				move: function () {

				},
				toggle: function (e) {

				},
				show: function (e) {

				},
				outsideClick: function (e) {

				},
				hide: function (e) {

				},
				enterRange: function (e) {

				},
				showCalendars: function() {

				},
				hideCalendars: function() {

				},
				inputsChanged: function (e) {

				},
				inputsKeydown: function(e) {

				},
				updateInputText: function() {

				},
				clickRange: function (e) {

				},
				clickPrev: function (e) {

				},
				clickNext: function (e) {

				},
				hoverDate: function (e) {

				},
				setCustomDates: function(startDate, endDate) {

				},
				clickDate: function (e) {

				},
				clickApply: function (e) {

				},
				clickCancel: function (e) {

				},
				updateMonthYear: function (e) {

				},
				updateTime: function(e) {

				},
				updateCalendars: function () {

				},
				buildCalendar: function (month, year, hour, minute, second, side) {

				},
				renderDropdowns: function (selected, minDate, maxDate) {

				},
				renderCalendar: function (calendar, selected, minDate, maxDate, side) {

				},
				remove: function() {

				}
			};
			return {
				require: 'ngModel',
				restrict: 'A',
				scope: {
					dateMin: '=min',
					dateMax: '=max',
					model: '=ngModel',
					opts: '=options'
				},
				link: function($scope, element, attrs, modelCtrl) {
					var customOpts, el, opts, _formatted, _init, _picker, _validateMax, _validateMin;
					el = angular.element(element);
					customOpts = $scope.opts;
					opts = angular.extend({}, dateRangePickerConfig, customOpts);
					_picker = null;
					var setStartDate = function(newValue) {
						$timeout(function() {
							var m = moment(newValue);
							if (_picker.endDate < m)
								_picker.setEndDate(m);
							_picker.setStartDate(m);
						});
					};
					var setEndDate = function(newValue) {
						$timeout(function() {
							var m = moment(newValue);
							if (_picker.startDate > m)
								_picker.setStartDate(m);
							_picker.setEndDate(m);
						});
					};
					//Watchers enable resetting of start and end dates
					$scope.$watch('model.startDate', function(newValue) {
						// setStartDate(newValue);
					});
					$scope.$watch('model.endDate', function(newValue) {
						// setEndDate(newValue);
					});

					_formatted = function(viewVal) {
						var f;
						f = function(date) {
							if (!moment.isMoment(date)) {
								return moment(date).format(opts.format);
							}
							return date.format(opts.format);
						};
						if (opts.singleDatePicker) {
							return f(viewVal.startDate);
						} else {
							return [f(viewVal.startDate), f(viewVal.endDate)].join(opts.separator);
						}
					};
					_validateMin = function(min, start) {
						var valid;
						min = moment(min);
						start = moment(start);
						valid = min.isBefore(start) || min.isSame(start, 'day');
						modelCtrl.$setValidity('min', valid);
						return valid;
					};
					_validateMax = function(max, end) {
						var valid;
						max = moment(max);
						end = moment(end);
						valid = max.isAfter(end) || max.isSame(end, 'day');
						modelCtrl.$setValidity('max', valid);
						return valid;
					};
					modelCtrl.$formatters.push(function(val) {
						if (val && val.startDate && val.endDate) {
							setStartDate(val.startDate);
							setEndDate(val.endDate);
							return val;
						}
						return '';
					});
					modelCtrl.$parsers.unshift(function(val) {
						if (!angular.isObject(val) || !(val.hasOwnProperty('startDate') && val.hasOwnProperty('endDate'))) {
							return modelCtrl.$modelValue;
						}
						if ($scope.dateMin && val.startDate) {
							_validateMin($scope.dateMin, val.startDate);
						} else {
							modelCtrl.$setValidity('min', true);
						}
						if ($scope.dateMax && val.endDate) {
							_validateMax($scope.dateMax, val.endDate);
						} else {
							modelCtrl.$setValidity('max', true);
						}
						return val;
					});
					modelCtrl.$isEmpty = function(val) {
						return !val || (val.startDate === null || val.endDate === null);
					};
					modelCtrl.$render = function() {
						if (!modelCtrl.$modelValue) {
							return el.val('');
						}
						if (modelCtrl.$modelValue.startDate === null) {
							return el.val('');
						}
						return el.val(_formatted(modelCtrl.$modelValue));
					};
					_init = function() {
						console.debug('????');
						element.data('daterangepicker', new DateRangePicker(element, opts, function(start, end, label) {
							return $timeout(function() {
								modelCtrl.$setViewValue({
									startDate: start,
									endDate: end
								});
								return modelCtrl.$render();
							});
						}));
						_picker = element.data('daterangepicker');
						return element;
					};
					_init();
					el.on('change', function() {
						if (el.val() === '') {
							return $timeout(function() {
								return modelCtrl.$setViewValue({
									startDate: null,
									endDate: null
								});
							});
						}
					});
					if (attrs.min) {
						$scope.$watch('dateMin', function(date) {
							if (date) {
								if (!modelCtrl.$isEmpty(modelCtrl.$modelValue)) {
									_validateMin(date, modelCtrl.$modelValue.startDate);
								}
								opts['minDate'] = moment(date);
							} else {
								opts['minDate'] = false;
							}
							return _init();
						});
					}
					if (attrs.max) {
						$scope.$watch('dateMax', function(date) {
							if (date) {
								if (!modelCtrl.$isEmpty(modelCtrl.$modelValue)) {
									_validateMax(date, modelCtrl.$modelValue.endDate);
								}
								opts['maxDate'] = moment(date);
							} else {
								opts['maxDate'] = false;
							}
							return _init();
						});
					}
					if (attrs.options) {
						$scope.$watch('opts', function(newOpts) {
							// console.log(angular.equals(opts,newOpts));
							// console.log(newOpts);
							opts = angular.extend(opts, newOpts);
							return _init();
						});
					}
					return $scope.$on('$destroy', function() {
						return _picker.remove();
					});
				}
			};
	}]);
}).call(this);