
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
		Version: 0.3,
		Author: "Michael Jasper",
		Created: "21 February 2012",
		Updated: "12 October 2012"
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
		
		this.fps = 10;				//loop iterations/per second
		
		this.assets = 		[];		//array of assets: player, enemies, other assets
		this.assetImages =  [];		//array of assets: player, enemies, other assets
		this.textAssets =   [];     //array of text assets, drawn during loop
		this.map;					//The map file, passed into the init
		this.tiles = 		[];		//Array of unique tile images
		this.totalTiles = 	0;		//Total number of unique tiles
		this.tilesLoaded = 	0;		//Count of loaded tiles, used in pre-loaded
		this.tileWidth = 	0;		//Width of a tile, in px
		this.tileHeight = 	0;		//Height of a tile, in px
		this.mapWidth = 	0;		//Width of the map, in tiles
		this.mapHeight = 	0;		//Height of the map, in tiles
		this.currentKey =	"";		//Current key pressed this iteration
		this.update = true;
		
		//Return the engine object for dot.chaining
		return this;
		
	} else {
		// No 'target' paramter was given, return the 'about' object
		return about;
	}
}

/*	Game Engine Functions
===========================*/

engine.prototype = {

	init: function (map, assetArray){
	
		//console.log("init()");
		
	    this.map = map;

	    for (var a in assetArray) {
	        if (assetArray[a].type == "GUI") {
	            this.textAssets.push(assetArray[a]);
	        } else {
	            this.assets.push(assetArray[a]);
	        }
	    }
	    //console.log(this.assets);
	    //console.log(this.textAssets);
		
		//Define dimentions
		this.tileWidth = map.tileWidth;
		this.tileHeight = map.tileHeight;
		this.mapWidth = map.width * this.tileWidth;
		this.mapHeight = map.height * this.tileHeight;
		
		//Resize canvas element to map specs
		this.target.width = this.mapWidth;
		this.target.height = this.mapHeight;
		
		//Call all asset's init() function
		for(var a in this.assets){
			this.assets[a].init();
		}

	    //Call all textAsset's init() function
		for (var a in this.textAssets) {
		    this.textAssets[a].init();
		}
		
		//Pre-load the map, then jump into the game loop
		this.preLoadMap();

		//this.sound.init();
		
	},
	
	/*	Map Pre-loader
	====================*/

	preLoadMap: function(){
		
		//console.log("preLoadMap()");
		
		this.tileCount = Object.keys(this.map.tileDefinition).length;
		
		//preload each image
		for(var image in this.map.tileDefinition){
			this.tiles[image] = new Image();
			this.tiles[image].src = this.map.tileDefinition[image];
			var that = this;
			this.tiles[image].onload = function(){
				//console.log("tile loaded");
				that.preLoadCheck();
			}
			
		}
	},
	
	/*	Pre-load helper
	====================*/
	
	preLoadCheck: function(){
		this.tilesLoaded += 1;
		if( this.tilesLoaded == this.tileCount ){
			this.loop();
		}
	},
	
	/*	Main Game Loop
	===================*/
	
	loop: function() {
	
		//console.log("Loop()");
		var me = this;
	
        setInterval(function() {
			me.context.save();
			//loop through the assets
			for (var a in me.assets) {

			    /* Asset Collisions
                ===================*/

				if(me.assets[a].alive){
				    var collision = "-1";

					//Check if current asset is colliding with any other asset
					for (var b in me.assets){
						//don't compare an asset against itself
						if(me.assets[a] != me.assets[b]){
							var dx = Math.abs(me.assets[a].x - me.assets[b].x);
							var dy = Math.abs(me.assets[a].y - me.assets[b].y);
							//console.log(dx + ", " + dy);
							if(dx < me.assets[a].width/2 && dy < me.assets[a].height/2){
								//they are colliding
							    collision = me.assets[b].type;
							    console.log(me.assets[a].type + "\t" + collision);
							}
						}
					}
				
				    /* Update Assets
                    ================*/ 
					
					if(typeof me.assets[a].update == 'function'){
						if(me.assets[a].update(me.currentKey, collision) ){
					
							/*//limit asset movement boundaries to on screen positions
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
							*/
							
							//If an asset collides with an in-map collidable tile
							//push it back to it's previous good position
							if(me.assets[a].collidable){
								var posx = me.assets[a].x / me.map.tileWidth;
								var posy = me.assets[a].y / me.map.tileHeight;
								//console.log("old: ("+ me.assets[a].oldx + ", " + me.assets[a].oldy + ")");
								//console.log("new: ("+ me.assets[a].x + ", " + me.assets[a].y + ")");
								//console.log( me.map.collidable[ me.map.tiles[posy][posx] ] );
								if(me.map.collidable[ me.map.tiles[posy][posx] ]){
									//if a barrier is met, reset the position
									me.assets[a].x = me.assets[a].oldx;
									me.assets[a].y = me.assets[a].oldy;
									
								}
							}
							
							//the screen needs to be updated
							me.update=true;
							
						}
					}
				}
			}
			
            /* Redraw Map and Assets
            ========================*/

			if (me.update){
			    me.drawMap();
			    me.drawText(me.currentKey);
				for(var a in me.assets){
					if(me.assets[a].alive){
						var img = new Image();
						img.src = me.assets[a].image;

						/*if (typeof (me.assets[a].degrees) != "undefined") {
                            //move the point to the center of the asset
					        me.context.translate(
                                me.assets[a].x + me.assets[a].height / 2,
                                me.assets[a].y + me.assets[a].width / 2);
                            //rotate the canvas
							me.context.rotate( me.assets[a].degrees * Math.Pi/180 );
							//console.log(me.assets[a].degrees);
						}*/

						me.context.drawImage(img, me.assets[a].x, me.assets[a].y);
						//me.context.restore();
					}
				}
				//clear update related flags
				me.update = false;
				me.currentKey = "";
			}
			

        }, 1000 / this.fps);
      },

	
	/*	Map Draw-er
	==================*/
	
	drawMap: function () {
		
		//Draw images to canvas
		for(var x = 0; x < this.map.width; x++){	//loop every row
			for(var y = 0; y < this.map.height; y++){	//loop every column in row
				//Draw
				this.context.drawImage( this.tiles[ this.map.tiles[y][x] ], x * this.tileWidth, y * this.tileHeight);
			}
		}
	},
	
	addAsset: function(asset){
		this.assets.push(asset);
		asset.init();
	},
	
	/*	keyboard key press
	=======================*/
	
	keyPressed: function(key){
		this.currentKey = key;
	},
	
    /* add Text 
	addText: function (asset) {
	    this.textAssets.push(asset);
	},*/

    /* Draw Text */
	drawText: function (key) {
	    for (a in this.textAssets) {
	        this.textAssets[a].update(key);
	        this.context.font = this.textAssets[a].font;
	        this.context.fillStyle = this.textAssets[a].color;
	        this.context.fillText(
                this.textAssets[a].value,
                this.textAssets[a].x,
                this.textAssets[a].y);
	    }
	},

	sound: {
        sounds: [],
		index: 0,
	    play: function (audioUrl, loop) {
	        this.sounds[this.index] = new Audio(audioUrl);
	        if (loop) {
	            this.sounds[this.index].addEventListener('ended', function () {
	                this.currentTime = 0;
	                this.play();
	            }, false);
	        }
	        this.sounds[this.index].play();
			this.index += 1;
	    }, 
	    volume: function (v) {
	        for (var i = 0; i < this.index; i++){
	            this.sounds[i].volume = v;
	        }
	    }
	},
 


};

/*	Game Keyboard map
=====================*/

window.onkeydown = function(key){
	//Key press is outside of the scope of the engine object,
	//and could be remapped, or loaded separatly
	
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
	    case 77:
	        keyName = "m";
	        break;
		default:
			//key not mapped
		    keyName = "Not Mapped";

	}
	
	//send the key to the game engine
	game.keyPressed(keyName);
}