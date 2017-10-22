var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var twitterKeys = require('./keys.js')[0];
var spotifyKeys = require('./keys.js')[1];
var client = new Twitter(twitterKeys);
var spotify = new Spotify(spotifyKeys);
var parameters = process.argv;
var liriCommand = parameters[2];
var liriParam = "";


if (parameters[2]) {

	//get additional paramter for Spotify and OMDB APIs
	if (liriParam[3]) {
		liriParam += parameters[3];
	}
	

	for (var i = 4; i < parameters.length; i++) {
		liriParam += " " + parameters[i];
	}


	liriCommand = liriCommand.toLowerCase();
	console.log(liriCommand);
	console.log(liriParam);
	switch (liriCommand) {
		case "my-tweets":
			//liriCommand matches my-tweets
			client.get('statuses/user_timeline', { screen_name: 'Gray_OnTime', count: 20 }, function(error, tweets, response) {
				if (error) throw error;

				//display the last 20 tweets 
				for (var tweet in tweets) {
					console.log(tweets[tweet].created_at, tweets[tweet].text);
					//console.log(tweets[tweet].text);

				}

			});
			break;
		case "spotify-this-song":
			//liriCommand matches spotify-this-song
			if (!liriParam) {
				//set default song if none is entered
				liriParam = "The Sign Ace of Base";
			}
			spotify
				.search({ type: 'track', query: liriParam })
				.then(function(response) {
					//console.log(response);
					if (response.tracks.items[0]) {
						//display track information if available
						console.log("Artist: ", response.tracks.items[0].artists[0].name);
						console.log("Song: ", response.tracks.items[0].name);
						console.log("Preview: ", response.tracks.items[0].preview_url);
						console.log("Album: ", response.tracks.items[0].album.name);
					} else {
						console.log("No results found. Try again.")
					}

				})
				.catch(function(err) {
					console.log(err);
				});
			break;
		case "movie-this":
			//liriCommand matches movie-this

			//build OMDB API URL
			requestLink = "http://www.omdbapi.com/?t=" + liriParam + "&y=&plot=short&apikey=40e9cece";

			if (liriParam) {
				console.log(requestLink);

				// Then run a request to the OMDB API with the movie specified
				request(requestLink, function(error, response, body) {

					// If the request is successful (i.e. if the response status code is 200)
					if (!error && response.statusCode === 200) {

						// Title of the movie.
						console.log("Title: " + JSON.parse(body).Title);
						// Year the movie came out.
						console.log("Year of Release: " + JSON.parse(body).Year);
						// IMDB Rating of the movie.
						console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
						// Rotten Tomatoes Rating of the movie.
						console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
						// Country where the movie was produced.
						console.log("Country: " + JSON.parse(body).Country);
						// Language of the movie.
						console.log("Language: " + JSON.parse(body).Language);
						// Plot of the movie.
						console.log("Plot: " + JSON.parse(body).Plot);
						// Actors in the movie.
						console.log("Actors: " + JSON.parse(body).Actors);
					}
				});

			} else {
				// Then run a request to the OMDB API with the movie specified
				request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {

					// If the request is successful (i.e. if the response status code is 200)
					if (!error && response.statusCode === 200) {

						// Title of the movie.
						console.log("Title: " + JSON.parse(body).Title);
						// Year the movie came out.
						console.log("Year of Release: " + JSON.parse(body).Year);
						// IMDB Rating of the movie.
						console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
						// Rotten Tomatoes Rating of the movie.
						console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
						// Country where the movie was produced.
						console.log("Country: " + JSON.parse(body).Country);
						// Language of the movie.
						console.log("Language: " + JSON.parse(body).Language);
						// Plot of the movie.
						console.log("Plot: " + JSON.parse(body).Plot);
						// Actors in the movie.
						console.log("Actors: " + JSON.parse(body).Actors);
					}
				});
			}
			break;
		case "do-what-it-says":
			//liriCommand matches do-what-it-says
			break;
		default:
			//liriCommand does not match the list of available commands
			console.log("Please enter a valid liri command from the list below:");
			console.log(" my-tweets\n", "spotify-this-song\n", "movie-this\n", "do-what-it-says\n");
			break;
	}

} else {
	console.log("Please enter a valid liri from the list below:");
	console.log(" my-tweets\n", "spotify-this-song\n", "movie-this\n", "do-what-it-says\n");
}

// // We then run the request module on a URL with a JSON
// request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {

//   // If there were no errors and the response code was 200 (i.e. the request was successful)...
//   if (!error && response.statusCode === 200) {

//     // Then we print out the imdbRating
//     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//   }
// });