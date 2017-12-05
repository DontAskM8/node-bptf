var bptfApi = require('./index.js')
var da = require('dalogger')

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
	"item": " AWPer Hand",
	"price": {
		"keys": 0,
		"metals": 0.22
	},
	"craftable": "Craftable",
	"details": "Node module test"
}, function(err){
	if(err) da.error(err)
})

bptf.createBuyListing({
	"quality": "Unique",
	"item": "AWPer Hand",
	"craftable": "Non-Craftable",
	"price": {
		"keys": 0,
		"metals": 0.22
	}
}, function(err, response){
	if(err) console.log(err)
})

bptf.createSellListing({
	"item": "Class Token - Scout",
	"id": "68468484"
	"craftable": "Craftable",
	"price": {
		"keys": 0,
		"metals": 0.33
	}
}, function(err){
	if(err) console.log(err)
})

bptf.createSellListingByName({
	"item": "Class Token - Scout",
	"id": "68468484"
	"craftable": "Craftable",
	"price": {
		"keys": 0,
		"metals": 0.33
	}
}, function(err){
	if(err) console.log(err)
})