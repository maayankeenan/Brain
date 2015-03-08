/**
 * Created by maayankeenan on 2/11/15.
 */
var Minus7View = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function () {
        this.calcResult = 100;
    },

    render: function () {
        this.$el.empty();
        this.template = _.template($('#Minus7View').html());
        this.$el.html(this.template);
        $('#secondText').text(this.calcResult);
    },

    getScore: function () {
        var result = $('#calc').val();
        var score = 0;
        if(result != ''){
            var intVal = parseInt(result);
            if(this.calcResult - 7 == intVal){
                ++score;
            }
            this.calcResult = intVal;
        }
        return score;
    },

    canContinue: function() {
        return true;
    }
});