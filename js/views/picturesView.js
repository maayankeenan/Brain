/**
 * Created by maayankeenan on 2/11/15.
 */
var PicturesView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function(){
        this.images = [{fileName : "./images/pics/dog.png" , word : "כלב", vowelsErrors : [] , errors: ["קלב", "כלו"]},
            {fileName : "./images/pics/cat.jpg" , word : "חתול",  vowelsErrors : ["חתל"], errors: ["חטול"]},
            {fileName : "./images/pics/umbrella.jpg" , word : "מטריה", vowelsErrors : ["מטרייה", "מיטריה"], errors: ["מתריה"]},
            {fileName : "./images/pics/camera.jpg" , word : "מצלמה", vowelsErrors : ["מצלימה", "מצלמא"], errors: []},
            {fileName : "./images/pics/clock.jpg" , word : "שעון", vowelsErrors : ["שאון", "שען", "שהון"], errors: ["שעונ"]},
            {fileName : "./images/pics/ring.png" , word : "טבעת", vowelsErrors : ["טבאת", "טבהת"], errors: ["תבעת"]},
            {fileName : "./images/pics/teapot.jpg" , word : "קומקום", vowelsErrors : ["קמקם", "קומקם", "קמקום"], errors: ["כומכום", "קומקומ", "קוםקום"]},
            {fileName : "./images/pics/truck.jpg" , word : "משאית", vowelsErrors : ["משעית", "משהית", "משאת"], errors: ["משאיט"]},
            {fileName : "./images/pics/watermelon.jpg" , word : "אבטיח", vowelsErrors : ["אבטח", "עבטיח", "הבטיח"], errors: ["אוטיח", "אבתיח"]},
            {fileName : "./images/pics/banana.jpeg" , word : "בננה", vowelsErrors : [], errors: []}];

        this.count = 3;
        this.score = 0;
    },

    render: function(){
        this.$el.empty();
        this.$el.html(_.template($('#PicturesView').html()));
        this.nextPic();
    },

    getScore: function() {

        return parseInt(this.score);
    },

    canContinue: function() {

        if(this.count > 0)
        {
            var inputWord = $('#word').val();

            if(inputWord)
            {
                if(inputWord === this.currImg.word)
                {
                    this.score += 3;
                }
                else if(this.currImg.vowelsErrors.indexOf(inputWord) > (-1))
                {
                    this.score += 2;
                }
                else if(this.currImg.errors.indexOf(inputWord) > (-1))
                {
                    this.score += 1;
                }
            }

            this.nextPic();
            return false;
        }

        return true;
    },

    nextPic: function() {
        var imgIndex = Math.floor((Math.random() * this.images.length));
        this.currImg = this.images[imgIndex];
        this.images.splice(imgIndex, 1);
        $('#wordImg').attr("src", this.currImg.fileName);
        $('#word').val('');
        this.count--;
    }

});
