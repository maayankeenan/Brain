/**
 * Created by maayankeenan on 2/11/15.
 */
var PicturesView = Backbone.View.extend({
    el: '.dynamic-view',

    initialize: function(){
        this.images = [{fileName : "http://www.hoax-slayer.com/images/jerky-dog.jpg" , word : "כלב"},
            {fileName : "http://i2.kym-cdn.com/photos/images/newsfeed/000/406/325/b31.jpg" , word : "חתול"},
            {fileName : "http://cdn.shopify.com/s/files/1/0227/0033/products/Davek_Umbrella_Elite_Open_Straight_1024x1024.jpg?" , word : "מטריה"}];

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
            if($('#word').val() === this.currImg.word)
            {
                this.score++;
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
