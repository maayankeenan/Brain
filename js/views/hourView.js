/**
 * Created by maayankeenan on 1/29/15.
 */
var HourView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function(){

        this.nums12 = ['אחת', 'שתיים','שלוש','ארבע','חמש','שש','שבע','שמונה','תשע','עשר','אחת עשרה','שתיים עשרה'];
        this.multiMin = ['עשרים','שלושים','ארבעים','חמישים'];
        this.ampm = ['לפנה"צ','אחה"צ'];
    },

    render: function(){
        this.$el.empty();
        this.$el.html(_.template($('#HourView').html()));

        this.hourIndex = Math.floor((Math.random() * this.nums12.length));
        this.multiMinIndex = Math.floor((Math.random() * this.multiMin.length));
        this.minutesIndex = Math.floor((Math.random() * (this.nums12.length - 3)));
        this.ampmIndex = Math.floor((Math.random() * this.ampm.length));

        var hourString = this.nums12[this.hourIndex] + " " + this.multiMin[this.multiMinIndex] + " ו" + this.nums12[this.minutesIndex] + " " + this.ampm[this.ampmIndex];
        $('#hourText').text(hourString);
    },

    getScore: function() {

        var inputHour = $('#hourInput').val();
        var hourAndMin = inputHour.split(":");
        var score = 0;

        if(hourAndMin.length === 2)
        {
            if(!isNaN(hourAndMin[0]))
            {
                var intHour = parseInt(hourAndMin[0]);

                if((this.ampmIndex === 0 && intHour < 13) || (this.ampmIndex === 1 && intHour > 12))
                {
                    score += 2;
                }

                if(intHour > 12)
                {
                    intHour -= 12;
                }

                if(intHour === (this.hourIndex + 1))
                {
                    score += 4;
                }
                else if((intHour === (this.hourIndex + 2)) || (intHour === (this.hourIndex)))
                {
                    score += 1;
                }
            }

            if(!isNaN(hourAndMin[1]))
            {
                var minutes = hourAndMin[1];

                var multiMin = parseInt(minutes[0]);
                if(multiMin > 1 && multiMin < 6)
                {
                    if(multiMin === (this.multiMinIndex + 2))
                    {
                        score += 2;
                    }
                    else if((multiMin === (this.multiMinIndex + 3)) || (multiMin === (this.multiMinIndex + 1)))
                    {
                        score += 1;
                    }
                }

                var min = parseInt(minutes[1]);
                if(min > 0)
                {
                    if(min === (this.minutesIndex + 1))
                    {
                        score += 2;
                    }
                    else if((min === (this.minutesIndex + 2)) || (min === (this.minutesIndex)))
                    {
                        score += 1;
                    }
                }

            }


        }

        return parseInt(score);
    },

    canContinue: function() {
        return true;
    }

});