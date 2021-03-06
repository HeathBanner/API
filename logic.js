var gifObject = []
var gifFlag = gifObject
var testObj = []


var fav = []    
var userFav = []
var favIndex = []
var count = 0
var empty = []
var favFlag = true
var movieFlag = false

var description = []
var png = []


$(document).ready($(document).on("click", "#omdb", function(){
    $(".btns").remove()
    $(".clear").remove()
    $("#userFav").css({
        display: 'none',
    })
    gifFlag = []
    favFlag = true
    
    var movieReplace = $('<button id="giphy">Giphy</button>')
    $("#omdb").replaceWith(movieReplace)

    movieFlag = true

    var newBtns = ["interstellar", 'frozen', 'tropic thunder', 'the conjuring']

    for (var i = 0; i < newBtns.length; i++) {
        
        var button = $('<button class="btns" id="' + newBtns[i] + '" value="' + newBtns[i] + '">' + newBtns[i] + '</button>')
        $("#btnTarget").append(button);
    }
}));

$(document).ready($(document).on("click", "#giphy", function(){
    $(".btns").remove()
    $(".remove").remove()
    var giphyReplace = $('<button id="omdb">Movies</button>')
    $("#giphy").replaceWith(giphyReplace)
    $("#userFav").css({
        display: 'block',
    })


    movieFlag = false
    
    var newBtns = ['Cat', 'Dog', 'Funny', 'Trending', 'Random']

    for (var i = 0; i < newBtns.length; i++) {
        lower = newBtns[i].toLowerCase()

        var button = $('<button class="btns" id="' + lower + '" value="' + lower + '">' + newBtns[i] + '</button>')
        $("#btnTarget").append(button)
    }
}));

$(document).ready($(document).on("click", "#submit", function(){
        value = $("input").val()
        $('input').val('');
        var btnUpdate = $("<button class='btns' value='" + value + "'>" + value + "</button>")
        $("#btnTarget").append(btnUpdate)
}));

$(document).ready($(document).on("click", "img", function(){
    var index = this.id
    var img = this;
    var data = img.dataset;
    var dName = data.name

    var still = []
    var animated = []

    if (data.name == "fav") {
        for (var i = 0; i < userFav.length; i++) {
        
            if (index == userFav[i].id) {
                still.push(userFav[i].images.original_still.url)
                animated.push(userFav[i].images.original.url)
            }
        }
        if (this.classList.contains("still")) {
            $("#" + this.id).replaceWith('<img src="' + animated[0] + '" class="animated gifContent clear" id="' + index + '" data-name="' + data.name + '">')
        } else{
            $("#" + this.id).replaceWith('<img src="' + still[0] + '" class="still gifContent clear" id="' + index + '" data-name="' + data.name + '">')  
        }
    }else{

        for (var i = 0; i < gifObject[dName].length; i++) {
                
            if (index == gifObject[dName][i].id) {
                still.push(gifObject[dName][i].images.original_still.url)
                animated.push(gifObject[dName][i].images.original.url)
            }
        }
        if (this.classList.contains("still")) {
            $("#" + this.id).replaceWith('<img src="' + animated[0] + '" class="animated gifContent clear" id="' + index + '" data-name="' + dName + '">')
        } else{
            $("#" + this.id).replaceWith('<img src="' + still[0] + '" class="still gifContent clear" id="' + index + '" data-name="' + dName + '">')  
        }
    }
}));

$(document).ready($(document).on("click", ".favorite", function(){
    var index = this.id
    var img = this;
    var data = img.dataset;
    var dName = data.name
    
    count++

    for (var i = 0; i < gifObject[dName].length; i++) {
        if (index == gifObject[dName][i].id) {
            if (empty.indexOf(index) == -1) {
                
                empty.push(index)
                
                userFav.push(gifObject[dName][i])
                
                userFav[dName] = dName
            }
        }
    }
}));
    
$(document).ready($(document).on("click", "#userFav", function(){
    if (userFav.length < 1) {
        alert("You've no saved favorites!")
    }else {
    
    gifFlag = []
    favFlag = true
    $(".clear").remove()
    
    var index = this.id
    var img = this;
    var data = img.dataset;
    var dName = data.name

    favFlag = false
    
        for (var i = 0; i < userFav.length; i++) {
                
            var gifDiv = $('<div class="gifDiv clear fav">')
    
            var title = $('<h3 class="clear gifContent">' + userFav[i].title.toUpperCase() + '</h3>')
            gifDiv.append(title)
            
            var img = $('<img src="' + userFav[i].images.original_still.url + '" class="still gifContent clear" id="' + empty[i] + '" data-name="fav">')
            gifDiv.append(img)

            var rating = $('<p class="clear gifContent">Rating: ' + userFav[i].rating.toUpperCase() + '</p>')
            gifDiv.append(rating)
    
            var source = $('<a href="' + userFav[i].source + '" class="clear gifContent source" target="_blank">Source</h3>')
            gifDiv.append(source)
    
            var view = $('<a href="' + userFav[i].images.original.url + '" class="clear gifContent view" target="_blank">View</h3>')
            gifDiv.append(view)
            
            $("#gifTarget").append(gifDiv)
        }
    }
}));

