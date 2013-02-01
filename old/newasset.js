var newAsset = {
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
};

var newAsset2 = {
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
};

