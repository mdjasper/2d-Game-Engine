var Player = {
	
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
		this.alive = true;
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
		}
	}
	
};