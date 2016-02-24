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


	var movies = data.movies;



		movies.forEach(function(movie, index) {

			moviesRatingsUrl = baseUrl + '/movies/' + movie.id+ '/reviews.json?apikey=' + apikey + '&page_limit=40';

      //console.log(moviesRatingsUrl);
			$.ajax({
				url: moviesRatingsUrl = baseUrl + '/movies/' + movie.id+ '/reviews.json?apikey=' + apikey + '&page_limit=40',
				dataType: "jsonp",



			}).success(function(response){
				console.log(response.reviews);
				var freshness=0, rotten=0, total=0;
				response.reviews.forEach(function(review) {



		          if(review.freshness == "fresh"){
		            freshness++;
		          }else {
		            rotten++;
		          }

		    });
				console.log("freshness: "+freshness+" rotten: "+rotten);
				total = freshness + rotten;
				console.log("Number of reviews: "+total);
				$("#freshness" + index).html("Fresh: "+freshness);
				$("#rotten" + index).html("Rotten: "+rotten);
				$("#total" + index).html("Total: "+total);
				//callback(freshness);
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
			//$("#freshness" + index).html(freshness);
			//console.log(freshness);

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
		url: moviesSearchUrl + "&limit=8",
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
