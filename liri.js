// TWITTER!!!!!!!!!!
var TwitterPackage = require('twitter')
var twitterKeys = require("./keys.js")
var nodeTwitter = process.argv[2]
var Twitter = new TwitterPackage(twitterKeys)
var params = {screen_name: 'JsonNode'}

if (nodeTwitter === "my-tweets") {
	Twitter.get('statuses/user_timeline', params, function(error, tweet, response) {
  	if (!error) {
  		for (var i = 0; i < tweet.length; i++)  {
  			if (i === 20) { break }
    		console.log("On " + tweet[i].created_at + " Json Node tweeted: " + tweet[i].text)
  		}
  	}
  	else {
  		console.log(error)
  	}
	})
}
else {
	console.log("Incorrect Search Request! Try Again!")
}
