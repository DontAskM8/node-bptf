# node-bptf

### getAccessToken(callback)
* Used to get access token using apiKey.
* `callback` - Error or your access token
	* `err` - Error if error occured, null if none
	* `accessToken` - Access token if suceeded

### sendHeartbeat(callback)
* Used to get that lightning trade button on bptf.
* `callback` - Error and succeed
	* `err` - Error if error occured
	
### refreshBptfInventory(steamID,callback)
* Used to refresh the backpack of someone in backpack.tf  
* `steamID` - The steam 64 id of the target
	* `err` - Error if error occured/Backpack is in fallback

### createListings(listings, callback)
* Used to create buy & sell listing 
* `listings` - An array of `itemDetails`
	* `itemDetails`
		* `id`(don't have to include if you want to buy)
		* `itemname`(don't have to include if you want to sell)
		* `quality`(usually dont hve to specify as the quality is automatically determined from the name. Unless you want to use qualities like Strange Unusual )
		* `craftable`(Use Non-Craftable for uncraft item, or defaults to Craftable)
		* `price`
			* `keys`
			* `metal`
		* `details` (optional)
* `callback`
	* `err` - Reason of fail
	* `rawResponse` - Raw response from bptf
	* `simResponse` - A simplified response of the data with `market_hash_name` on success/failure (most probably wont since the listing is not created)

### deleteListings(listingIds, callback)
* Deletes listings on bptf
* `listingIds` - An array of ids ([use getOurListings](https://github.com/DontAskM8/node-bptf#getourlistingscallback))
* `callback` - Error or success
	* `err` - Error if error occured
	* `response` - Amount of listings you've deleted & errors
	
### getOurListings(callback)
* `err` - Error if occured
* `listingIds` - An array of your listing ids, both buy and sell