$(document).ready($(document).on("click", ".btns", function(){
    movie = $(this).val()

    if(movieFlag) {
        $(".remove").remove()
        movie = movie.split(' ').join('+')
        grabMovie()

    }else if (!movieFlag) {
        
        if (!favFlag) {
            $(".fav").remove()
            favFlag = true
        }
        newGif = $(this).val()
        if (gifFlag[newGif]) {
            return
        } else if (favFlag){
            grabGif()
        }
    }
}));

$(document).ready($(document).on("click", "#clearBtn", function(){
    gifFlag = []
    favFlag = true
    $(".clear").remove()
    $(".remove").remove()
}));

function grabGif() {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q="+ newGif + "&api_key=sqkFRkHXvw3ho2qUPYvEA7jx7TUSsUnv&limit=10",
        method: "GET",
    }).then(function(response) {
        gifObject[newGif] = response.data
        gifFlag[newGif] = response.data
        for (var i = 0; i < 10; i++) {
            var gifDiv = $('<div class="gifDiv clear">');

            var title = $('<h6 class="clear gifContent">' + response.data[i].title.toUpperCase() + '</h6>')
            gifDiv.append(title)
            
            var still = $('<img src="' + response.data[i].images.original_still.url + '" class="still gifContent clear" id="' + response.data[i].id + '" data-name="' + newGif + '">');
            gifDiv.append(still);
            
            var overlay = $('<div class="gifOverlay">');
            gifDiv.append(overlay)
                                    
            var source = $('<a href="' + response.data[i].source + '" class="clear gifContent source" target="_blank">Source</h3>')
            gifDiv.append(source)

            var view = $('<a href="' + response.data[i].images.original.url + '" class="clear gifContent view" target="_blank">View</h3>')
            gifDiv.append(view)

            var fav= $('<button id="' + response.data[i].id + '" class="clear favorite" data-name="' + newGif + '">Favorite</button>')
            gifDiv.append(fav)

            $("#gifTarget").append(gifDiv)
        }
    })
};

function grabMovie() {
    $.ajax({
        url: 'https://www.omdbapi.com/?t=' + movie + '&apikey=trilogy',
        method: 'GET',
    }).then(function(response) {
        var newDiv = $('<div id="movieDiv" class="remove"></div>')

        var title = $('<h1 id="movieTitle" class="remove">' + response.Title + '</h1>')
        newDiv.append(title)

        var poster = $('<img src="' + response.Poster + '" id="movieImg" class="remove">')
        newDiv.append(poster)

        var release = $('<h6 id="movieRelease" class="remove">Released: ' + response.Released + '</h6>')
        newDiv.append(release)

        var rating = $('<h4 id="movieRating" class="remove">' + response.Ratings[1].Source + ": " + response.Ratings[1].Value + '</h4>')
        newDiv.append(rating)

        var plotDiv = $(`<div id="plotDiv">`);
        var plotBody = $(`<h5 id="plotTitle" class="remove moviePlot">Plot</h5><p class="remove moviePlot">${response.Plot}</p>`);
        plotDiv.append(plotBody);

        newDiv.append(plotDiv);

        $("#gifTarget").append(newDiv)
    })
}

function weatherMood() {
    var atmosphere = ['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash', 'Squall', 'Tornado']
    var rain = ['Rain', 'Drizzle']

    if (main === 'Clouds') {
        $(".headerRow").css({
            background: '#b7b7b7',
        })

        $(".btnFrame").css({
            background: '#eae8e8',
        })

        $(".contentFrame").css({
            background: '#5b5b5b',
        })
    }else if (rain.indexOf(main) > -1) {
        $(".headerRow").css({
            background: '#4e4e4f',
        })

        $(".btnFrame").css({
            background: '#043f99',
        })

        $(".contentFrame").css({
            background: '#949496',
        })
    }else if (main === 'Clear') {
        $(".headerRow").css({
            background: '#f4d330',
        })

        $(".btnFrame").css({
            background: '#f2f0cb',
        })

        $(".contentFrame").css({
            background: '#87dfff',
        })
    }else if (main === 'Thunderstorm') {
        $(".headerRow").css({
            background: '#494949',
        })

        $(".btnFrame").css({
            background: '#ffff75',
        })

        $(".contentFrame").css({
            background: '#afafac',
        })
    }else if (main === 'Snow') {
        $(".headerRow").css({
            background: '#70706f',
        })

        $(".btnFrame").css({
            background: '#d8d8d4',
        })

        $(".contentFrame").css({
            background: '#ffffff',
        })
    }else if (atmosphere.indexOf(main) > -1) {
        $(".headerRow").css({
            background: '#a5a4a4',
        })

        $(".btnFrame").css({
            background: '#f2f2f2',
        })

        $(".contentFrame").css({
            background: '#e5e5e5',
        })
    }
}

function weatherDisplay() {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?id=4460243&APPID=4216d1350fe31af9bf5100bb34fa72e2',
        method: "GET",
    }).then(function(response){
        description = response.weather[0].description
        main = response.weather[0].main
        png = response.weather[0].icon

        var weather = $('<h6 id="weatherD">' + description + '</h6>')
        $("#weatherTarget").append(weather)

        var icon = $('<img src="https://openweathermap.org/img/w/' + png + '.png" id="weatherPng">')
        $("#weatherTarget").append(icon)

        weatherMood()
    })
}

weatherDisplay()

