var bptf = require('./bptfapi.js')

bptf.getApiKey("5926c9c1e33877061e0a8178", function(err, data){
	if(err) console.log(err)
		else console.log(data)
})