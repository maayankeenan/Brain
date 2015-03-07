var AppView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function(){
        // recurring view
        this.minus7View = new Minus7View();
        this.nounsView = new NounsView();

        // defining our views
        this.views = [new TimeView(), this.minus7View,  new LocationView(), this.nounsView, this.minus7View, new PicturesView(), this.nounsView, new HourView(), new AnalogWatchView()];

        this.total = 0;
        var self = this;
        this.statisticsMatrix = [];

        // register to events
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

        // render first view
        this.views[this.viewIndex].render();

        // start timer
        this.startTime = new Date();
    },

    doNext: function() {
        if(this.views[this.viewIndex].canContinue() && this.viewIndex < this.views.length - 1) {

            // stop timer
            this.endTime = new Date();

            // get current view score
            var currentScore = this.views[this.viewIndex].getScore();

            // save in matrix: score and time by view num
            this.statisticsMatrix[this.viewIndex] = {score: currentScore, time: this.endTime - this.startTime};

            // sum total score
            this.total += currentScore;

            // continue to next view
            ++this.viewIndex;
            this.views[this.viewIndex].render();

            // start new timer
            this.startTime = new Date();
        } else if(this.viewIndex == this.views.length - 1) {
            this.doFinish();
        }
    },

    doFinish : function() {
        this.$el.empty();
        var title = $('<h1 style="text-align: center">תודה על שיתוף הפעולה</h1>')
        this.$el.append(title);
        $('#next').remove();
    }
});