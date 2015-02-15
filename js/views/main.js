var AppView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function(){
        this.minus7View = new Minus7View();
        this.nounsView = new NounsView();
        this.views = [new TimeView(), this.minus7View,  new LocationView(), this.nounsView, this.minus7View, new PicturesView(), this.nounsView, new HourView(), new AnalogWatchView()];
        this.total = 0;
        var self = this;
        $('#startBtn').on('click', function(){
            if($('#idBox').val() != '') {
                this.startTime = new Date();
                self.render();
            }else{
                $('#error').text('אנא הזמן מספר ת.ז');
            }
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
        if(this.views[this.viewIndex].canContinue() && this.viewIndex < this.views.length) {
            this.total += this.views[this.viewIndex].getScore();
            ++this.viewIndex;
            console.log(this.total);
            this.views[this.viewIndex].render();
        }
    }
});