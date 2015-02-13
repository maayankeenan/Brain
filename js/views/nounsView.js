/**
 * Created by maayankeenan on 1/29/15.
 */
var NounsView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function(){

        this.nouns = ['שולחן','כסא','מחברת','אמריקה','בורקס','דלעת','ירושלים','חרגול','חברים','כיסופים'];
        this.nounsCount = 3;
        this.isViewMode = true;

        this.selected = [];

        for(var i = 0; i < this.nounsCount ; i++)
        {
            var nounIndex = Math.floor((Math.random() * this.nouns.length));
            this.selected.push(this.nouns[nounIndex]);
            this.nouns.splice(nounIndex, 1);
        }
    },

    render: function(){
        this.$el.empty();
        this.$el.html(_.template($('#NounsView').html()));

        if(this.isViewMode)
        {
            this.nounIndex = 0;
            this.nextNoun();
        }
        else
        {
            $("#nounText").hide();
            $("#nounsInput").show();
        }
    },

    getScore: function() {

        if(this.isViewMode && (this.nounIndex >= this.nounsCount))
        {
            this.isViewMode = false;
            var score = 0;
            return parseInt(score);
        }

        var score = 1;

        var noun1 = $('#noun1').val();
        var noun2 = $('#noun2').val();
        var noun3 = $('#noun3').val();

        if(this.selected.contains(noun1))
        {
            score +=3;
        }

        if(this.selected.contains(noun2))
        {
            score +=3;
        }

        if(this.selected.contains(noun3))
        {
            score +=3;
        }

        return parseInt(score);
    },

    canContinue: function() {

        if(this.nounIndex >= this.nounsCount)
        {
            return true;
        }

        this.nextNoun();
        return false;
    },

    nextNoun : function() {

        if(this.nounIndex < this.nounsCount)
        {
            if(this.timer)
            {
                clearTimeout(this.timer);
            }

            var noun = this.selected[this.nounIndex];
            $('#nounText').text(noun);
            this.nounIndex++;

            var that = this;
            this.timer = setTimeout(function () {
                that.nextNoun();
            }, 10000);
        }

    }


});