/**
 * Created by maayankeenan on 1/29/15.
 */
var NounsView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function(){

        this.nouns = [{word : "שולחן", vowelsErrors : ["שלחן"] , errors: ["שולכן", "שולחנ"]},
            {word : "כסא",  vowelsErrors : ["כיסא", "כסה", "כסע"], errors: ["קסא"]},
            {word : "מחברת", vowelsErrors : [], errors: ["מכברת"]},
            {word : "אמריקה", vowelsErrors : ["עמריקה", "המריקה"], errors: ["אמריכה"]},
            {word : "בורקס", vowelsErrors : ["ברקס"], errors: ["בורכס"]},
            {word : "דלעת", vowelsErrors : ["דלאת", "דלהת"], errors: []},
            {word : "ירושלים", vowelsErrors : ["ירושלם", "ירושליים", "ירשלים"], errors: []},
            {word : "חרגול", vowelsErrors : ["חרגל"], errors: ["כרגול"]},
            {word : "חברים", vowelsErrors : ["חברים", "חבריים", "חוורים"], errors: ["חברימ"]},
            {word : "כיסופים", vowelsErrors : ["כיספים", "כיסופם", "כסופים"], errors: ["קיסופים", "כיסופימ"]}];

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
            $("#nounsHeadLine").hide();
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

        var score = 0;

        var noun1 = $('#noun1').val();
        var noun2 = $('#noun2').val();
        var noun3 = $('#noun3').val();

        var inputWords = [noun1, noun2, noun3];

        for(var j = 0; j < inputWords.length; j++)
        {
            var inputWord = inputWords[j];

            if(inputWord)
            {
                for(var i = 0; i < this.selected.length; i++)
                {
                    var selectedWord = this.selected[i];

                    if(inputWord === selectedWord.word)
                    {
                        score += 3;
                        break;
                    }
                    else if(selectedWord.vowelsErrors.indexOf(inputWord) > (-1))
                    {
                        score += 2;
                        break;
                    }
                    else if(selectedWord.errors.indexOf(inputWord) > (-1))
                    {
                        score += 1;
                        break;
                    }
                }
            }

        };

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

            var noun = this.selected[this.nounIndex].word;
            $('#nounText').text(noun);
            this.nounIndex++;

            var that = this;
            this.timer = setTimeout(function () {
                that.nextNoun();
            }, 10000);
        }

    }


});