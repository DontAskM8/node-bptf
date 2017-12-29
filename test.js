var bptfApi = require('./index.js')
var da = require('dalogger')

var bptf = new bptfApi("accessToken", "apiKey")

/*bptf.getApiKey(function(err, accessToken){
	if(err) console.log(err)
	else console.log(accessToken)
})

bptf.getAccessToken(function(err, apiKey){
	if(err) console.log(err)
	else console.log(apiKey)
})

bptf.sendHeartbeat("all", function(err){
	if(err) console.log(err)
	else console.log("Heartbeat sent to bptf")
})

bptf.createBuyListingByName({
	"item": " AWPer Hand",
	"price": {
		"keys": 0,
		"metals": 0.22
	},
	"craftable": "Craftable",
	"details": "Node module test"
}, function(err){
	if(err) da.error(err)
})

bptf.createBuyListing({
	"quality": "Unique",
	"item": "AWPer Hand",
	"craftable": "Non-Craftable",
	"price": {
		"keys": 0,
		"metals": 0.22
	}
}, function(err, response){
	if(err) console.log(err)
})

bptf.createSellListing({
	"item": "Class Token - Scout",
	"id": "68468484"
	"craftable": "Craftable",
	"price": {
		"keys": 0,
		"metals": 0.33
	}
}, function(err){
	if(err) console.log(err)
})

bptf.createSellListingByName({
	"item": "Class Token - Scout",
	"id": "68468484"
	"craftable": "Craftable",
	"price": {
		"keys": 0,
		"metals": 0.33
	}
}, function(err){
	if(err) console.log(err)
})

bptf.createBuyListingsByName([
	{
		"item": "AWPer Hand",
		"price": {
			"metals": "0.22"
		}
	},
	{
		"item": "Genuine AWPer Hand",
		"price": {
			"metals": "0.22"
		}
	}
], function(err){
	if(err) console.log(err)
})*/

