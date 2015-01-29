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
        var day = $('#day').val();
        return parseInt(day);
    }

});