var topics = ["autumn leaves", "fall", "mountains", "apple cider", "halloween"];

function makeButtons() {
    $("#buttons-view").empty();
    topics.forEach(function (topic) {
        var button = $('<button>');
        button.text(topic);
        button.attr('type', 'button');
        button.addClass("topic btn btn-info m-2");
        button.attr('data-name', topic);
        $('#buttons-view').append(button);
    })
};
$(document).on("click", '#add-topic', function () {
    event.preventDefault();
    topics.push($('#user-input').val().trim());
    $('#user-input').val('');
    makeButtons();
});

function displayThoseGifs() {
    var topicName = $(this).attr("data-name");
    var apiKey = "45G4PntQBFpQgod6lK4hSRmFSF96etGP";
    var limit = 10;
    var queryUrl = `http://api.giphy.com/v1/gifs/search?q=${topicName}&api_key=${apiKey}&limit=${limit}`;
    var giffy = $.get(queryUrl);
    giffy.done(function (response) {
        console.log(response.data);
        response.data.forEach(function (gif) {
            console.log(gif);
            var newDiv = $('<div>');
            var newImg = $('<img>');
            var newP = $('<p>');
            newDiv.addClass('d-inline-block mr-2 text-center');
            newImg.attr('src',gif.images.fixed_height_still.url);
            newImg.attr('data-still',gif.images.fixed_height_still.url);
            newImg.attr('data-animated',gif.images.fixed_height.url);
            newImg.attr('data-state',"still");
            newImg.addClass('gif');
            newImg.css({'border-radius':'10%'});
            newP.addClass('lead');
            newP.text(("Rating: " + gif.rating).toUpperCase());
            newDiv.append(newImg);
            newDiv.append(newP);
            $('#allTheGifs').prepend(newDiv);

        })

    });
}




$(document).on('click', '.topic', displayThoseGifs);
$(document).on('click','.gif',function() {
    var state = $(this).attr('data-state');
    if(state === "still") {
        $(this).attr('src',$(this).attr('data-animated'));
        $(this).attr('data-state','animated');
      }
      else {
        $(this).attr('src',$(this).attr('data-still'));
        $(this).attr('data-state','still');
      }
})

makeButtons();