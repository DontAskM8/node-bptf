# node-bptf

## Methods
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