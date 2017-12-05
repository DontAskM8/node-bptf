var bptfApi = require('./index.js')

var bptf = new bptfApi("accessToken", "apiKey")

bptf.getApiKey(function(err, accessToken){
	if(err) console.log(err)
	else console.log(accessToken)
})

bptf.getAccessToken(function(err, apiKey){
	if(err) console.log(err)
	else console.log(apiKey)
})

bptf.sendHeartbeat("all", function(err){
	if(err) console.log(err)
	else console.log("Heartbeat sent to bptf")
})

bptf.createBuyListingByName({
	"name": " AWPer Hand",
	"price": {
		"keys": 0,
		"metals": 0.22
	},
	"craftable": "Craftable",
	"details": "Node module test"
}, function(err){
	if(err) console.log(err)
})

bptf.createBuyListing({
	"quality": "Unique",
	"item": "AWPer Hand",
	"craftable": "Non-Craftable",
	"price": {
		"keys": 0,
		"metal": 0.22
	}
}, function(err, response){
	if(err) console.log(err)
	else console.log(response)
})