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
var baseImageUrl = "http://content8.flixster.com/movie/";
var newImageUrl;


function searchCallback(data) {
	//console.log("searchCallback is running");
	//console.log(data.movies);

	var movies = data.movies;



		movies.forEach(function(movie, index) {

			moviesRatingsUrl = baseUrl + '/movies/' + movie.id+ '/reviews.json?apikey=' + apikey + '&page_limit=40';

      //console.log(moviesRatingsUrl);
			$.ajax({
				url: moviesRatingsUrl = baseUrl + '/movies/' + movie.id+ '/reviews.json?apikey=' + apikey + '&page_limit=40',
				dataType: "jsonp",



			}).success(function(response){
				console.log(response.reviews);
				var freshness=0, rotten=0;
				response.reviews.forEach(function(review) {

		      //console.log("reviews for each is running");
		      //  freshness = review.freshness;

		          if(review.freshness == "fresh"){
		            freshness++;
		          }else {
		            rotten++;
		          }

		    });
				console.log("freshness: "+freshness+" rotten: "+rotten);
			//	console.log("Number of reviews: "+response.reviews);
			});
			var title = movie.title;
			var rating = movie.ratings.audience_score;
			var image = movie.posters.original;

			findQualityImage(image);
			//console.log(image);
			//console.log(data);
			$("#title" + index).html(title);
			$("#rating" + index).html(rating);
			$("#image" + index).html('<img src="' + newImageUrl + '">');

		});


}

function reviewsCallback(data1){




}

function findQualityImage(image1){

	var rawImgUrl = image1;
	console.log(rawImgUrl);
	if(rawImgUrl.indexOf("movie") > -1) {
			var splitUrl = rawImgUrl.split( '/' );
		 	var endUrl = splitUrl[7] + "/" + splitUrl[8] + "/" + splitUrl[9] + "/" + splitUrl[10];
		 	newImageUrl = baseImageUrl + endUrl;
	 }else{
		  newImageUrl = rawImgUrl;
	 }
	//newUrl = rawImgUrl.substr(0, 10);
	return newImageUrl;
	//console.log(newImageUrl);
}


$(document).ready(function() {
  // send off the query
  $.ajax({
		url: moviesSearchUrl + "&limit=3",
    dataType: "jsonp",
    success: searchCallback
  });

	//sliceString();

/*  $.ajax({
    url: moviesRatingsUrl,
    dataType: "jsonp",
    success: reviewsCallback
  });*/

});
