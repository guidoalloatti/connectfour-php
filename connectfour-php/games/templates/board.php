<?php

////////////////////////////////////////
// Template with the board information /
////////////////////////////////////////
function render_board($color) {
	// Setting file vars
	$headers = 8;
	$columns = 8;
	$rows = 7;
	$html = "";

	// Preparing the html
	$html .= "<table class='board'><tr>";
	for($header=1; $header<$headers; $header++) {
		$html .= "<th class='board_cell' id='col_$header'><input type='button' class='add_chip add_chip_".$color."' column='$header' value='Drop'' /></th>";
	}
	$html .= "</tr>";
	for($row=6; $row>0; $row--) {
		$html .= '<tr>';
		for($column=1; $column<$columns; $column++) {
			$html .= "<td class='board_cell' id='$row$column'></td>";
		}
		$html .= '</tr>' ;
	}
	$html .= "</table>";

	// Showing the html
	echo $html;
}

?>
