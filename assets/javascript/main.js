var topics = [
    "Apocalypse Now",
    "Jumanji",
    "Minority Report",
    "Children of Men",
    "Star Wars",
    "Blade Runner",
    "The Matrix",
    "Airplane!",
    "Monty Python and the Holy Grail",
    "Superbad",
    "The Dark Knight",
    "Iron Man",
    "The Avengers",
    "No Country for Old Men",
    "Silence of the Lambs"
]

$(document).ready(function () {
    topics.forEach(element => {
        var newBtn = $('<button>');
        newBtn.attr('data-movie', element);
        newBtn.addClass("gifbutton");
        newBtn.text(element);
        $('#buttons-list').append(newBtn);
    })

    var apiKey = 'JWs4H55JV9tJUjterOpDWk1ESMbymo34';

    var queryString = 'http://api.giphy.com/v1/gifs/search?api_key=' + apiKey;

    $(document.body).on("click", ".gifbutton", function () {
        var gifDiv = $('#gif-display');
        gifDiv.html('');

        queryString += '&q=' + $(this).attr('data-movie') + '&limit=10';

        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (response) {
            var gifs = response.data;
            gifs.forEach(element => {
                var gifImg = $('<img>');
                gifImg.addClass('gifImg');
                gifImg.attr('state', 'still');
                gifImg.attr('still-url', element.images.fixed_height_still.url);
                gifImg.attr('animate-url', element.images.fixed_height.url);
                gifImg.attr('src', element.images.fixed_height_still.url);
                gifDiv.append(gifImg);
            })
        })
    })

    $(document.body).on("click", '.gifImg', function () {
        var element = $(this);
        if (element.attr('state') == 'still') {
            element.attr('state', 'animate');
            element.attr('src', element.attr('animate-url'));
        } else if (element.attr('state') == 'animate') {
            element.attr('state', 'still');
            element.attr('src', element.attr('still-url'));
        }
    })
})