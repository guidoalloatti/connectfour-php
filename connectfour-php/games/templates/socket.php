<?php
///////////////////////////////////////
// Small Template socket related html /
///////////////////////////////////////
function render_socket ($color) {
	$html = "
	<div id='body'>
		<textarea id='log' name='log' readonly='readonly'></textarea><br/>
		<input type='text' id='message' name='message' />
	</div>
	";
	echo $html;
}

