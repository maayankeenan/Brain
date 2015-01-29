var AppView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function(){
        this.views = [new TimeView()];
        this.total = 0;
        var self = this;
        $('#startBtn').on('click', function(){
            this.startTime = new Date();
            self.render();
        });

        $('#next').on('click', _.bind(this.doNext, this));
    },

    render: function(){
        this.$el.empty();
        $('.actions').show();
        this.viewIndex = 0;
        this.views[this.viewIndex].render();
    },

    doNext: function() {
        this.total += this.views[this.viewIndex].getScore();
        ++this.viewIndex;
        console.log(this.total);
        this.views[this.viewIndex].render();

        //when i-10 do finish
    }
});