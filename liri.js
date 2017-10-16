var twitterKeys = require("./keys.js")
var nodeTwitter = process.argv[2]

console.log(twitterKeys)


// client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
// 	if (error) {
//    console.log(error);
		
// 	}

// 	else if (nodeTwitter === "my-tweets") {
// 		console.log(tweets)
// 	}
// 	else {
// 		console.log("Something is up yo!")
// 	}
// });