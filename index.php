<html>
	<head>
		
		<title>2d Javascript Game Engine</title>
		
		<script src="engine.js" type="text/javascript"></script>
		<script src="base.js" type="text/javascript"></script>
		
		<script src="map.js" type="text/javascript"></script>
		<script src="asset.js" type="text/javascript"></script>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <link href="prettify/prettify.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="prettify/prettify.js"></script>

		
	<script>
	    $(document).ready(function () {
	        $("pre").addClass("prettyprint");
	    });
    </script>
        </head>
	<body onload="prettyPrint()">
        &larr;&uarr;&darr;&rarr;[space]<br />
		<canvas id="game">Sorry! This game relies on HTML5 and JavaScript.<br>
		Please update to something like <a href="https://www.google.com/chrome/">Google Chrome</a> :)</canvas>
        
		<ul>
		<li><a href="documentation.html">Documentation</a></li>
		<li><a href="engine.js">Game Engine - engine.js</a></li>
		<li><a href="map.js">Map Object - map.js</a></li>
		<li><a href="asset.js">In Game Assets - asset.js</a></li>
		<li>Implementation Code:
<pre>
&lt;div id="game"&gt;&lt;/div&gt;
&lt;script type="text/javascript">
    //Create the game engine
    var game = engine("game");

    //An array of assets
    var assets = [new Player(), new Enemy(), new GuiText()];

    //Initialize the game
    game.init(Level1, assets);

    //Add additional assets, if desired
    game.addAsset(new Boat());
&lt;/script&gt;
</pre></li>
	</ul>
		
		<script type="text/javascript">
			var game = engine("game");			//Create the game engine
			var assets = [new Player(), new Enemy(), new PlayerHealth()];	//An array of assets
			game.init(Level1, assets);			//Initialize the game
			game.addAsset(new Boat());			//Add additional assets
		</script>
		<?php if(!$_GET['track']=='no'){ ?>
		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-6431083-2']);
			_gaq.push(['_trackPageview']);

			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
		<?php } ?>
	</body>
</html>