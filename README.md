# node-bptf

## Methods
### getApiKey(accessToken, callback)  
* Used to get api key using access token  
* Example   
```
  bptf.getApiKey("123456789", function(err, apiKey){
   if(err) console.log(err)
   else console.log(apiKey)
}) 

```
### getAccessToken(apiKey, callback)
* Used to get access token using apiKey
* Example  
```
  bptf.getAccessToken("123456789", function(err, accessToken){
    if(err) console.log(err)
    else console.log(accessToken)
  })
```
