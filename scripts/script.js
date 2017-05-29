//user selects movie genre
//user clicks submit
//generate one random movie from that genre
//display movie to user

var movieApp = {}

movieApp.init = function() {
    movieApp.genreChoice();
    movieApp.slotMachine();
}


//this retrieves list of movies with the user's selected genre from itunes
movieApp.getMovieList = function(id) {
	$.ajax({
        url: 'https://itunes.apple.com/search',
        method: 'GET',
        dataType: 'jsonp',
        data: {
          term: 'movie',
          country: 'CA',
          media: 'movie',
          entity: 'movie',
          genreId: id,
          limit: '30'
          }
      })
    .then(function(res){
        console.log(res.results);
        var movieData = res;

        //this chooses one random item from movieData.results
        var randomItem = movieData.results[Math.floor(Math.random() * movieData.results.length)];
        setTimeout(function() { movieApp.displayRandomItem(randomItem) }, 1500);
  });
}

//this displays movie list to html page
movieApp.displayRandomItem = function(randomItem){
    $(".movieInfo").empty();

    const li = $('<li>');
    const movieTitle = $('<li>').text(randomItem.trackName);
    $('ul').prepend(movieTitle);

    const moviePoster = $('<img>').attr('src', randomItem.artworkUrl100);
    const movieDescription = $('<p>').text(randomItem.longDescription);
    $('.movieInfo').append(moviePoster, movieDescription);

}

//slot machine js
/*
 * jQuery jSlots Plugin
 * http://matthewlein.com/jslot/
 * Copyright (c) 2011 Matthew Lein
 * Version: 1.0.2 (7/26/2012)
 * Dual licensed under the MIT and GPL licenses
 * Requires: jQuery v1.4.1 or later
 */
movieApp.slotMachine = function(){
    $('.slot').jSlots({
        spinner: '#playBtn'
    }); 
}

//user select genre and value is stored in clickedItem
movieApp.genreChoice = function() { 
  $('label').click(function(){
      $('label').not(this).removeClass('selected');    
      $(this).toggleClass('selected');
  });


  //on submit, get data-genre from input to pass through getMovieList function
  $('form').on("submit", function(e){
    e.preventDefault();
    var clickedItem = $('input[name=genre]:checked').data('genre');
    movieApp.getMovieList(clickedItem);
    //clickedItem = genreid number according to itunes api docs

    //scroll to slotMachine section on submit
    $('html, body').animate({
        scrollTop: $("#slotMachine").offset().top
    }, 2000);
  });
};


//doc ready
$(document).ready(function(){
  movieApp.init();
});
