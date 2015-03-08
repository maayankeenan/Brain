var AppView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function(){
        this.finalResult = {};

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
                self.userId = $('#idBox').val();
                self.startTime = new Date();
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
        if(this.views[this.viewIndex].canContinue() && this.viewIndex < this.views.length) {

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

            if(this.viewIndex < this.views.length) {
                this.views[this.viewIndex].render();

                // start new timer
                this.startTime = new Date();
            }
            else {
                this.doFinish();
            }
        }
    },

    doFinish : function() {
        var self = this;
        this.finalResult["Id"] = this.userId;
        this.finalResult["date"] = new Date().toDateString();
        this.finalResult["totalTime"] = new Date() - this.startTime;
        this.finalResult["score"] = this.total;
        this.finalResult["data"] = this.statisticsMatrix;

        var $loading = $(_.template($('#Loading').html())());
        $('body').append($loading);

        setTimeout(function() {
            $.get("http://localhost:8080/ReportService/api/saveReportById/" + self.userId + "/" + encodeURIComponent(JSON.stringify(self.finalResult)),
                function (data) {
                    $('#next').remove();
                    self.$el.empty();
                    var prev = data ? JSON.parse(data) : undefined;
                    var final = new FinalView({currResult: self.finalResult, prevResult: prev});
                    final.render();
                    $loading.remove();
                }
            );
        }, 3000);

    }

});



