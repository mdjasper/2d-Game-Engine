/*
 *		Javascript Game Engine
 *		Michael Jasper
 *		(c) 2012
 *		Version 0.2
 *		An HTML5, Canvas, Javascript Demo
 *
 */


/*	Game Engine Instanciation
==============================*/

function engine(target) {

	// About object is returned if there is no 'target' parameter
	var about = {
		Name: "Game Engine",
		Version: 0.2,
		Author: "Michael Jasper",
		Created: "21 February 2012",
		Updated: "23 February 2012"
	};

	if (target) {

		// Avoid clobbering the global scope: 
		// return a new object if we're in the wrong scope
		if (window === this) {
			return new engine(target);
		}

		// We're in the correct object scope:
		// Init our element object and return the object
		this.target = document.getElementById(target);
		this.context= this.target.getContext('2d'); 
		this.map;
		this.assets = [];
		this.totalTiles = 0;
		this.tilesLoaded = 0

		return this;
	} else {
		// No 'target' paramter was given, return the 'about' object
		return about;
	}
}

/*	Game Engine Functions
===========================*/

engine.prototype = {

	/*	Map Pre-loader
	====================*/

	preLoadMap: function(map, callback){
		console.log("Preload");
		//pre-load tile assets
		var that = this;
		this.tiles = [];
		this.tileWidth = 0;
		this.tileHeight = 0;
		this.mapWidth = 0;
		this.mapHeight = 0;
		this.tileCount = Object.keys(map.tileDefinition).length;
		
		//preload each image
		for(var image in map.tileDefinition){
			this.tiles[image] = new Image();
			this.tiles[image].src = map.tileDefinition[image];
			this.tiles[image].onload = function(){
				console.log("tile loaded");
				that.preLoadCheck(callback);
			}
			
		}
	},
	
	/*	Pre-load helper
	======================*/
	
	preLoadCheck: function(callback){
		this.tilesLoaded += 1;
		if( this.tilesLoaded == this.tileCount ){
			callback()
		}
	},
	
	/*	Map Draw-er
	==================*/
	
	drawMap: function (map, callback) {
		console.log("drawmap");
		//Define dimentions
		this.tileWidth = map.tileWidth;
		this.tileHeight = map.tileHeight;
		
		this.mapWidth = map.width * this.tileWidth;
		this.mapHeight = map.height * this.tileHeight;
		
		//Resize canvas element to map specs
		this.target.width = this.mapWidth;
		this.target.height = this.mapHeight;
		
		this.map = map;
		
		//Draw images to canvas
		for(var x = 0; x < map.width; x++){	//loop every row
			for(var y = 0; y < map.height; y++){	//loop every column in row
				//Draw
				this.context.drawImage( this.tiles[ map.tiles[y][x] ], x * this.tileWidth, y * this.tileHeight);
			}
		}
		if(callback){
			console.log("run drawmap callback");
			callback();
		}
	},
	
	/*	Load an Asset
	===================*/
	
	loadAsset: function(asset, callback){
		console.log("loadasset");
		
		//insert new asset into asset array
		this.assets.push(asset);
		console.log(this.assets);
		
		//preload, and draw the asset to the screen
		var img = new Image();
		var me = this;
		img.onload = function(){
			me.context.drawImage(img, asset.x, asset.y)
		}
		img.src = asset.image;
		
		//excecute the assest's init function
		asset.init();
		
		//alias for the game object, used in the onkeydown function
		var me = this;
		
		/*initiate the timer
		setTimeout(function(){
			if(me.assets[a].onTimer()){
				//redraw map
				me.drawMap(me.map);
				//draw all asset on the map
				for(b in me.assets){
					var img = new Image();
					img.src = me.assets[b].image;
					me.context.drawImage(img, me.assets[b].x, me.assets[b].y);
				}
			}
		}, 500);*/
			
		
		//capture the keyboard input for the window
		window.onkeydown = function(key){
			//When keys are pressed, call each asset's onKeyPress method
			//Redraw the map
			//Validate the asset's new position, if updated, and redraw all assets
			
			
			//prevent page movement from arrow/enter/space keys
			if(key.keyCode != 116){
				key.preventDefault();
			}
			
			//Javascript Key Codes:
			//http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
			switch(key.keyCode){
				case 32:
					keyName = "Space";
					break;
				case 37:
					keyName = "Left";
					break;
				case 38:
					keyName = "Up";
					break;
				case 39:
					keyName = "Right";
					break;
				case 40:
					keyName = "Down";
					break;
				default:
					//key not mapped
					keyName = "Not Mapped";
			}
			
			//redraw map
			me.drawMap(me.map);
		
			for(a in me.assets){
				//Run for all loaded assets:
				if( me.assets[a].onKeyPress(keyName) ){
					//Call the onKeyPress method to check if they self-update
					//If they are updated, validate their position, and 
					//limit movement boundaries to on screen positions
					if(me.assets[a].x < 0){
						me.assets[a].x = 0;
					}
					if(me.assets[a].y < 0){
						me.assets[a].y = 0;
					}
					if(me.assets[a].x > me.mapWidth - me.assets[a].width){
						me.assets[a].x = me.mapWidth - me.assets[a].width;
					}
					if(me.assets[a].y > me.mapHeight - me.assets[a].height){
						me.assets[a].y = me.mapHeight - me.assets[a].height;
					}	
				}
				
				//draw the asset on the map
				var img = new Image();
				img.src = me.assets[a].image;
				me.context.drawImage(img, me.assets[a].x, me.assets[a].y);
			}
		}
		
		//Excecute loadAsset's callback
		if(callback){
			console.log("run loadasset callback");
			callback();
		}
	},
	
	gameLoop: function(){
		for(a in me.assets){
			var img = new Image();
			img.src = me.assets[a].image;
			me.context.drawImage(img, me.assets[a].x, me.assets[a].y);
		}
	}
	
};