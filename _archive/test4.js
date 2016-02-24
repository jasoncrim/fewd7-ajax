var apikey = "sf8nr5cth5fgm3vdbf6fvtwa";
var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";
var movieID = movieID;

// construct the uri with our apikey
var moviesSearchUrl = baseUrl + '/lists/movies/box_office.json?apikey=' + apikey;
var moviesRatingsUrl = baseUrl + '/movies/' + movieID+ '/reviews.json?apikey=' + apikey;


var index = [];
var indexLength;
var numOfFresh = 0;
var numOfRotten = 0;


//var movies = data.movies;

//var moviesDiv = "<div>" + movies + "</div>"

// var title = [];
//
function searchCallback(data) {
	//console.log("searchCallback is running");
	//console.log(data.movies);

	var movies = data.movies;

		movies.forEach(function(movie, index) {

			moviesRatingsUrl = baseUrl + '/movies/' + movie.id+ '/reviews.json?apikey=' + apikey + '&page_limit=40';

      //console.log(moviesRatingsUrl);

			var title = movie.title;
			var rating = movie.ratings.audience_score;
			var image = movie.posters.original;
			var baseImage = "http://content8.flixster.com/"

			console.log(image);

			$(".title" + index).html(title);
			$(".rating" + index).html(rating);
			$(".image" + index).html('<img src="' + image + '">');

      //$(".fresh" + index).html(numOfFresh);

      /*index.forEach(function(blah){
        index[index] = 'new value';
      });*/
        //indexLength = index;
        //console.log(indexLength);




		});


}

/*
function reviewsCallback(data) {
  //console.log("reviews callback is running");

  var total = data.total;
  var reviews = data.reviews;

  console.log(total);

//console.log(reviews);

  	reviews.forEach(function(review) {

      //console.log("reviews for each is running");
        freshness = review.freshness;

          if(freshness === "fresh"){
            numOfFresh++;
          }else if (freshness === "rotten") {
            numOfRotten++;
          }else{
            return;
          }

    });

    //for(var i=0;i<=indexLength;i++){
    var counter = 0;
    console.log(indexLength);
    if(counter<=indexLength){
    //  console.log(reviews.length);
    //  console.log(total);
      $(".fresh" + counter).html('<span>fresh</span>'+numOfFresh);
      $(".rotten" + counter).html('<span>rotten</span>'+numOfRotten);
      counter++;
    }
  //  }


}*/

$(document).ready(function() {
  // send off the query
  $.ajax({
		url: moviesSearchUrl + "&limit=3",
    dataType: "jsonp",
    success: searchCallback
  });

/*  $.ajax({
    url: moviesRatingsUrl,
    dataType: "jsonp",
    success: reviewsCallback
  });*/

});
