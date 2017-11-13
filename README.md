# node-bptf

## Methods
### getApiKey(accessToken, callback)  
* Used to get api key using access token  
* `accessToken` - Your bptf's access token. (MUST be in string)
* `callback` -  Error or your api key
  * `err` - Error if error occured and null if no error
  * `apiKey` - Api key if suceeded, null if error

### getAccessToken(apiKey, callback)
* Used to get access token using apiKey  
* `apikey` - You bptf's api key. (MUST be in string)
* `callback` - Error or your access token
  * `err` - Error is error occured, null if no error
  * `accessToken` - Access token if suceeded, null if error
