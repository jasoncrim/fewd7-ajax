var apikey = "sf8nr5cth5fgm3vdbf6fvtwa";
var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";

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
    moviesRatingsUrl = baseUrl + '/movies/' + movieID+ '/reviews.json?apikey=' + apikey + '&page_limit=40';
    console.log(moviesRatingsUrl);
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
    success: searchCallback
  });*/

	topMoviesCallback();

	var files = [
   'http://api.rottentomatoes.com/api/public/v1.0/movies/771390242/reviews.json?apikey=sf8nr5cth5fgm3vdbf6fvtwa&page_limit=40',
	  'http://api.rottentomatoes.com/api/public/v1.0/movies/771315831/reviews.json?apikey=sf8nr5cth5fgm3vdbf6fvtwa&page_limit=40',
		 'http://api.rottentomatoes.com/api/public/v1.0/movies/771375846/reviews.json?apikey=sf8nr5cth5fgm3vdbf6fvtwa&page_limit=40'
];
//response.addHeader("Access-Control-Allow-Origin", "*");

var results = [];
files.reduce(function(prev, cur, index) {
    return prev.then(function(data) {
        return $.ajax(cur).then(function(data) {
            console.log("step 1." + index);
            results.push(data);
        });
    })
}, $().promise()).done(function() {
    // last ajax call done
    // all results are in the results array
    console.log("step 2.0");
});

 /*$.ajax({
  url: moviesRatingsUrl,
  dataType: "jsonp",
  success: reviewsCallback + '&page_limit=40'
  });*/



});
