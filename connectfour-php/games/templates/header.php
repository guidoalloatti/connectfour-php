<?php

///////////////////////////////////
// Small Template with the header /
///////////////////////////////////
function render_header() {
	$html = "
	<html>
		<head>
	  	<title>Connect Four Game</title>
			<link rel='stylesheet' href='/connectfour-php/games/static/css/connectfour.css' type='text/css'>
		  <script src='/connectfour-php/games/static/js/jquery-1.12.1.min.js'></script>
		  <script src='/connectfour-php/games/static/js/connect.js'></script>
		  <script src='/connectfour-php/games/socket/fancywebsocket.js'></script>
		  
		</head>
	  <body>
			<div id='header'>
	  		Welcome to connect four game!
			</div>";
	echo $html;
}

?>