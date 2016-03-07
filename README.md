# connectfour-php

# Connect Four implementation in PHP, jQuery and WebSockets
* Fully playable multiplayer version of the Connect Four game.
* Made my own adaptation of this emblematic game in PHP.
* Used websockets over php to handle game connectivity.
* Used jQuery for the javascript manipulation.
* Run over PHP 5.6.17

# Installation
* Clone on a server with php installed
* You need to handle the PHP WebSocket Server on a separated on a dedicated terminal. To do this, just:
* Go to the folder /connectfour-php/games/socket
* Execute in the terminal: php server.php
* This will by default start the websocket server in: 127.0.0.1:9300 but this can be modified.

# Intructions to play
* Then you should open the first browser window in: localhost:apache_port/connectfour-php/games/1/
* Finally open te second browser window in: localhost:apache_port/connectfour-php/games/2/
* All set! Get to play! You can even send massages to you opponent ;)


