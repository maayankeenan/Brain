/**
 * Created by maayankeenan on 2/11/15.
 */
var Minus7View = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function () {
        this.calcResult = 100;
    },

    render: function () {
        if(!this.template) {
            this.template = _.template($('#Minus7View').html());
            this.rendered = true;
        }
        this.$el.empty();
        this.$el.html(this.template);

        if(this.rendered){
            $('#firstText', this.template).hide();
            $('#secondText', this.template).show();
        }
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

    },

    canContinue: function() {
        return true;
    }
});