var bptfApi = require('./index.js')

var bptf = new bptfApi("accesstoken", "apikey")

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