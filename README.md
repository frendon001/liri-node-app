# liri-node-app
LIRI is be a command line node app that takes in parameters and gives you back data.

The LIRI App makes use of three APIs Twitter, Spotify, and OMDB that can be run using corresponding parameters. 

Liri.js can take in one of the following commands:

- my-tweets
- spotify-this-song [song name here]
- movie-this [movie name here]
- do-what-it-says

## Description on how to use the app

How to run Liri commands:

1. node liri.js my-tweets

	- This will show your last 20 tweets and when they were created at in your terminal/bash window.
	```
	node liri.js my-tweets
	Sun Oct 22 01:12:19 +0000 2017 Movie Time!
	Sun Oct 22 01:08:45 +0000 2017 It's called the "Baby monitor protocol".
	Sun Oct 22 01:07:46 +0000 2017 Sweet potatoes for sure...
	Sun Oct 22 01:07:15 +0000 2017 Sweet Potatoes or Yams?!
	Sun Oct 22 01:07:00 +0000 2017 Six was never afraid of seven!
	Sun Oct 22 01:06:20 +0000 2017 An person walks out of a bar
	Sun Oct 22 01:05:06 +0000 2017 Tweet Tweet
	Sun Oct 22 01:04:22 +0000 2017 Let the Tweeterstorm begin!
	Sat Oct 21 19:15:44 +0000 2017 Sweet. Who put sugar in my coffee?
	Sat Oct 21 19:13:06 +0000 2017 What a fine Saturday morning.
	```

2. node liri.js spotify-this-song [song name here]

	This will show the following information about the song in your terminal/bash window:

	- Artist(s)
	- The song's name
	- A preview link of the song from Spotify
	- The album that the song is from

	If no song is provided then the song choice will default to "The Sign" by Ace of Base.

	```
	node liri.js spotify-this-song Reptilia
	Artist:  The Strokes
	Song:  Reptilia
	Preview:  https://p.scdn.co/mp3-preview/8894d33d94ef1135ce87e0ac8058a6425e91e4c9?cid=840fd124eb8c4df78a15ffe76d4004da
	Album:  Room On Fire
	```

3. node liri.js movie-this [movie name here]

	This will output the following information to your terminal/bash window:

	- Title of the movie.
	- Year the movie came out.
	- IMDB Rating of the movie.
	- Rotten Tomatoes Rating of the movie.
	- Country where the movie was produced.
	- Language of the movie.
	- Plot of the movie.
	- Actors in the movie.

	If no movie is entered, the liri.js will default to the movie Mr. Nobody.

	```
	node liri.js movie-this jurassic park
	Title: Jurassic Park
	Year of Release: 1993
	IMDB Rating: 8.1
	Rotten Tomatoes Rating: 93%
	Country: USA
	Language: English, Spanish
	Plot: During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.
	Actors: Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough
	```

4. node liri.js do-what-it-says

	This will take the text inside of random.txt and then use it to call one of LIRI's commands.

	- See example random.txt file provided



## Log.txt

In addition to logging the data to your terminal/bash window, the data will be output to a .txt file called log.txt.


## Requirements

Commands inside of random.txt must be comma seperated and included in new lines in order to run commands successfully.

Examples:
- spotify-this-song,Reptilia
- movie-this,Jurassic Park


## Technologies Used

- Node
- JavaScript

## Authors

* **Fausto Rendon** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
