/**
 * Created by maayankeenan on 2/11/15.
 */
var LocationView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function(){

    },

    render: function(){
        this.$el.empty();
        this.$el.html(_.template($('#LocationView').html()));
    },

    getScore: function() {

        var city = $('#city').val();
        var state = $('#state').val();
        var floor =parseInt($('#floor').val());

        var score = 0;
        city === "תל אביב -יפו" ? ++score: score;
        state === "ישראל" ? ++score: score;
        floor == 7 ? ++score: score;
        return parseInt(score);
    }

});
