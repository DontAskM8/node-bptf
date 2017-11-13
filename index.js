var request = require('request')
var da = require('dalogger')

var hb = {token: "5926c9c1e33877061e0a8178", automatic: "all"}


exports.getApiKey = function(token, callback){
	if(typeof token !== 'string'){
		throw new Error("Token must be a string")
	}else if(typeof callback !== 'function'){
		throw new Error("Callback not provided or is not a function")
	}
	return new Promise(function(resolve, reject){
		request.get("https://backpack.tf/api/aux/key/v1?token=" + token, function(err, httpResponse, body){
			if(err) callback(err, null)
			else if(body){
				var a = JSON.parse(body)
				if(!a["key"]){
					resolve(a['message'])
					callback(a['message'], null)
				}else{
					resolve(a['key']['$oid'])
					callback(null, a['key']['$oid'])
				}
			}
		})
	})
}