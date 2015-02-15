/**
 * Created by maayankeenan on 2/13/15.
 */
var AnalogWatchView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function () {
        var hourArray = [1, 2, ,3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var minutesArray = [1, 2, ,3, 4, 5, 6, 7, 8, 9, 0];

        this.time = {hours: hourArray[this.getRandom(0, 11)], minutes: minutesArray[this.getRandom(0, 9) * 10 + minutesArray[this.getRandom(0, 9)] ]};

    },

    getRandom : function(min, max) {
        return Math.random() * (max - min) + min;
    },

    render: function () {
        this.$el.empty();
        this.$el.html(_.template($('#AnalogWatchView').html()));
        CoolClock.findAndCreateClocks();

    },

    getScore: function () {
        var hours = parseInt($('#hours').val());
        var minutes = parseInt($('#minutes').val());

        var score = 0;
        hours === this.time.hours ? ++score : score;
        minutes === this.time.minutes ? ++score : score;
        return parseInt(score);
    }
});