bptf.createBuyListingsByName([
	{
		"item": "Mann Co. Supply Crate Key",
		"craftable": "Craftable",
		"price": {
			"metals": "35.11"
		},
		"details": " Limit: 5"
	},
	{
		"item": "Description Tag",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Flapjack",
		"craftable": "Craftable",
		"price": {
			"metals": "4.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Genuine Blind Justice",
		"craftable": "Craftable",
		"price": {
			"metals": "3.00"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The Brainiac Hairpiece",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Lord Cockswain's Novelty Mutton Chops and Pipe",
		"craftable": "Craftable",
		"price": {
			"metals": "2.55"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Graybanns",
		"craftable": "Craftable",
		"price": {
			"metals": "6.44"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Marxman",
		"craftable": "Craftable",
		"price": {
			"metals": "1.44"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Big Chief",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Brotherhood of Arms",
		"craftable": "Craftable",
		"price": {
			"metals": "8.00"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Connoisseur's Cap",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Desert Marauder",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Dragonborn Helmet",
		"craftable": "Craftable",
		"price": {
			"metals": "1.11"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Hong Kong Cone",
		"craftable": "Craftable",
		"price": {
			"metals": "5.66"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Cotton Head",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "A Rather Festive Tree",
		"craftable": "Craftable",
		"price": {
			"metals": "2.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Hero's Hachimaki",
		"craftable": "Craftable",
		"price": {
			"metals": "1.66"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Honcho's Headgear",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Prehistoric Pullover",
		"craftable": "Craftable",
		"price": {
			"metals": "11.11"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Airdog",
		"craftable": "Craftable",
		"price": {
			"metals": "2.77"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Modest Pile of Hat",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Liquidator's Lid",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Respectless Rubber Glove",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The Little Buddy",
		"craftable": "Craftable",
		"price": {
			"metals": "1.11"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Reggaelator",
		"craftable": "Craftable",
		"price": {
			"metals": "1.44"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Tipped Lid",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Stainless Pot",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Chieftain's Challenge",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Warhood",
		"craftable": "Craftable",
		"price": {
			"metals": "3.77"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Backbiter's Billycock",
		"craftable": "Craftable",
		"price": {
			"metals": "1.11"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Hat of Cards",
		"craftable": "Craftable",
		"price": {
			"metals": "2.55"
		},
		"details": " Limit: 2"
	},
	{
		"item": "L'Inspecteur",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Familiar Fez",
		"craftable": "Craftable",
		"price": {
			"metals": "2.66"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Milkman",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Point and Shoot",
		"craftable": "Craftable",
		"price": {
			"metals": "9.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The El Jefe",
		"craftable": "Craftable",
		"price": {
			"metals": "1.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Brown Bomber",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Genuine Brimstone",
		"craftable": "Craftable",
		"price": {
			"metals": "2.55"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Brimstone",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Tour of Duty Ticket",
		"craftable": "Craftable",
		"price": {
			"metals": "16.22"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The Frickin' Sweet Ninja Hood",
		"craftable": "Craftable",
		"price": {
			"metals": "1.77"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Southie Shinobi",
		"craftable": "Craftable",
		"price": {
			"metals": "1.88"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Red Socks",
		"craftable": "Craftable",
		"price": {
			"metals": "1.44"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The Shellmet",
		"craftable": "Craftable",
		"price": {
			"metals": "5.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The War Pig",
		"craftable": "Craftable",
		"price": {
			"metals": "3.88"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The Noh Mercy",
		"craftable": "Craftable",
		"price": {
			"metals": "7.77"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Antarctic Parka",
		"craftable": "Craftable",
		"price": {
			"metals": "11.33"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Lumbricus Lid",
		"craftable": "Craftable",
		"price": {
			"metals": "6.00"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The Exorcizor",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Delinquent's Down Vest",
		"craftable": "Craftable",
		"price": {
			"metals": "2.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Buck Turner All-Stars",
		"craftable": "Craftable",
		"price": {
			"metals": "12.77"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Merc's Muffler",
		"craftable": "Craftable",
		"price": {
			"metals": "4.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Dead of Night",
		"craftable": "Craftable",
		"price": {
			"metals": "19.88"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Fancy Dress Uniform",
		"craftable": "Craftable",
		"price": {
			"metals": "1.55"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Nuke",
		"craftable": "Craftable",
		"price": {
			"metals": "4.77"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Bonk Boy",
		"craftable": "Craftable",
		"price": {
			"metals": "2.44"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Anger",
		"craftable": "Craftable",
		"price": {
			"metals": "5.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Danger",
		"craftable": "Craftable",
		"price": {
			"metals": "1.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Team Captain",
		"craftable": "Craftable",
		"price": {
			"metals": "6.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The All-Father",
		"craftable": "Craftable",
		"price": {
			"metals": "11.33"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Charmer's Chapeau",
		"craftable": "Craftable",
		"price": {
			"metals": "5.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Winter Backup",
		"craftable": "Craftable",
		"price": {
			"metals": "4.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Cold Killer",
		"craftable": "Craftable",
		"price": {
			"metals": "3.11"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Bomb Beanie",
		"craftable": "Craftable",
		"price": {
			"metals": "4.77"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Genuine Dadliest Catch",
		"craftable": "Craftable",
		"price": {
			"metals": "2.77"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Genuine Ham Shank",
		"craftable": "Craftable",
		"price": {
			"metals": "3.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Genuine King of Scotland Cape",
		"craftable": "Craftable",
		"price": {
			"metals": "3.88"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Pip-Boy",
		"craftable": "Craftable",
		"price": {
			"metals": "3.00"
		},
		"details": " Limit: 2"
	},
	{
		"item": "A Well Wrapped Hat",
		"craftable": "Craftable",
		"price": {
			"metals": "9.11"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Pyromancer's Mask",
		"craftable": "Craftable",
		"price": {
			"metals": "5.44"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The Balloonicorn",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Strange Rocket Launcher",
		"craftable": "Craftable",
		"price": {
			"metals": "8.44"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Strange Flame Thrower",
		"craftable": "Craftable",
		"price": {
			"metals": "3.00"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Outta' Sight",
		"craftable": "Craftable",
		"price": {
			"metals": "6.00"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Strange Knife",
		"craftable": "Craftable",
		"price": {
			"metals": "5.22"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Strange Shotgun",
		"craftable": "Craftable",
		"price": {
			"metals": "9.66"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Strange Flare Gun",
		"craftable": "Craftable",
		"price": {
			"metals": "9.44"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Strange Medi Gun",
		"craftable": "Craftable",
		"price": {
			"metals": "3.11"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Strange Minigun",
		"craftable": "Craftable",
		"price": {
			"metals": "12.44"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Strange Scattergun",
		"craftable": "Craftable",
		"price": {
			"metals": "7.88"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Strange Bat",
		"craftable": "Craftable",
		"price": {
			"metals": "3.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Strange Bottle",
		"craftable": "Craftable",
		"price": {
			"metals": "3.00"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Strange Stickybomb Launcher",
		"craftable": "Craftable",
		"price": {
			"metals": "2.77"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Strange Grenade Launcher",
		"craftable": "Craftable",
		"price": {
			"metals": "4.55"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Strange Sniper Rifle",
		"craftable": "Craftable",
		"price": {
			"metals": "7.33"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Strange Pistol",
		"craftable": "Craftable",
		"price": {
			"metals": "2.88"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Strange Revolver",
		"craftable": "Craftable",
		"price": {
			"metals": "2.88"
		},
		"details": " Limit: 2"
	},
	{
		"item": "That '70s Chapeau",
		"craftable": "Craftable",
		"price": {
			"metals": "2.88"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Exquisite Rack",
		"craftable": "Craftable",
		"price": {
			"metals": "4.11"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Patriot Peak",
		"craftable": "Craftable",
		"price": {
			"metals": "13.77"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The Gold Digger",
		"craftable": "Craftable",
		"price": {
			"metals": "3.77"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Macho Mann",
		"craftable": "Craftable",
		"price": {
			"metals": "4.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Lady Killer",
		"craftable": "Craftable",
		"price": {
			"metals": "25.44"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The Level Three Chin",
		"craftable": "Craftable",
		"price": {
			"metals": "6.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Dogfighter",
		"craftable": "Craftable",
		"price": {
			"metals": "5.66"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Pyro's Beanie",
		"craftable": "Craftable",
		"price": {
			"metals": "9.00"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Face Full of Festive",
		"craftable": "Craftable",
		"price": {
			"metals": "3.11"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Sergeant's Drill Hat",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Front Runner",
		"craftable": "Craftable",
		"price": {
			"metals": "1.44"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Reader's Choice",
		"craftable": "Craftable",
		"price": {
			"metals": "2.77"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Salty Dog",
		"craftable": "Craftable",
		"price": {
			"metals": "1.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Apparition's Aspect",
		"craftable": "Craftable",
		"price": {
			"metals": "3.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Gift Wrap",
		"craftable": "Craftable",
		"price": {
			"metals": "7.00"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Brigade Helm",
		"craftable": "Craftable",
		"price": {
			"metals": "2.66"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Soldier's Stogie",
		"craftable": "Craftable",
		"price": {
			"metals": "1.77"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Safe'n'Sound",
		"craftable": "Craftable",
		"price": {
			"metals": "1.44"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Vintage Foster's Facade",
		"craftable": "Craftable",
		"price": {
			"metals": "2.88"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Genuine Wilson Weave",
		"craftable": "Craftable",
		"price": {
			"metals": "2.88"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The HazMat Headcase",
		"craftable": "Craftable",
		"price": {
			"metals": "1.44"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Stereoscopic Shades",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Sneaky Spats of Sneaking",
		"craftable": "Craftable",
		"price": {
			"metals": "1.44"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Le Party Phantom",
		"craftable": "Craftable",
		"price": {
			"metals": "1.55"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Private Eye",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Frenchman's Beret",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Frenchman's Formals",
		"craftable": "Craftable",
		"price": {
			"metals": "1.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Bruiser's Bandanna",
		"craftable": "Craftable",
		"price": {
			"metals": "17.11"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Vintage Camera Beard",
		"craftable": "Craftable",
		"price": {
			"metals": "3.55"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Crone's Dome",
		"craftable": "Craftable",
		"price": {
			"metals": "2.88"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Insulated Inventor",
		"craftable": "Craftable",
		"price": {
			"metals": "7.66"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Fortunate Son",
		"craftable": "Craftable",
		"price": {
			"metals": "15.33"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Scotsman's Stove Pipe",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Bigg Mann on Campus",
		"craftable": "Craftable",
		"price": {
			"metals": "2.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Cut Throat Concierge",
		"craftable": "Craftable",
		"price": {
			"metals": "3.77"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Half-Pipe Hurdler",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Bearded Bombardier",
		"craftable": "Craftable",
		"price": {
			"metals": "6.00"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Dry Gulch Gulp",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Electric Twanger",
		"craftable": "Craftable",
		"price": {
			"metals": "8.22"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Dr's Dapper Topper",
		"craftable": "Craftable",
		"price": {
			"metals": "2.66"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Cockfighter",
		"craftable": "Craftable",
		"price": {
			"metals": "2.00"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Texas Ten Gallon",
		"craftable": "Craftable",
		"price": {
			"metals": "3.44"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Buccaneer's Bicorne",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Face of Mercy",
		"craftable": "Craftable",
		"price": {
			"metals": "4.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Berlin Brain Bowl",
		"craftable": "Craftable",
		"price": {
			"metals": "6.88"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Sky Captain",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Pardner's Pompadour",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Sub Zero Suit",
		"craftable": "Craftable",
		"price": {
			"metals": "13.44"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Last Breath",
		"craftable": "Craftable",
		"price": {
			"metals": "6.66"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Joe-on-the-Go",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Caffeine Cooler",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Taunt: The High Five!",
		"craftable": "Craftable",
		"price": {
			"metals": "19.11"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Taunt: Conga",
		"craftable": "Craftable",
		"price": {
			"metals": "21.44"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Taunt: Buy A Life",
		"craftable": "Craftable",
		"price": {
			"metals": "7.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Taunt: Deep Fried Desire",
		"craftable": "Craftable",
		"price": {
			"metals": "5.11"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Compatriot",
		"craftable": "Craftable",
		"price": {
			"metals": "1.33"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Essential Accessories",
		"craftable": "Craftable",
		"price": {
			"metals": "17.22"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The Scrap Pack",
		"craftable": "Craftable",
		"price": {
			"metals": "1.22"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Genuine Arkham Cowl",
		"craftable": "Craftable",
		"price": {
			"metals": "11.11"
		},
		"details": " Limit: 1"
	},
	{
		"item": "The Rogue's Robe",
		"craftable": "Craftable",
		"price": {
			"metals": "4.22"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Archimedes",
		"craftable": "Craftable",
		"price": {
			"metals": "3.00"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Villain's Veil",
		"craftable": "Craftable",
		"price": {
			"metals": "4.88"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Field Practice",
		"craftable": "Craftable",
		"price": {
			"metals": "3.55"
		},
		"details": " Limit: 2"
	},
	{
		"item": "The Cross-Comm Express",
		"craftable": "Craftable",
		"price": {
			"metals": "3.11"
		},
		"details": " Limit: 2"
	},
	{
		"item": "Flakcatcher",
		"craftable": "Craftable",
		"price": {
			"metals": "3.44"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Mann Co. Supply Crate Key",
		"craftable": "Non-Craftable",
		"price": {
			"metals": "1.33"
		},
		"details": " Limit: 1"
	},
	{
		"item": "Tour of Duty Ticket",
		"craftable": "Non-Craftable",
		"price": {
			"metals": "16.22"
		},
		"details": " Limit: 1"
	}
],function(err){
	if(err) console.log(err)
})