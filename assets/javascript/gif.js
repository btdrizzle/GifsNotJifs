var topics = ["autumn", "fall season", "mountains", "apple cider", "halloween"];

function makeButtons() {
    $("#buttons-view").empty();
    topics.forEach(function (topic) {
        var button = $('<button>');
        button.text(topic);
        button.attr('type', 'button');
        button.addClass("topic btn m-2");
        button.attr('data-name', topic);
        button.attr('data-gifSet', 0);
        button.css({'background-color': '#9F371A'});
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
    var limit = 100;
    var queryUrl = `http://api.giphy.com/v1/gifs/search?q=${topicName}&api_key=${apiKey}&limit=${limit}`;
    var giffy = $.get(queryUrl);
    var gifNum = parseInt($(this).attr('data-gifSet'));
    giffy.done(function (response) {
        console.log(response.data);
        console.log(gifNum);
        for(i = gifNum;i < (gifNum + 10);i++) {

            console.log(response.data[i]);
            var newDiv = $('<div>');
            var newImg = $('<img>');
            var newP = $('<p>');
            newDiv.addClass('d-inline-block mr-2 text-center');
            newImg.attr('src',response.data[i].images.fixed_height_still.url);
            newImg.attr('data-still',response.data[i].images.fixed_height_still.url);
            newImg.attr('data-animated',response.data[i].images.fixed_height.url);
            newImg.attr('data-state',"still");
            newImg.addClass('gif');
            newImg.css({'border-radius':'10%'});
            newP.addClass('lead');
            newP.text(("Rating: " + response.data[i].rating).toUpperCase());
            newDiv.append(newImg);
            newDiv.append(newP);
            $('#allTheGifs').prepend(newDiv);
        }
    $('#top-image').attr('src',response.data[gifNum].images.fixed_height.url)
    });
    gifNum += 10;
        if(gifNum < 100) {
            $(this).attr('data-gifSet',gifNum);
        }
        else {
            $(this).attr('data-gifSet',0);
        }
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