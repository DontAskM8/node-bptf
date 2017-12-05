var request = require('request')
var da = require('dalogger')
require('util').inherits(bptf, require('events').EventEmitter);

var enums = require("./enums.js")

module.exports = bptf

function bptf(accessToken, apiKey){
	var self = this
	self.accessToken = accessToken
	self.apiKey = apiKey
}

bptf.prototype.getApiKey = function(callback){
	var self = this
	return new Promise(function(resolve, reject){
		request.get('https://backpack.tf/api/aux/key/v1?token=' + self.accessToken, function(err, httpResponse, body){
			if(err) callback(err, null)
			else if(body){
				var parsed = JSON.parse(body)
				if(!parsed["key"]){
					callback(parsed['message'], null)
				}else{
					callback(null, parsed['key']['$oid'])
					self.apiKey = parsed['key']['$oid']
				}
			}
		})
	})
}

bptf.prototype.getAccessToken = function(callback){
	var self = this
	
	request.get('https://backpack.tf/api/aux/token/v1?key=' + self.apiKey, function(err, httpResponse, body){
		if(err) throw err
		else if(body){
			var parsed = JSON.parse(body)
			if(parsed['token'] !== undefined){
				callback(null, parsed['token'])
				self.accessToken = parsed['token']
			}else{
				callback(parsed['message'], null)
			}
		}
	})
}

bptf.prototype.sendHeartbeat = function(type, callback){
	if(typeof type !== "string" && type !== undefined){
		throw new Error("Type must be a string")
	}else{
		var self = this
		
		var hb = {
			automatic: type
		}
		request.post({
			url: 'https://backpack.tf/api/aux/heartbeat/v1?token=' + self.accessToken,
			form: hb
		}, 
		function(err, httpResponse, body){
			if(err) throw new Error(err)
			else {
				var a = JSON.parse(body)
				if(a['message']){
					callback(a['message'])
				}
			}
		})
	}
}

bptf.prototype.createBuyListing = function(_listing, callback){
	if(typeof _listing !== "object"){
		callback("Listing MUST be in an Object")
	}else if(_listing["item"] == undefined){
		callback("Please provide a item's name")
	}else if(_listing["price"] === undefined || (_listing["price"].keys == undefined && _listing["price"].metal == undefined)){
		callback("Please provide the price of the item")
	}else{
		var listing = {
			"listings": [{
				"intent": 0,
				"item": {
					"quality": _listing["quality"] || "6",
					"item_name": _listing["item"],
					"craftable": _listing["craftable"] || "Craftable"
				},
				"currencies": {
					"keys": _listing["price"].keys.toString() || "0",
					"metal": _listing["price"].metals.toString() || "0"
				},
				"details": _listing["details"] || ""
			}]
		}
		var self = this
		request.post({
			url: "https://backpack.tf/api/classifieds/list/v1?token=" + self.accessToken,
			form: listing
		}, function(err, httpResponse, body){
			if(err) callback(err.message)
			else if(body){
				var parsed = JSON.parse(body)
				Object.keys(parsed["listings"]).forEach(function(itemName){
					if(parsed["listings"][itemName].error){
						callback(enums.createListingError[parsed["listings"][itemName].error])
					}else if(parsed["listings"][itemName].created){
						callback(null)
					}
				})
			}
		})
	}
}

