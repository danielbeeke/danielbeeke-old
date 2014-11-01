/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "skillBars",
        defaults = {
            skills: {
                'Cooking': {
                    from: 2010,
                    percentage: 70
                },
                'Sleeping': {
                    from: 2001,
                    till: 2004,
                    percentage: 60,
                }
            },
            firstYear: 2002,
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.element.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var that = this
            var lastYear = new Date().getFullYear()
            var firstYear = that.element.options.firstYear
            var totalYears = lastYear - firstYear
            var oneYear = 100 / totalYears
            var wrapperWidth = $(that.element).width()

            var yearGrid = ''

            for (var i = 1; i < totalYears; i++) {
                var left = i * 100 / totalYears
                yearGrid += '<div style="left: ' + left + '%;" class="year-grid year-' + i + '"></div>'
            }

            var percentageGrid = ''

            for (var i = 1; i < 10; i++) {
                var left = i * 100 / 10
                percentageGrid += '<div style="left: ' + left + '%;" class="percentage-grid percentage-' + i + '"></div>'
            }

            $.each(that.element.options.skills, function (name, skill) {
                if (!skill.till) { skill.till = lastYear }

                var fromLeft = (skill.from - firstYear) * oneYear
                var tillLeft = (skill.till - firstYear) * oneYear

                var yearTooltips = '<div class="year-tooltip" style="left: ' + fromLeft + '%;">' + skill.from + '</div>' +
                '<div class="year-tooltip" style="left: ' + tillLeft + '%;">' + skill.till + '</div>'

                if (skill.from != firstYear) {
                    yearTooltips += '<div class="year-tooltip first-year" style="left: 0%;">' + firstYear + '</div>'
                }

                if (skill.till != lastYear) {
                    yearTooltips += '<div class="year-tooltip first-year" style="left: 100%;">' + lastYear + '</div>'
                }

                var percentageTooltips = '<div class="percentage-tooltip" style="left: ' + skill.percentage + '%;">' + skill.percentage + '%</div>'

                if (skill.percentage != 0) {
                    percentageTooltips += '<div class="percentage-tooltip first-percentage" style="left: 0%;">0%</div>'
                }

                if (skill.percentage != 100) {
                    percentageTooltips += '<div class="percentage-tooltip last-percentage" style="left: 100%;">100%</div>'
                }


                $(that.element).append('<span class="skill--label">' + skill.label + '</span><div class="skill-wrapper" data-id="' + name +
                '">' +
                yearTooltips +
                percentageTooltips +
                '<div class="bar">' +
                '</div>' + yearGrid + percentageGrid + '</div>')
            })

            this.percentage(true)
        },

        percentage: function(init) {
            var that = this
            var wrapperWidth = $(that.element).width()
            var barHeight = $('.bar', that.element).height()
            var i = 0

            $.each(that.element.options.skills, function (name, skill) {
                i++

                var barWidth = wrapperWidth / 100 * skill.percentage

                if (init) {
                    $('.skill-wrapper[data-id="' + name + '"] .bar', that.element).css({
                        clip: 'rect(0px, 1px, ' + barHeight +'px, 0px)'
                    })

                    setTimeout(function () {
                        $('.skill-wrapper[data-id="' + name + '"] .bar', that.element).css({
                            clip: 'rect(0px, ' + barWidth + 'px, ' + barHeight +'px, 0px)'
                        })
                    }, 300 + (i * 20))
                }
                else {
                        $('.skill-wrapper[data-id="' + name + '"] .bar', that.element).css({
                            clip: 'rect(0px, ' + barWidth + 'px, ' + barHeight +'px, 0px)'
                        })
                }
            })

            $(that.element).attr('data-type', 'percentage')
        },

        year: function() {
            var that = this
            var lastYear = new Date().getFullYear()
            var firstYear = that.element.options.firstYear
            var totalYears = lastYear - firstYear
            var oneYear = 100 / totalYears
            var wrapperWidth = $(that.element).width()
            var wrapperOnePercentageWidth = wrapperWidth / 100

            var barHeight = $('.bar', that.element).height()

            $.each(that.element.options.skills, function (name, skill) {
                var to = skill.till - skill.from

                var leftClip = ((skill.from - firstYear) * oneYear) * wrapperOnePercentageWidth
                var rightClip = ((skill.from - firstYear) * oneYear) * wrapperOnePercentageWidth + (to * oneYear * wrapperOnePercentageWidth)

                $('.skill-wrapper[data-id="' + name + '"] .bar', that.element).css({
                    clip: 'rect(0px, ' + rightClip + 'px, ' + barHeight +'px, ' + leftClip + 'px)'
                })
            })

            $(that.element).attr('data-type', 'year')
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( methodOrOptions ) {
        if (Plugin.prototype[methodOrOptions]) {

            this.element = this
            this.element.options = this[0].options

            return Plugin.prototype[methodOrOptions].apply( this, Array.prototype.slice.call( arguments, 1 ))
        }
        else {
            return this.each(function () {
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(this, "plugin_" + pluginName,
                    new Plugin( this, methodOrOptions ));
                }
            });
        }
    };

})( jQuery, window, document );
