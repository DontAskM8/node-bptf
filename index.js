const axios = require('axios')

var enums = require("./enums.js")

function bptf(params){	
	if(typeof params != "object"){
		throw new Error("Constructor parameters must be in object")
	}else if(!params["accessToken"] || !params["apiKey"]){
		throw new Error("You must provide both access token and api key")
	}
	
	this.apiKey = params["apiKey"] || ""
	this.accessToken = params["accessToken"] || ""
}

module.exports = bptf

bptf.prototype.getAccessToken = function(callback){
	axios.get(`https://backpack.tf/api/aux/token/v1?key=${this.apiKey}`)
	 .then(function(response){
		callback(null,response.data.token)
	 }).catch(function(err){
		callback(err.message)
	 })
}

bptf.prototype.sendHeartbeat = function(callback){
	axios.post(`https://backpack.tf/api/aux/heartbeat/v1`, {
		token: this.accessToken,
		automatic: "all"
	}).then(function(response){
		callback(null,response.data)
	}).catch(function(err){
		callback(err.message)
	})
}

bptf.prototype.refreshBptfInventory = function(steamID,callback){
	axios.get(`https://backpack.tf/_inventory/${steamID}?source=steam`)
	 .then(function(response){
		if(response.data.status.text == "Using fallback data"){
			callback("fallback")
		}
	 }).catch(function(err){
		 callback(err.message)
	 })
}

bptf.prototype.createListings = function(_listings,callback){
	if(Array.isArray(_listings) == false){
		callback("Listings must be an array")
		return
	}
	
	var listings = []
	
	for(itemObj of _listings){
		var temp = {
			intent: 0,
			item: {
				quality: "",
				item_name: "",
				craftable: ""
			},
			currencies: {
				keys: "",
				metal: ""
			},
			details: ""
		}
		temp.currencies = itemObj.price;
		temp.details = itemObj.details || "";
		if(itemObj.id != undefined){
			temp.intent = 1
			temp.id = itemObj.id
		}else{
			itemObj.craftable ? temp.item.craftable = itemObj.craftable : temp.item.craftable = "Craftable"
			if(itemObj.quality){
				var itemname = itemObj.itemname
				itemname.includes("The") ? itemname.replace("The", "") : itemname
				temp.item.quality = itemObj.quality
				temp.item.item_name = itemname
			}else{
				var itemname = itemObj.itemname
				var qualityTaken = 0
				itemname.includes("The") ? (itemname = itemname.replace("The", "").trim(), qualityTaken = 6) : (itemname, qualityTaken = 6)
				itemname.includes("Genuine") ? (itemname = itemname.replace("Genuine","").trim(), qualityTaken = 1) : itemname
				itemname.includes("Vintage") ? (itemname = itemname.replace("Vintage","").trim(), qualityTaken = 3) : itemname
				itemname.includes("Unusual") ? (itemname = itemname.replace("Unusual","").trim(), qualityTaken = 5) : itemname
				itemname.includes("Strange") ? (itemname = itemname.replace("Strange","").trim(), qualityTaken = 11) : itemname
				itemname.includes("Haunted") ? (itemname = itemname.replace("Haunted","").trim(), qualityTaken = 13) : itemname
				itemname.includes("Collector's") ? (itemname = itemname.replace("Collector's","").trim(), qualityTaken = 14) : itemname
				temp.item.quality = qualityTaken
				temp.item.item_name = itemname
			}
		}
		listings.push(temp)
	}
	
	axios.post("https://backpack.tf/api/classifieds/list/v1",{
		token: this.accessToken,
		'listings': listings
	})
	 .then(function(res){
		 var listingsResponse = res.data.listings
		 var simplifiedRes = {
			 success: [],
			 fails: []
		 }
		 for(item in listingsResponse){
			 if(listingsResponse[item].created){
				 simplifiedRes.success.push(item)
			 }else if(listingsResponse[item].error){
				 simplifiedRes.fails.push(item)
			 }
		 }
		 callback(null,listingsResponse,simplifiedRes)
	 })
	 .catch(function(err){
		 callback(err.message)
	 })
}

bptf.prototype.getOurListings = function(callback){
	axios.get(`https://backpack.tf/api/classifieds/listings/v1?token=${this.accessToken}`)
	 .then(function(res){
		 var ids = []
		 for(listingDetails of res.data.listings){
			 ids.push(listingDetails.id)
		 }
		 callback(null,ids)
	 })
	 .catch(function(err){
		 callback(err.message)
	 })
}

/*bptf.prototype.bumpListing = function(listingId,callback){
	axios.post(`https://backpack.tf/classifieds/bump/${listingId}`)
	 .then(function(res){
		 console.log(res)
	 })
	 .catch(function(err){
		 console.log(err.message)
	 })
}*/

bptf.prototype.deleteListings = function(listingIds,callback){
	if(Array.isArray(listingIds) == false){
		callback("Listing ids must be an array")
		return
	}
	axios.delete(`https://backpack.tf/api/classifieds/delete/v1?token=${this.accessToken}`, {
		data: {
			listing_ids: listingIds
		}
	})
	 .then(function(res){
		 callback(null,res.data)
	 })
	 .catch(function(err){
		 callback(err.message)
	 })
}