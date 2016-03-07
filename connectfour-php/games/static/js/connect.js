///////////////////////////////////////
// WebSocket connection 
///////////////////////////////////////

// Global variables
var Server;
var host  = 'ws://127.0.0.1';
var port  = 9300;
var board = [];
var move  = 0;
var turn  = 0;
var winner = '';

// Method to log the message
function log(text) {
  $log = $('#log');
  $log.append(($log.val()?"\n":'')+text);
  $log[0].scrollTop = $log[0].scrollHeight - $log[0].clientHeight;
}

// Method to send a message to the web server
function send( text ) {
  Server.send( 'message', text );
}

// Board code
var setBoard = function () {
  for(var i=1; i < 8; i++) {
    board[i] = [];
    for(var j = 1; j < 7; j++) {
      board[i][j] = 'white';
    }
  }
}

///////////////////////////////////////
// Document ready actions 
///////////////////////////////////////
$(document).ready(function() {
  // Setting the board 
  setBoard();

  // Websocket code
  log('Connecting to websocket server...');
  Server = new FancyWebSocket(host+':'+port);

  //Let the user know we're connected
  Server.bind('open', function() {
    log( "Connected to server." );
  });

  //OH NOES! Disconnection occurred.
  Server.bind('close', function( data ) {
    log( "Disconnected from server." );
  });

  //Log any messages sent from server
  Server.bind('message', function( payload ) {
    var move = payload.split('|');
    var player = move[1];
    var color  = move[2];
    var column = move[3];
    if(typeof(player) != 'undefined' &&
       typeof(color)  != 'undefined' &&
       typeof(column) != 'undefined') {
      column.replace(/"/g, "");
      // Add rival chip to board
      add_oponent_chip(player, color, column);
    }   
    log( payload );
  });

  // Connecting server
  Server.connect();
  
  // Add oponent chip
  function add_oponent_chip (player, color, column) {
    // Add chip to board
    draw_color_chip(player, color, column);
    // Start oponent turn
    var oponet_color = ((color == 'red') ? 'blue' : 'red');
    if(!check_match_win(player, color, column))
      tooglePlayersTurn(player, oponet_color, "start_turn");
  }

  // Checking valid column
  var check_valid_column = function(column) {
    var row = 1;
    var row_not_found = true;
    while(row < 8 && row_not_found) {
      if ($("#"+row+column).html() == "") {
        row_not_found = false;
      }
      row++;
    }
    if(row > 7) {
      alert("You cannot use that column, already at max capacity! Please choose a different one...");
      return false;
    }
    return parseInt(parseInt(row)-1);
  }

  // Draw color chip
  var draw_color_chip = function (player, color, column) {
    var row = 1;
    var row_not_found = true;
    while(row < 8 && row_not_found) {
      if ($("#"+row+column).html() == "") {
        if(player == 1) {
          $("#"+row+column).html("<div id='red_chip'></div>");
        } else if (player == 2) {
          $("#"+row+column).html("<div id='blue_chip'></div>");
        }
        row_not_found = false;
      }
      row++;
    }
    var message = "Player " +player+ " added chip to column "+column+"<br/>"; 
    $('#game_log').append(message);
    move++;
    check_match_win(player, color, column);
    return true;
  }

  // Toogle player drop
  var tooglePlayersTurn = function(player, color, action) {
    if(action == "end_turn") {
      $(".add_chip_"+color).prop('disabled', true);
      $("#"+color+"_turn").removeClass("turn_yes");
      $("#"+color+"_turn").addClass("turn_no");
      $("#"+color+"_turn").html('Your Turn: <br/>NOP!');
    } else {
      $(".add_chip_"+color).prop('disabled', false);
      $("#"+color+"_turn").removeClass("turn_no" );
      $("#"+color+"_turn").addClass("turn_yes");
      $("#"+color+"_turn").html('Your Turn: <br/>YES!');
    }
  }

  // Checking if there is a winner and the match is over
  var check_match_win = function(player, color, column) {
    row    = check_valid_column(column);
    column = parseInt(column); 
    board[column][row] = color;
    var win = false;
	
    if(turn > 2) {
      if(
        (column < 5 && column > 0 && board[column+1][row] == color && board[column+2][row] == color && board[column+3][row] == color) ||
  		  (column < 6 && column > 1 && board[column+1][row] == color && board[column+2][row] == color && board[column-1][row] == color) || 
  		  (column < 7 && column > 2 && board[column+1][row] == color && board[column-1][row] == color && board[column-2][row] == color) || 
  		  (column < 8 && column > 3 && board[column-1][row] == color && board[column-2][row] == color && board[column-3][row] == color) || 
  		  (row < 7 && row > 3 && board[column][row-1] == color && board[column][row-2] == color && board[column][row-3] == color) ||
  		  (column > 0 && column < 5 && row > 0 && row < 4 && board[column+1][row+1] == color && board[column+2][row+2] == color && board[column+3][row+3] == color) ||
  		  (column > 3 && column < 8 && row > 3 && row < 7 && board[column-1][row-1] == color && board[column-2][row-2] == color && board[column-3][row-3] == color) ||
  		  (column > 1 && column < 6 && row > 1 && row < 5 && board[column+1][row+1] == color && board[column+2][row+2] == color && board[column-1][row-1] == color) ||
  		  (column > 1 && column < 7 && row > 1 && row < 6 && board[column+1][row+1] == color && board[column-1][row-1] == color && board[column-2][row-2] == color) ||
  		  (column > 0 && column < 5 && row > 3 && row < 7 && board[column+1][row-1] == color && board[column+2][row-2] == color && board[column+3][row-3] == color) ||
  		  (column > 3 && column < 8 && row > 0 && row < 4 && board[column-1][row+1] == color && board[column-2][row+2] == color && board[column-3][row+3] == color) ||
  		  (column > 2 && column < 7 && row > 1 && row < 5 && board[column-1][row+1] == color && board[column-2][row+2] == color && board[column+1][row-1] == color) ||
  		  (column > 1 && column < 6 && row > 2 && row < 6 && board[column-1][row+1] == color && board[column+1][row-1] == color && board[column+2][row-2] == color)
  		) {
        win = true;
        winner = color;
  		  alert(color +" player win the match! ");
  		  var message = "Game Over! The player "+winner+ " WON! Please reload the page to play again...";
        $('#log').html(message);
        tooglePlayersTurn(color, player, "end_turn");
        return true;
  		}
    }
    return false;
  }

  ///////////////////////////////////////
  // Tag event mapper
  ///////////////////////////////////////
  // Pressing over the drop chip button 
  $(".add_chip").click(function (event){
    if(winner) return;
    turn++;
    var player =  $("#player_id").attr('player_number');
    var column = event.target.attributes.column.value;
    var color  = "red";
    if(player == 2) color = "blue"; 
    if(!check_valid_column(column)) return false;
    if(!draw_color_chip(player, color, column)) return false;

    // Showing current move and sending mnove to websocket
    log( 'You added a chip in column: ' + column );
    send("|"+player+"|"+color+"|"+column+"|");
    tooglePlayersTurn(player, color, "end_turn");
  });

  // Chat over websocket
  $('#message').keypress(function(e) {
    if ( e.keyCode == 13 && this.value ) {
      log( 'You: ' + this.value );
      send( this.value );
      $(this).val('');
    }
  });

});