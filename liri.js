var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var twitterKeys = require('./keys.js')[0];
var spotifyKeys = require('./keys.js')[1];
var client = new Twitter(twitterKeys);
var spotify = new Spotify(spotifyKeys);
var parameters = process.argv;
var liriCommand = parameters[2];
var liriParam = "";

//check if command was entered
if (liriCommand) {

	//get additional paramter for Spotify and OMDB APIs
	if (parameters[3]) {
		liriParam += parameters[3];
	}

	//create append additional paramaters entered
	for (var i = 4; i < parameters.length; i++) {
		liriParam += " " + parameters[i];
	}

	//make lowercase
	liriCommand = liriCommand.toLowerCase();

	if (liriCommand !== "do-what-it-says") {
		//command did not match do-what-it-says
		runLiriCommand(liriCommand, liriParam);

	} else {
		//liriCommand matches do-what-it-says
		writeToLog(liriCommand + "\n");
		fs.readFile("random.txt", "utf8", function(error, data) {
			// If the code experiences any errors it will log the error to the console.
			if (error) {
				writeToLog(error);
				return console.log(error);
			} else {

				// Then split it by commas (to make it more readable)
				var dataArr = data.split("\n");
				var action = [];

				//loop through file commands
				for (var i = 0; i < dataArr.length; i++) {

					action = dataArr[i].split(",");
					//execute action specified in file
					if (action.length === 1) {
						runLiriCommand(action[0]);
					} else {
						runLiriCommand(action[0], action[1]);
					}
				}
			}
		});
	}

} else {
	//No command was provided
	console.log("Please enter a liri command from the list below:");
	console.log(" my-tweets\n", "spotify-this-song\n", "movie-this\n", "do-what-it-says\n");
}


function runLiriCommand(command, param) {
//run different liri command options
	switch (command) {
		case "my-tweets":
			//add command to log.txt
			writeToLog(command + "\n");
			//liriCommand matches my-tweets
			client.get('statuses/user_timeline', { screen_name: 'Gray_OnTime', count: 20 }, function(error, tweets, response) {
				if (error) {
					console.log(error);
					writeToLog(error);
				};

				//display the last 20 tweets 
				for (var tweet in tweets) {
					console.log(tweets[tweet].created_at, tweets[tweet].text);
					writeToLog(tweets[tweet].created_at + " " + tweets[tweet].text + "\n");
				}

				writeToLog("****************" + "\n");
			});
			break;
		case "spotify-this-song":

			//liriCommand matches spotify-this-song
			if (!param) {
				//set default song if none is entered
				param = "The Sign Ace of Base";
				//add command to log.txt
				writeToLog(command + "\n");
			} else {
				//add command to log.txt
				writeToLog(command + " " + param + "\n");
			}
			spotify
				.search({ type: 'track', query: param })
				.then(function(response) {
					//console.log(response);
					if (response.tracks.items[0]) {
						//display track information if available
						console.log("Artist: ", response.tracks.items[0].artists[0].name);
						console.log("Song: ", response.tracks.items[0].name);
						console.log("Preview: ", response.tracks.items[0].preview_url);
						console.log("Album: ", response.tracks.items[0].album.name);

						writeToLog("Artist: " + response.tracks.items[0].artists[0].name + "\n" +
							"Song: " + response.tracks.items[0].name + "\n" +
							"Preview: " + response.tracks.items[0].preview_url + "\n" +
							"Album: " + response.tracks.items[0].album.name + "\n" +
							"****************" + "\n"
						);
					} else {
						console.log("No results found. Try again.")
						writeToLog("No results found. Try again.");
					}
				})
				.catch(function(err) {
					console.log(err);
					riteToLog(err);
				});
			break;
		case "movie-this":
			//liriCommand matches movie-this

			//build OMDB API URL
			requestLink = "http://www.omdbapi.com/?t=" + param + "&y=&plot=short&apikey=40e9cece";

			if (param) {
				//add command to log.txt
				writeToLog(command + " " + param + "\n");
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

						writeToLog("Title: " + JSON.parse(body).Title + "\n" +
							"Year of Release: " + JSON.parse(body).Year + "\n" +
							"IMDB Rating: " + JSON.parse(body).imdbRating + "\n" +
							JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value + "\n" +
							"Language: " + JSON.parse(body).Language + "\n" +
							"Plot: " + JSON.parse(body).Plot + "\n" +
							"Actors: " + JSON.parse(body).Actors + "\n" +
							"****************" + "\n"
						);
					}
				});
			} else {
				//add command to log.txt
				writeToLog(command + "\n");
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

						writeToLog("Title: " + JSON.parse(body).Title + "\n" +
							"Year of Release: " + JSON.parse(body).Year + "\n" +
							"IMDB Rating: " + JSON.parse(body).imdbRating + "\n" +
							JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value + "\n" +
							"Language: " + JSON.parse(body).Language + "\n" +
							"Plot: " + JSON.parse(body).Plot + "\n" +
							"Actors: " + JSON.parse(body).Actors + "\n" +
							"****************" + "\n"
						);
					}
				});
			}
			break;
		default:
			//liriCommand does not match the list of available commands
			console.log("Please enter a valid liri command from the list below:");
			console.log(" my-tweets\n", "spotify-this-song\n", "movie-this\n", "do-what-it-says\n");
			break;
	}
};

function writeToLog(content) {
	fs.appendFile("log.txt", content, function(err) {
		// If an error was experienced we say it.
		if (err) {
			console.log(err);
		} else {
			//content was added to log.txt
		}
	});

};