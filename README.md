# connectfour-php

* Fully playable multiplayer version of the Connect Four game.
* Made my own adaptation of this emblematic game in PHP.
* Used websockets over php to handle game connectivity.
* Used jQuery for the javascript manipulation.
* Run over PHP 5.6.17

# Intructions to play

* Clone on a server with php installed
* You need to handle the PHP WebSocket Server on a separated on a dedicated terminal. To do this, just:
* Go to the folder /connectfour-php/games/socket
* Execute in the terminal: php server.php
* This will by default start the websocket server in: 127.0.0.1:9300 but this can be modified.
