/*	
 *	Generic base Asset
 *	Contains properties relative to all in-game assets
 */
 
var Asset = Base.extend({
	collidable: true,
	health: 100,
	type: "generic",
	alive: true
});

/*	
 *	Player
 *	Inherits from Asset
 */

var Player = Asset.extend({
	
	init: function(){
		
		this.width = 32;	// width in px
		this.height = 32;	// height in px
		this.x = 32;
		this.y = 32;
		this.movement = 32;
		this.image = "http://www.mikedoesweb.com/sandbox/game/images/smiley.jpg";
		this.collidable = true;
		this.health = 100;
		this.type = "player";
	},
	
	update: function(key, collisionType){
		//Save the current coords, in case of meeting a barrier
		this.oldx = this.x;
		this.oldy = this.y;
		//For even movement, move the player in fractions of the height dimention
		
		if(collisionType == "enemy"){
			this.health -= 1;
			if(this.health < 50){
				this.image = "http://www.mikedoesweb.com/sandbox/game/images/frowney.png"
			}
			if(this.health < 1){
				this.alive = false;
			}
		}
		
		switch(key){
			case "Left":
				//console.log("Pressed left!");
				this.x -= this.movement;
				return true;
				break;
			case "Right":
				//console.log("Pressed Right!");
				this.x += this.movement;
				return true;
				break;
			case "Up":
				//console.log("Pressed Up!");
				this.y -= this.movement;
				return true;
				break;
			case "Down":
				//console.log("Pressed Down!");
				this.y += this.movement;
				return true;
				break;
			case "Space":
				game.addAsset(new Bullet(this.x + 32, this.y + 16));
				break;
		}
	}	
});

/*	
 *	Enemy
 *	Inherits from Asset
 */

var Enemy = Asset.extend({
	//fowney guy
	init: function(){
	
		this.width = 32;	// width in px
		this.height = 32;	// height in px
		this.x = 160;
		this.y = 160;
		this.image = "http://www.mikedoesweb.com/sandbox/game/images/frowney.png";
		this.collidable = false;
		this.orig_x = this.x;
		this.orig_y = this.y;
		this.limit = 32;
		this.direction = "left";
		this.type = "enemy";
		this.alive =  true;
	},
	
	update: function(key){
		
		if(this.direction == "left"){
			this.x -= 4;
		}
		else if(this.direction == "right"){
			this.x += 4;
		}
		
		if(this.direction == "left"){
			if (this.orig_x >= this.x + this.limit){
				this.direction = "right";
			}
		}else{
			if (this.x >= this.orig_x + this.limit){
				this.direction = "left";
			}
		}
			
		return true;
	}
});

/*	
 *	Boat
 *	Inherits from Asset
 */

var Boat = Asset.extend({
	//boat in water
	init: function(){	
	
		this.width = 64;	// width in px
		this.height = 32;	// height in px
		this.x = 128;
		this.y = 250;
		this.image = "http://www.mikedoesweb.com/sandbox/game/images/boat.png";
		this.collidable = false,
		this.orig_x = this.x;
		this.orig_y = this.y;
		this.limit = 32;
		this.direction = "right";
		this.type = "enemy";
		this.alive =  true;
	},
	
	update: function(key){
		
		if(this.direction == "left"){
			this.x -= 2;
		}
		else if(this.direction == "right"){
			this.x += 2;
		}
		
		if(this.direction == "left"){
			if (this.orig_x >= this.x + this.limit){
				this.direction = "right";
			}
		}else{
			if (this.x >= this.orig_x + this.limit){
				this.direction = "left";
			}
		}
			
		return true;
	}
});

/*	
 *	Bullet
 *	Inherits from Asset
 */
 
 var Bullet = Asset.extend({
	constructor: function(x,y){
		this.x = x;
		this.y = y;
	},
	
	init: function(){	
	
		this.width = 8;	// width in px
		this.height = 8;	// height in px
		this.image = "http://www.mikedoesweb.com/sandbox/game/images/bullet.png";
		this.collidable = false,
		this.type = "bullet";
		this.alive =  true;
	},
	
	update: function(key){
		
		this.x += 8
			
		return true;
	} 
 });
