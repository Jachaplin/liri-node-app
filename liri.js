// --------- VARIABLES -----------

var action = process.argv[2];
var value = process.argv[3]

// TWITTER!!!!!!!!!!
var TwitterPackage = require('twitter')
var twitterKeys = require("./keys.js")
var Twitter = new TwitterPackage(twitterKeys)
var params = {screen_name: 'JsonNode'}

// SPOTIFY!!!!!!!
var Spotify = require('node-spotify-api')
var spotify = new Spotify({
  id: "abba63a794594bf0ac5da6c43ea26ce6",
  secret: "d5285879484b4883bc9b6403e8327e5e"
})

// OMDB!!!!!!!
var request = require("request")

// RANDOM!!!!!!!
var fs = require('fs')

// --------- CONDITIONS -----------

  // Twitter
	if (action === "my-tweets") {
		myTweets()
	}
	// Spotify
	else if (action === "spotify-this-song") {
		spotifySong()
   }
  // OMD
  else if (action === "movie-this") {
  	ombd()
  }
  // random
  else if (action === "do-what-it-says") {
  	random()
  }
  // User Error
	else {
		console.log("Incorrect Search Request! Try Again!")
	}

// --------- FUNCTIONS -----------

  // Twitter
  function myTweets() {
		Twitter.get('statuses/user_timeline', params, function(error, tweet, response) {
	  	if (!error) {
	  		for (var i = 0; i < tweet.length; i++)  {
	  			if (i === 20) { break }
	    		console.log("\n" + "On " + tweet[i].created_at + " Json Node tweeted: " + tweet[i].text + "\n")
	  		}
	  	}
	  	else {
	  		console.log(error)
	  	}
		})
  }
  // Spotify
  function spotifySong(value) {
    if (value == null) {
        value = 'The Sign by Ace of Base'
    }
		spotify.search({ type: 'track', query: value }, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}
	  	else {
				console.log("\n" + "Artist: " + data.tracks.items[0].artists[0].name + "\n")
				console.log("Song: " + data.tracks.items[0].name + "\n")
				console.log("Preview Link: " + data.tracks.items[0].preview_url + "\n")
				console.log("Album: " + data.tracks.items[0].album.name + "\n")
	  	}
		})
  }
  // OMDB
  function ombd(value) {
  	if (value == null) {
        console.log("\n" + "If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/" + "\n" + "It's on Netflix!")
    }
    else {

		request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
  		if (!error && response.statusCode === 200) {
  			var jsonBody = JSON.parse(body)

  			console.log("\n" + "The movie's title is: " + jsonBody.Title)
  			console.log("\n" + "The movie's release year: " + jsonBody.Year)
    		console.log("\n" + "The movie's IMBD rating is: " + jsonBody.imdbRating)
    		console.log("\n" + "The movie's Rotten Tomato's rating is: " + jsonBody.Ratings[1].Value)
    		console.log("\n" + "The movie's country orgin is: " + jsonBody.Country)
    		console.log("\n" + "The movie's language is: " + jsonBody.Language)
    		console.log("\n" + "The movie's plot is: " + jsonBody.Plot)
    		console.log("\n" + "The movie's actors are: " + jsonBody.Actors + "\n")
  		}
		})
   }
  }
  // RANDOM
  function random() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
        	console.log(data)
            var dataArr = data.split(',');
            if (dataArr[0] === "spotify-this-song") {
                spotifySong(dataArr[1]);
            }
            if (dataArr[0] === "movie-this") {
                ombd(dataArr[1]);
            }
        }
    });
}
