# node-bptf

## Methods
### Constructor(accessToken, apiKey)
* `accessToken` - Your bptf access token
* `apiKey` - Your bptf api key

### getApiKey(callback)  
* Used to get api key using access token.
* `callback` -  Error or your api key
	* `err` - Error if error occured and null if none
	* `apiKey` - Api key if suceeded, null if error

### getAccessToken(callback)
* Used to get access token using apiKey.
* `callback` - Error or your access token
	* `err` - Error if error occured, null if none
	* `accessToken` - Access token if suceeded, null if error

### sendHeartbeat(type, callback)
* Used to get that lightning trade button on bptf.
* `type` - The type of heartbeat
	* `all` - Sets all your listing to lightning symbol
	* `sell` - Sets only your sell listing to lightning symbol
* `callback` - Error and succeed
	* `err` - Error if error occured, null if none
	* `respond` - Null if error
