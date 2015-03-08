/**
 * Created by maayankeenan on 2/26/15.
 */
var FinalView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function () {
        this.current = {score: this.options.currResult.score, time: this.options.currResult.totalTime};
        this.previous = {score: this.options.prevResult.score, time: this.options.prevResult.totalTime};
    },

    render: function () {
        this.$el.empty();
        this.template = _.template($('#FinalView').html());
        this.$el.html(this.template);
        $('#score').text(' ' + this.current.score);
        $('#time').text( ' ' + this.current.time + ' מילישניות');

        if(this.previous && this.previous.score && this.previous.totalTime){
            $('#prev').css('visibility', 'visible');
            $('#prevScore').text(' ' + (this.previous.score - this.current.score));
            $('#prevTime').text( ' ' + (this.previous.time - this.current.time) + ' מילישניות');
        }
    }
});

