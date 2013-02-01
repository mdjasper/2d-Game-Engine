var Level1 = {
	width: 12,	// number of tiles wide
	height: 11,	// number of tiles tall
	tileWidth: 32,	// width in px of an individual tile
	tileHeight: 32,	// height in px of an individual tile
	tiles: [
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
		[1, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 3],
		[1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
	],
	tileDefinition: {
		1: "http://www.mikedoesweb.com/sandbox/game/images/rocks.png",
		2: "http://www.mikedoesweb.com/sandbox/game/images/grass.png",
		3: "http://www.mikedoesweb.com/sandbox/game/images/water.png",
		4: "http://www.mikedoesweb.com/sandbox/game/images/rocks-top.png"
		//Test preloading with large image,
		//4: "http://cdn.thedesignwork.com/wp-content/uploads/2010/08/Night-Moscow51.jpg"
	},
	collidable: {
		1: "rock",
		3: "water",
		4: "rock"
	}
};

var Level2 = {
    width: 12,	// number of tiles wide
    height: 11,	// number of tiles tall
    tileWidth: 32,	// width in px of an individual tile
    tileHeight: 32,	// height in px of an individual tile
    tiles: [
		[3, 3, 3, 3, 3, 4, 4, 4, 4, 2, 3, 3],
		[3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3],
		[3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 3, 3],
		[3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
		[1, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 3],
		[1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ],
    tileDefinition: {
        1: "http://www.mikedoesweb.com/sandbox/game/images/rocks.png",
        2: "http://www.mikedoesweb.com/sandbox/game/images/grass.png",
        3: "http://www.mikedoesweb.com/sandbox/game/images/water.png",
        4: "http://www.mikedoesweb.com/sandbox/game/images/rocks-top.png"
        //Test preloading with large image,
        //4: "http://cdn.thedesignwork.com/wp-content/uploads/2010/08/Night-Moscow51.jpg"
    },
    collidable: {
        1: "rock",
        3: "water",
        4: "rock"
    }
};