/**
 * Created by maayankeenan on 1/29/15.
 */
var TimeView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function(){

    },

    render: function(){
        this.$el.empty();
        this.$el.html(_.template($('#TimeView').html()));
    },

    getScore: function() {
        var today = new Date();
        var currentDay = today.getDate();
        var currentMonth = today.getMonth()+1; //January is 0!
        var currentYear = today.getFullYear();

        var day = parseInt($('#day').val());
        var month = parseInt($('#month').val());
        var year = parseInt($('#year').val());

        var score = 0;
        day == currentDay ? ++score: score;
        month == currentMonth ? ++score: score;
        year == currentYear ? ++score: score;
        return parseInt(score);
    },

    canContinue: function() {
        return true;
    }

});