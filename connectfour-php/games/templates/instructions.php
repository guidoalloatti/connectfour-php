<?php

///////////////////////////////////
// Template with the instructions /
///////////////////////////////////
function render_instructions ($color) {
	$player_id = ($color == "red" ? 1 : 2);
	
	$html = '
	<div class="instructions">
		<table>
			<tr>
				<td>
					<div id="'.$color.'_chip"></div>
				</td>
				<td>
					<div class="player" id="player_id" player_number="'.$player_id.'">
	  				Player '.$player_id.' - '.$color.' Chips
	  				</div>
	  			</td>
	  			<td>
	  				<div id="'.$color.'_turn" class="turn_no">
	  					Your Turn: 
	  					<br/>NOP!	
	  				</div>
	  			</td>
	  		</tr>
	  	</table>
	</div>
';
	echo $html;
}


?>