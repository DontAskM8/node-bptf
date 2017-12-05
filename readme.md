#node-bptf

### getApiKey(accessToken, callback)  
* Used to get api key using access token.
* `accessToken` - Your bptf's access token. (MUST be in string)
* `callback` -  Error or your api key
	* `err` - Error if error occured and null if none
	* `apiKey` - Api key if suceeded, null if error

### getAccessToken(apiKey, callback)
* Used to get access token using apiKey.
* `apikey` - Your bptf's api key. (MUST be in string)
* `callback` - Error or your access token
	* `err` - Error if error occured, null if none
	* `accessToken` - Access token if suceeded, null if error

### sendHeartbeat(accessToken, callback)
* Used to get that lightning trade button on bptf.
* `accessToken` - Your bptf's access token
* `callback` - Error and succeed
	* `err` - Error if error occured, null if none
	* `respond` - Null if error

### createBuyListing(listing, callback)
* Used to create a buy listing on bptf.
* `listing` - An object that contains the details of the item
	* `item` - Name of the item (based on backpack.tf) ***Required**
	* `quality` - Quality name (Case sensitive) or quality number ***Defaults to Unique if not set**
	* `craftable` - `Craftable` or `Non-Craftable` ONLY ***Defaults to Craftable if not set**
	* `price` - The price of the item
		* `keys` - Amount of keys ***0 if not set**
		* `metals` - Amount in Refined ***0 if not set**
	* `details` - What you want to say in the listing ***Optional**
* `callback` - Error
	* `err` - Error if error occured, null if success

### createBuyListingByName(listing, callback)
* Similar to [createBuyListing](https://github.com/xLeeJYx/node-bptf/wiki/Methods#createbuylistinglisting-callback) but uses `market_hash_name`
* `listing` - An object that contains the details of the item
	* `item` - Name of the item (market_hash_name) ***Required**
	* `craftable` - `Craftable` or `Non-Craftable` ONLY ***Defaults to Craftable if not set**
	* `price` - The price of the item
		* `keys` - Amount in keys ***0 if not set**
		* `metals` - Amount in Refined ***0 if not set**
	* `details` - What you want to say in the listing ***Optional**
* `callback` - Error
	* `err` - Error if error occured, null if success

### createSellListing(listing, callback)
* Used to create a buy listing on bptf.
* `listing` - An object that contains the details of the item
	* `item` - Name of the item (based on backpack.tf) ***Required**
	* `id` - Assetid of the item you are selling
	* `quality` - Quality name (Case sensitive) or quality number ***Defaults to Unique if not set**
	* `craftable` - `Craftable` or `Non-Craftable` ONLY ***Defaults to Craftable if not set**
	* `price` - The price of the item
		* `keys` - Amount of keys ***0 if not set**
		* `metals` - Amount in Refined ***0 if not set**
	* `details` - What you want to say in the listing ***Optional**
* `callback` - Error
	* `err` - Error if error occured, null if success

### createSellListingByName(listing, callback)
* Similar to [createBuyListing](https://github.com/xLeeJYx/node-bptf/wiki/Methods#createselllistinglisting-callback) but uses `market_hash_name`
* `listing` - An object that contains the details of the item
	* `item` - Name of the item (market_hash_name) ***Required**
	* `id` - Assetid of the item you are selling
	* `craftable` - `Craftable` or `Non-Craftable` ONLY ***Defaults to Craftable if not set**
	* `price` - The price of the item
		* `keys` - Amount in keys ***0 if not set**
		* `metals` - Amount in Refined ***0 if not set**
	* `details` - What you want to say in the listing ***Optional**
** `callback` - Error
	* `err` - Error if error occured, null if success
	
### deleteListings(ids, callback)
* Delete an array of listings on bptf
* `ids` - An array of ids ([can be get from here](https://backpack.tf/api/classifieds/listings/v1?token=))
* `callback` - Error or success
	* `err` - An array or error for the items you tried to delete
	* `response` - Amount of listings you've deleted

### deleteAllListings(callback)
* Deletes all your listings on bptf
* `callback` - Error or success
	* `err` - Error message (if have)
	* `response` - Amount of listings you've deleted
