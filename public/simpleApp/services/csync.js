angular.module('simpleApp')

    .service('CSync', ['$http', function ($http) {

    	//	Connect & authenticate with server
    	var app = csync({host: "169.44.13.246", port: 6005, useSSL: false});
    	app.authenticate("demo", "demoToken")

    	this.createListenTree = function(key, callback) {
    		var tree = {}

    		//
    		//	Last segment of key lastKeyTerm("a.b.c.d") -> "d"
    		//
    		function lastKeyTerm(key) {
    			return key.substring( key.lastIndexOf(".") + 1 )
    		}

    		//
    		//	Find and return a leaf in the tree based on the key 
    		//	in the value payload and optionally remove it
    		//
    		function leafInTree( value, remove ) {
    			var fullKey
    			var lastTree = tree
    			var keys = value.key.split(".")

    			for (i in keys) {
    				let key = keys[i]

    				if ( fullKey == undefined ) {
    					fullKey = key
    				} else {
    					fullKey = fullKey + "." + key
    				}

    				// Build tree if needed as we go
    				if ( lastTree[key] == undefined ) {
    					lastTree[key] = { _key: fullKey }
    				}
    				if ( remove == true ) {
    					if (i == keys.length - 1) {
    						// Delete it
    						delete lastTree[key]
    					}
    				}
    				lastTree = lastTree[key]
    			}

    			return lastTree
    		}

    		function listenHandler(error, value) {
    			if (error) {
    				// handle error
    				console.log("Error listening for: (%j) ", error)
    			} else {
    				if (value.exists == true) {
    					// set value of data
    					var leaf = leafInTree(value)
    					//leaf._value = value
    					leaf._data = value.data
    				} else {
    					// remove it
    					leafInTree(value, true)
    				}
    			}
    			callback()
    			//console.log("Tree is now:")
    			//console.log(JSON.stringify(tree, null, 2))
    		}

    		app.key(key).listen( listenHandler )

    		return tree
    	}

}]);
