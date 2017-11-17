var request = require('request')
var da = require('dalogger')
require('util').inherits(bptf, require('events').EventEmitter);

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