/**
 * Created by maayankeenan on 2/13/15.
 */
var AnalogWatchView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function () {
        var hourArray = [1, 2, ,3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var minutesArray = [1, 2, ,3, 4, 5, 6, 7, 8, 9, 0];
        var minutesArray2 = [1, 2, ,3, 4, 5];

        var minutes = minutesArray2[this.getRandom(0, 4)] * 10;
        minutes = minutes + minutesArray[this.getRandom(0, 9)];
        this.time = {hours: hourArray[this.getRandom(0, 11)], minutes: minutes};
    },

    getRandom : function(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    },

    render: function () {
        this.$el.empty();
        this.$el.html(_.template($('#AnalogWatchView').html()));
        this.startClock();

    },

    getScore: function () {
        var hours = parseInt($('#hours').val());
        var minutes = parseInt($('#minutes').val());

        var score = 0;
        hours === this.time.hours ? ++score : score;
        minutes === this.time.minutes ? ++score : score;
        return parseInt(score);
    },

    startClock : function() {
        var angle = 360/60,
            hour = this.time.hours,
            minute = this.time.minutes,
            second = 0,
            hourAngle = (360/12) * hour + (360/(12*60)) * minute;

        $('#minute')[0].style['transform'] = 'rotate('+angle * minute+'deg)';
        $('#second')[0].style['transform'] = 'rotate('+angle * second+'deg)';
        $('#hour')[0].style['transform'] = 'rotate('+hourAngle+'deg)';
    },

    canContinue : function(){
        return true;
    }
});