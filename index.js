var request = require('request')

/*	
	* Start of api auxiliary
	* https://backpack.tf/api/docs/auxiliary
*/
function getApiKey(accessToken, callback){
	if(typeof accessToken !== 'string'){
		throw new Error("Access token must be a string")
	}else if(typeof callback !== 'function'){
		throw new Error("Callback not provided or is not a function")
	}
	return new Promise(function(resolve, reject){
		request.get('https://backpack.tf/api/aux/key/v1?token=' + accessToken, function(err, httpResponse, body){
			if(err) callback(err, null)
			else if(body){
				var a = JSON.parse(body)
				if(!a["key"]){
					callback(a['message'], null)
				}else{
					callback(null, a['key']['$oid'])
				}
			}
		})
	})
}

function getAccessToken(apiKey, callback){
	if(typeof apiKey !== 'string'){
		throw new Error("ApiKey must be a string")
	}else if(typeof callback !== 'function'){
		throw new Error("Callback not provided or is not a function")
	}
	
	request.get('https://backpack.tf/api/aux/token/v1?' + apiKey, function(err, httpResponse, body){
		if(err) throw err
		else callback(null, accessToken)
	})
}

function sendHeartbeat(accessToken, callback){
	var hb = {token: accessToken, automatic: "all"}
	request.post({
		url: 'https://backpack.tf/api/aux/heartbeat/v1?token=',
		form: hb
	}, 
	function(err, httpResponse, body){
		if(err) throw new Error(err)
		else {
			var a = JSON.parse(body)
			if(a['message']){
				callback(a['message'], null)
			}else{
				callback(null, "Heartbeat sent to backpack.tf")
			}
		}
	})
}

exports.getAccessToken = getAccessToken
exports.getApiKey = getApiKey
exports.sendHeartbeat = sendHeartbeat

/* 
	*End of api auxiliary
*/








