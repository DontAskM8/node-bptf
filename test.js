var bptfApi = require('./index.js')

var bptf = new bptfApi({
	apiKey: "",
	accessToken: ""
})

/*bptf.sendHeartbeat(function(err){
	if(err){
		console.log(err)
	}
})

var listing = [
	{
		id: "8668674057",
		price: {
			metal: "6"
		}
	},{
		itemname: "Strange Unusual Taunt: Burstchester",
		price: {
			keys: "",
			metal: "3"
		}
	}
]

bptf.createListings(listing, function(err,rawRes,simRes){
	if(err){
		console.log(err)
	}else{
		console.log(rawRes)
		console.log(simRes)
	}
})

bptf.getOurListings(function(err,listingsIds){
	if(err){
		console.log(err)
	}else{
		console.log(listingsIds)
	}
})

bptf.deleteListings([], function(err,res){
	if(err){
		console.log(err)
	}else{
		console.log(res)
	}
})
*/

/*bptf.bumpListing('440_76561198600634094_02aec98aede5db16cf756622a6e45b54', function(err,res){
	
})*/