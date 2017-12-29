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
}

bptf.prototype.getAccessToken = function(callback){
	var self = this
	
	request.get('https://backpack.tf/api/aux/token/v1?key=' + self.apiKey, function(err, httpResponse, body){
		if(err) throw err
		else if(body){
			var parsed = JSON.parse(body)
			if(!parsed['token']){
				callback(parsed['message'], null)
			}else{
				callback(null, parsed['token'])
				self.accessToken = parsed['token']
			}
		}
	})
}

bptf.prototype.sendHeartbeat = function(callback){
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

bptf.prototype.refreshBackpacktfBp = function(steamID){
	if(typeof steamID !== "string" && typeof steamID !== "number" && typeof steamID == undefined){
		throw "Please provide the steamID of the target you are trying to refresh their backpack."
	}else{
		request.get("https://backpack.tf/profiles/" + steamID)
	}
}

bptf.prototype.createBuyListing = function(_listing, callback){
	if(typeof _listing !== "object"){
		callback("Listing MUST be in an Object")
	}else if(_listing["item"] == undefined){
		callback("Please provide a item's name")
	}else if(_listing["price"] === undefined || (_listing["price"].keys == undefined && _listing["price"].metals == undefined)){
		callback("Please provide the price of the item")
	}else{
		if(!_listing["craftable"]){
			_listing["craftable"] = "Craftable"
		}
		var listing = {
			"listings": [{
				"intent": 0,
				"item": {
					"quality": _listing["quality"] || "6",
					"item_name": _listing["item"],
					"craftable": _listing["craftable"] || "Craftable"
				},
				"currencies": {
					"keys": _listing["price"].keys || "0",
					"metal": _listing["price"].metals || "0"
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
				if(parsed["message"]){
					callback(parsed["message"])
				}else{
					Object.keys(parsed["listings"]).forEach(function(item){
						if(parsed["listings"][item].error){
							callback(enums.createListingError[parsed["listings"][item].error])
						}
					})
				}
			}
		})
	}
}

bptf.prototype.createBuyListings = function(_listing, callback){
	if(typeof callback !== "function"){
		throw new Error("You have to provide a callback")
	}else if(!Array.isArray(_listing)){
		callback("Listings MUST be in an Array")
	}else{
		var listing = []
		
		_listing.forEach(function(itemDetails){
			if(typeof itemDetails !== "object"){
				callback("You need an array of objects to do this")
			}else if(itemDetails.item == undefined){
				callback("Please provide item's name")
			}else if(itemDetails["price"] === undefined || (itemDetails["price"].keys == undefined && itemDetails["price"].metals == undefined)){
				callback("Please provide item's price")
			}else{
				listing.push({
					"intent": 0,
					"item": {
						"quality": itemDetails.quality || "6",
						"item_name": itemDetails.item,
						"craftable": itemDetails.craftable || "Craftable"
					},
					"currencies": {
						"keys": itemDetails.price.keys || "0",
						"metal": itemDetails.price.metals || "0"
					},
					"details": itemDetails.details || ""
				})
			}
		})
		var self = this
		var bunchOflisting = []
		for(i=0; i<listing.length; i+=100){
			bunchOflisting.push(listing.slice(i,i+100))
		}
		for(i in bunchOflisting){
			request.post({
				url: "https://backpack.tf/api/classifieds/list/v1?token=",
				form: {
					"token": self.accessToken,
					"listings": bunchOflisting[i]
				}
			}, function(err, httpResponse, body){
				if(err) callback(err.message)
				else {
					var parsed = JSON.parse(body)
					if(parsed["message"]){
						callback(parsed["message"])
					}else{
						Object.keys(parsed["listings"]).forEach(function(item){
							if(parsed["listings"][item].error){
								callback(enums.createListingError[parsed["listings"][item].error])
							}
						})
					}
				}
			})
		}
	}
}

bptf.prototype.createBuyListingByName = function(_listing, callback){
	if(typeof _listing !== "object"){
		callback("Listing MUST be in an Object")
	}else if(_listing["item"] == undefined){
		callback("Please provide a item's name")
	}else if(_listing["price"] === undefined || (_listing["price"].keys == undefined && _listing["price"].metals == undefined)){
		callback("Please provide the price of the item")
	}
	
	if(!_listing["craftable"]){
		_listing["craftable"] = "Craftable"
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
		listing.push({"intent": "0","item": {"quality": "6","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		listing.push({"intent": "0","item": {"quality": "6","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
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
			if(parsed["message"]){
				callback(parsed["message"])
			}else{
				Object.keys(parsed["listings"]).forEach(function(item){
					if(parsed["listings"][item].error){
						callback(enums.createListingError[parsed["listings"][item].error])
					}
				})
			}
		}
	})
}

bptf.prototype.createBuyListingsByName = function(_listing, callback){
	if(typeof callback !== "function"){
		throw new Error("You have to provide a callback")
	}else if(!Array.isArray(_listing)){
		callback("Listings MUST be in an Array")
	}else{
		var listing = []
		
		_listing.forEach(function(itemDetails){
			if(typeof itemDetails !== "object"){
				callback("You need an array of objects to do this")
			}else if(itemDetails.item == undefined){
				callback("Please provide item's name")
			}else if(itemDetails["price"] === undefined || (itemDetails["price"].keys == undefined && itemDetails["price"].metals == undefined)){
				callback("Please provide item's price")
			}else{
				if(!itemDetails["craftable"]){
					itemDetails["craftable"] = "Craftable"
				}
				
				var itemName = itemDetails["item"].trim()
				var _craftable = itemDetails["craftable"] || "Craftable"
				var keys = itemDetails["price"].keys || "0"
				var metals = itemDetails["price"].metals || "0" 
				var details = itemDetails["details"] || ""
				
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
					listing.push({"intent": "0","item": {"quality": "6","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
					listing.push({"intent": "0","item": {"quality": "6","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
				}
			}
		})
		var self = this
	
		var bunchOflisting = []
		for(i=0; i<listing.length; i+=100){
			bunchOflisting.push(listing.slice(i,i+100))
		}
		for(i in bunchOflisting){
			request.post({
				url: "https://backpack.tf/api/classifieds/list/v1?token=",
				form: {
					"token": self.accessToken,
					"listings": bunchOflisting[i]
				}
			}, function(err, httpResponse, body){
				if(err) callback(err.message)
				else {
					var parsed = JSON.parse(body)
					if(parsed["message"]){
						callback(parsed["message"])
					}else{
						Object.keys(parsed["listings"]).forEach(function(item){
							if(parsed["listings"][item].error){
								callback(enums.createListingError[parsed["listings"][item].error])
							}
						})
					}
				}
			})
		}
	}
}

bptf.prototype.createSellListing = function(_listing, callback){
	if(typeof _listing !== "object"){
		callback("Listing MUST be in an Object")
	}else if(_listing["item"] == undefined){
		callback("Please provide a item's name")
	}else if(_listing["price"] === undefined || (_listing["price"].keys == undefined && _listing["price"].metals == undefined)){
		callback("Please provide the price of the item")
	}else if(_listing["id"] === undefined){
		callback("You need an item's assetid to create a sell listing")
	}else{
		if(!_listing["craftable"]){
			_listing["craftable"] = "Craftable"
		}
		
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
					"keys": _listing["price"].keys || "0",
					"metal": _listing["price"].metals || "0"
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
				if(parsed["message"]){
					callback(parsed["message"])
				}else{
					if(parsed["message"]){
						callback(parsed["message"])
					}else{
						Object.keys(parsed["listings"]).forEach(function(item){
							if(parsed["listings"][item].error){
								callback(enums.createListingError[parsed["listings"][item].error])
							}
						})
					}
				}
			}
		})
	}
}

bptf.prototype.createSellListings = function(_listing, callback){
	if(typeof callback !== "function"){
		throw new Error("You have to provide a callback")
	}else if(!Array.isArray(_listing)){
		callback("Listings MUST be in an Array")
	}else{
		var listing = []
		
		_listing.forEach(function(itemDetails){
			if(typeof itemDetails !== "object"){
				callback("You need an array of objects to do this")
			}else if(itemDetails.item == undefined){
				callback("Please provide item's name")
			}else if(itemDetails["price"] === undefined || (itemDetails["price"].keys == undefined && itemDetails["price"].metals == undefined)){
				callback("Please provide item's price")
			}else{
				listing.push({
					"intent": 1,
					"item": {
						"quality": itemDetails.quality || "6",
						"item_name": itemDetails.item,
						"craftable": itemDetails.craftable || "Craftable"
					},
					"currencies": {
						"keys": itemDetails.price.keys || "0",
						"metal": itemDetails.price.metals || "0"
					},
					"details": itemDetails.details || ""
				})
			}
		})
		var self = this
		var bunchOflisting = []
		for(i=0; i<listing.length; i+=100){
			bunchOflisting.push(listing.slice(i,i+100))
		}
		for(i in bunchOflisting){
			request.post({
				url: "https://backpack.tf/api/classifieds/list/v1?token=",
				form: {
					"token": self.accessToken,
					"listings": bunchOflisting[i]
				}
			}, function(err, httpResponse, body){
				if(err) callback(err.message)
				else {
					var parsed = JSON.parse(body)
					if(parsed["message"]){
						callback(parsed["message"])
					}else{
						Object.keys(parsed["listings"]).forEach(function(item){
							if(parsed["listings"][item].error){
								callback(enums.createListingError[parsed["listings"][item].error])
							}
						})
					}
				}
			})
		}
	}
}

bptf.prototype.createSellListingByName = function(_listing, callback){
	if(typeof _listing !== "object"){
		callback("Listing MUST be in an Object")
	}else if(_listing["item"] == undefined){
		callback("Please provide a item's name")
	}else if(_listing["price"] === undefined || (_listing["price"].keys == undefined && _listing["price"].metals == undefined)){
		callback("Please provide the price of the item")
	}else if(_listing["id"] === undefined){
		callback("You need an item's assetid to create a sell listing")
	}else{
		if(!_listing["craftable"]){
			_listing["craftable"] = "Craftable"
		}
		
		var itemName = _listing["item"].trim()
		var keys = _listing["price"]["keys"] || 0
		var metals = _listing["price"]["metals"] || 0
		var _craftable = _listing["craftable"].trim() || "Craftable"
		var details = _listing["details"] || ""
		var assetid = _listing["id"]
		
		var listing = []
		if(itemName.indexOf("Genuine") >= 0){
			var _itemName = itemName.replace("Genuine", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","id": assetid,"item": {"quality": "1","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","id": assetid,"item": {"quality": "1","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else if(itemName.indexOf("Vintage") >= 0){
			var _itemName = itemName.replace("Vintage", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","id": assetid,"item": {"quality": "3","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","id": assetid,"item": {"quality": "3","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else if(itemName.indexOf("Unusual") >= 0){
			var _itemName = itemName.replace("Unusual", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","id": assetid,"item": {"quality": "5","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","id": assetid,"item": {"quality": "5","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else if(itemName.indexOf("Strange") >= 0){
			var _itemName = itemName.replace("Strange", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","id": assetid,"item": {"quality": "11","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","id": assetid,"item": {"quality": "11","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else if(itemName.indexOf("Haunted") >= 0){
			var _itemName = itemName.replace("Haunted", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","id": assetid,"item": {"quality": "13","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","id": assetid,"item": {"quality": "13","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else if(itemName.indexOf("Collector's") >= 0){
			var _itemName = itemName.replace("Collector's", "").trim()
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","id": assetid,"item": {"quality": "14","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","id": assetid,"item": {"quality": "14","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
		}else{
			var _itemName = itemName
			var __itemName = _itemName.replace("The", "").trim()
			listing.push({"intent": "1","id": assetid,"item": {"quality": "6","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
			listing.push({"intent": "1","id": assetid,"item": {"quality": "6","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
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
				if(parsed["message"]){
					callback(parsed["message"])
				}else{
					Object.keys(parsed["listings"]).forEach(function(item){
						if(parsed["listings"][item].error){
							callback(enums.createListingError[parsed["listings"][item].error])
						}
					})
				}
			}
		})
	}
}

bptf.prototype.createSellListingsByName = function(_listing, callback){
	if(typeof callback !== "function"){
		throw new Error("You have to provide a callback")
	}else if(!Array.isArray(_listing)){
		callback("Listings MUST be in an Array")
	}else{
		var listing = []
		
		_listing.forEach(function(itemDetails){
			if(typeof itemDetails !== "object"){
				callback("You need an array of objects to do this")
			}else if(itemDetails.item == undefined){
				callback("Please provide item's name")
			}else if(itemDetails["id"] === undefined){
				callback("You need an item's assetid to create a sell listing")
			}else if(itemDetails["price"] === undefined || (itemDetails["price"].keys == undefined && itemDetails["price"].metals == undefined)){
				callback("Please provide item's price")
			}else{
				if(!itemDetails["craftable"]){
					itemDetails["craftable"] = "Craftable"
				}
				
				var itemName = itemDetails["item"].trim()
				var _craftable = itemDetails["craftable"] || "Craftable"
				var keys = itemDetails["price"].keys || "0"
				var metals = itemDetails["price"].metals || "0" 
				var details = itemDetails["details"] || ""
				var assetid = itemDetails["id"]
				
				if(itemName.indexOf("Genuine") >= 0){
					var _itemName = itemName.replace("Genuine", "").trim()
					var __itemName = _itemName.replace("The", "").trim()
					listing.push({"intent": "1","id": assetid,"item": {"quality": "1","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
					listing.push({"intent": "1","id": assetid,"item": {"quality": "1","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
				}else if(itemName.indexOf("Vintage") >= 0){
					var _itemName = itemName.replace("Vintage", "").trim()
					var __itemName = _itemName.replace("The", "").trim()
					listing.push({"intent": "1","id": assetid,"item": {"quality": "3","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
					listing.push({"intent": "1","id": assetid,"item": {"quality": "3","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
				}else if(itemName.indexOf("Unusual") >= 0){
					var _itemName = itemName.replace("Unusual", "").trim()
					var __itemName = _itemName.replace("The", "").trim()
					listing.push({"intent": "1","id": assetid,"item": {"quality": "5","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
					listing.push({"intent": "1","id": assetid,"item": {"quality": "5","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
				}else if(itemName.indexOf("Strange") >= 0){
					var _itemName = itemName.replace("Strange", "").trim()
					var __itemName = _itemName.replace("The", "").trim()
					listing.push({"intent": "1","id": assetid,"item": {"quality": "11","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
					listing.push({"intent": "1","id": assetid,"item": {"quality": "11","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
				}else if(itemName.indexOf("Haunted") >= 0){
					var _itemName = itemName.replace("Haunted", "").trim()
					var __itemName = _itemName.replace("The", "").trim()
					listing.push({"intent": "1","id": assetid,"item": {"quality": "13","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
					listing.push({"intent": "1","id": assetid,"item": {"quality": "13","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
				}else if(itemName.indexOf("Collector's") >= 0){
					var _itemName = itemName.replace("Collector's", "").trim()
					var __itemName = _itemName.replace("The", "").trim()
					listing.push({"intent": "1","id": assetid,"item": {"quality": "14","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
					listing.push({"intent": "1","id": assetid,"item": {"quality": "14","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
				}else{
					var _itemName = itemName
					var __itemName = _itemName.replace("The", "").trim()
					listing.push({"intent": "1","id": assetid,"item": {"quality": "6","item_name": _itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
					listing.push({"intent": "1","id": assetid,"item": {"quality": "6","item_name": __itemName,"craftable": _craftable},"currencies": {"keys": keys,"metal": metals},"details": details})
				}
			}
		})
		var self = this
	
		var bunchOflisting = []
		for(i=0; i<listing.length; i+=100){
			bunchOflisting.push(listing.slice(i,i+100))
		}
		for(i in bunchOflisting){
			request.post({
				url: "https://backpack.tf/api/classifieds/list/v1?token=",
				form: {
					"token": self.accessToken,
					"listings": bunchOflisting[i]
				}
			}, function(err, httpResponse, body){
				if(err) callback(err.message)
				else {
					var parsed = JSON.parse(body)
					if(parsed["message"]){
						callback(parsed["message"])
					}else{
						Object.keys(parsed["listings"]).forEach(function(item){
							if(parsed["listings"][item].error){
								callback(enums.createListingError[parsed["listings"][item].error])
							}
						})
					}
				}
			})
		}
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
	
	request.get("https://backpack.tf/api/classifieds/listings/v1?token=" + self.accessToken, function(err, httpResponse, body){
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
						callback(null, "Deleted " + parsed["deleted"] + " listings.")
					}
				}
			})
		}
	})
}