bptf.prototype.createBuyListingByName = function(_listing, callback){
	if(typeof _listing !== "object"){
		callback("Listing MUST be in an Object")
	}else if(_listing["item"] == undefined){
		callback("Please provide a item's name")
	}else if(_listing["price"] === undefined || (_listing["price"].keys == undefined && _listing["price"].metal == undefined)){
		callback("Please provide the price of the item")
	}
	
	var itemName = _listing["item"].trim()
	var keys = _listing["price"]["keys"] || 0
	var metals = _listing["price"]["metals"] || 0
	var _craftable = _listing["craftable"].trim() || "Craftable"
	var details = _listing["details"] || ""
	
	var listing = []
	
	if(itemName.indexOf("Genuine") >= 0){
		var _itemName = itemName.replace("Genuine", "").trim()
		var __itemName = _itemName.replace("The", "").trim()
		listing.push({"intent": "0","item": {"quality": "1","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		listing.push({"intent": "0","item": {"quality": "1","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
	}else if(itemName.indexOf("Vintage") >= 0){
		var _itemName = itemName.replace("Vintage", "").trim()
		var __itemName = _itemName.replace("The", "").trim()
		listing.push({"intent": "0","item": {"quality": "3","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		listing.push({"intent": "0","item": {"quality": "3","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
	}else if(itemName.indexOf("Unusual") >= 0){
		var _itemName = itemName.replace("Unusual", "").trim()
		var __itemName = _itemName.replace("The", "").trim()
		listing.push({"intent": "0","item": {"quality": "5","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		listing.push({"intent": "0","item": {"quality": "5","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
	}else if(itemName.indexOf("Strange") >= 0){
		var _itemName = itemName.replace("Strange", "").trim()
		var __itemName = _itemName.replace("The", "").trim()
		listing.push({"intent": "0","item": {"quality": "11","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		listing.push({"intent": "0","item": {"quality": "11","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
	}else if(itemName.indexOf("Haunted") >= 0){
		var _itemName = itemName.replace("Haunted", "").trim()
		var __itemName = _itemName.replace("The", "").trim()
		listing.push({"intent": "0","item": {"quality": "13","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		listing.push({"intent": "0","item": {"quality": "13","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
	}else if(itemName.indexOf("Collector's") >= 0){
		var _itemName = itemName.replace("Collector's", "").trim()
		var __itemName = _itemName.replace("The", "").trim()
		listing.push({"intent": "0","item": {"quality": "14","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		listing.push({"intent": "0","item": {"quality": "14","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
	}else{
		var _itemName = itemName
		var __itemName = _itemName.replace("The", "").trim()
		listing.push({"intent": "0","item": {"quality": "1","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		listing.push({"intent": "0","item": {"quality": "1","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
	}
	
	var self = this
	
	request.post({
		url: "https://backpack.tf/api/classifieds/list/v1?token=",
		form: {
			"token": self.accessToken,
			"listings": listing
		}
	}, function(err, httpResponse, body){
		if(err) callback(err.message)
		else {
			var parsed = JSON.parse(body)
			Object.keys(parsed["listings"]).forEach(function(itemName){
				if(parsed["listings"][itemName].error){
					callback(enums.createListingError[parsed["listings"][itemName].error])
				}else if(parsed["listings"][itemName].created){
					callback(null)
				}
			})
		}
	})
}

bptf.prototype.createSellListing = function(_listing, callback){
	if(typeof _listing !== "object"){
		callback("Listing MUST be in an Object")
	}else if(_listing["item"] == undefined){
		callback("Please provide a item's name")
	}else if(_listing["price"] === undefined || (_listing["price"].keys == undefined && _listing["price"].metal == undefined)){
		callback("Please provide the price of the item")
	}else if(_listing["id"] === undefined){
		callback("You need an item's assetid to create a sell listing")
	}else{
		var listing = {
			"listings": [{
				"intent": 1,
				"id": _listing["id"],
				"item": {
					"quality": _listing["quality"] || "6",
					"item_name": _listing["item"],
					"craftable": _listing["craftable"] || "Craftable"
				},
				"currencies": {
					"keys": _listing["price"].keys.toString() || "0",
					"metal": _listing["price"].metals.toString() || "0"
				},
				"details": _listing["price"].details || ""
			}]
		}
		var self = this
		request.post({
			url: "https://backpack.tf/api/classifieds/list/v1?token=" + self.accessToken,
			form: listing
		}, function(err, httpResponse, body){
			if(err) callback(err.message)
			else if(body){
				var parsed = JSON.parse(body)
				Object.keys(parsed["listings"]).forEach(function(itemName){
					if(parsed["listings"][itemName].error){
						callback(enums.createListingError[parsed["listings"][itemName].error])
					}else if(parsed["listings"][itemName].created){
						callback(null)
					}
				})
			}
		})
	}
}

bptf.prototype.createSellListingByName = function(_listing, callback){
	if(typeof _listing !== "object"){
		callback("Listing MUST be in an Object")
	}else if(_listing["item"] == undefined){
		callback("Please provide a item's name")
	}else if(_listing["price"] === undefined || (_listing["price"].keys == undefined && _listing["price"].metal == undefined)){
		callback("Please provide the price of the item")
	}else if(_listing["id"] === undefined){
		callback("You need an item's assetid to create a sell listing")
	}else{
		var itemName = _listing["item"].trim()
		var keys = _listing["price"]["keys"] || 0
		var metals = _listing["price"]["metals"] || 0
		var _craftable = _listing["craftable"].trim() || "Craftable"
		var details = _listing["details"] || ""
		
		var listing = []
		
		if(itemName.indexOf("Genuine") >= 0){
			var _itemName = itemName.replace("Genuine", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","item": {"quality": "1","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","item": {"quality": "1","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else if(itemName.indexOf("Vintage") >= 0){
			var _itemName = itemName.replace("Vintage", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","item": {"quality": "3","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","item": {"quality": "3","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else if(itemName.indexOf("Unusual") >= 0){
			var _itemName = itemName.replace("Unusual", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","item": {"quality": "5","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","item": {"quality": "5","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else if(itemName.indexOf("Strange") >= 0){
			var _itemName = itemName.replace("Strange", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","item": {"quality": "11","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","item": {"quality": "11","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else if(itemName.indexOf("Haunted") >= 0){
			var _itemName = itemName.replace("Haunted", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","item": {"quality": "13","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","item": {"quality": "13","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else if(itemName.indexOf("Collector's") >= 0){
			var _itemName = itemName.replace("Collector's", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","item": {"quality": "14","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","item": {"quality": "14","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else{
			var _itemName = itemName
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","item": {"quality": "1","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","item": {"quality": "1","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}
		
		var self = this
		
		request.post({
			url: "https://backpack.tf/api/classifieds/list/v1?token=",
			form: {
				"token": self.accessToken,
				"listings": listing
			}
		}, function(err, httpResponse, body){
			if(err) callback(err.message)
			else {
				var parsed = JSON.parse(body)
				Object.keys(parsed["listings"]).forEach(function(itemName){
					if(parsed["listings"][itemName].error){
						callback(enums.createListingError[parsed["listings"][itemName].error])
					}else if(parsed["listings"][itemName].created){
						callback(null)
					}
				})
			}
		})
	}
}

bptf.prototype.deleteListings = function(arrayOfIds, callback){
	if(typeof arrayOfIds !== "object"){
		callback("Id must be in an array", null)
	}else{
		var data = JSON.stringify({"listing_ids": arrayOfIds});
		
		var self = this
		
		request.delete('https://backpack.tf/api/classifieds/delete/v1?token=' + self.accessToken,{
			headers : {"Content-Type": "application/json"},
			body : data
		},function(err,response,body){
			if(err){
				callback(err.message, null)
			}else{
				var parsed = JSON.parse(body)
				if(parsed["errors"].length > 0){
					var err = []
					parsed["errors"].forEach(function(item){
						err.push(item.message + " ID: " + item.listing_id)
					})
					callback(err, parsed["deleted"])
				}else{
					callback(null, "Deleted " + parsed["deleted"] + " listings.")
				}
			}
		})
	}
}

bptf.prototype.deleteAllListings = function(callback){
	var self = this
	
	var ids = []
	
	request.get("https://backpack.tf/api/classifieds/listings/v1?token=5926c9c1e33877061e0a8178", function(err, httpResponse, body){
		if(err) callback(err.message, null)
		else {
			var parsed = JSON.parse(body)
			parsed["listings"].forEach(function(item){
				ids.push(item.id)
			})
			
			var listing = JSON.stringify({"listing_ids": ids})
			
			request.delete('https://backpack.tf/api/classifieds/delete/v1?token=' + self.accessToken,{
				headers : {"Content-Type": "application/json"},
				body : listing
			}, function(err, httpResponse, body){
				if(err) callback(err.message, null)
				else {
					var parsed = JSON.parse(body)
					if(parsed["message"]){
						callback(parsed["message"], null)
					}else{
						console.log(parsed)
						callback(null, "Deleted " + parsed["deleted"] + " listings.")
					}
				}
			})
		}
	})
}