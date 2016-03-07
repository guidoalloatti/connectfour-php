<?php 
	// Including the main player file
	include( $_SERVER['DOCUMENT_ROOT'] . '/connectfour-php/games/templates/player.php' );

	// Rendering the page for the particular player
	$player = "red";
	render_all($player);
?>