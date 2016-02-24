var apikey = "sf8nr5cth5fgm3vdbf6fvtwa";
var baseUrl = "https://api.rottentomatoes.com/api/public/v1.0";

//var moviesRatingsUrl = baseUrl + '/movies/' + movieID+ '/reviews.json?apikey=' + apikey;
var moviesID;
var moviesRatingsUrl;

var movies = [
{
id: "771390242",
title: "Deadpool",
year: 2016,
mpaa_rating: "R",
runtime: 100,
critics_consensus: "",
release_dates: {
theater: "2016-02-12"
},
ratings: {
critics_rating: "Certified Fresh",
critics_score: 83,
audience_rating: "Upright",
audience_score: 94
},
},

{
id: "771315831",
title: "Kung Fu Panda 3",
year: 2016,
mpaa_rating: "PG",
runtime: 100,
critics_consensus: "",
release_dates: {
theater: "2016-01-29"
},
ratings: {
critics_rating: "Certified Fresh",
critics_score: 82,
audience_rating: "Upright",
audience_score: 85
},

},
{
id: "771375846",
title: "How To Be Single",
year: 2016,
mpaa_rating: "R",
runtime: 110,
critics_consensus: "",
release_dates: {
theater: "2016-02-12"
},
ratings: {
critics_rating: "Rotten",
critics_score: 47,
audience_rating: "Spilled",
audience_score: 58
},

},
];

function topMoviesCallback(data) {
	movies.forEach(function(movie, index) {
    movieID = movie.id
    console.log("This is my movie ID",movieID);
    //moviesRatingsUrl = baseUrl + '/movies/' + movieID+ '/reviews.json?apikey=' + apikey + '&page_limit=40';
    //console.log(moviesRatingsUrl);
        $.ajax({
					dataType: "jsonp",
          //url: baseUrl + '/movies/' + movieID+ '/reviews.json?apikey=' + apikey + '&page_limit=40',
					url: "https://api.rottentomatoes.com/api/public/v1.0/movies/771390242/reviews.json?apikey=sf8nr5cth5fgm3vdbf6fvtwa&page_limit=40",      
          success: function(data){
              $(".title0").html(data.reviews.freshness);
          }
      });
  });
}


function reviewsCallback(moviesRatingsUrl) {
	//console.log(moviesRatingsUrl);

}

$(document).ready(function() {
  // send off the query
  /*$.ajax({
		url: moviesSearchUrl + "&limit=3",
    dataType: "jsonp",
    success: reviewsCallback
  });*/

	topMoviesCallback();

 $.ajax({
  url: moviesRatingsUrl,
  dataType: "json",
  success: reviewsCallback + '&page_limit=40'
  });



});
