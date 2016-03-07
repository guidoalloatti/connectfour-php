<?php
	
	////////////////////////////////////////////////
	// Loading all the 'templates' and render them /
	////////////////////////////////////////////////
	function render_all ($color) {
		// Including all the templates with html code
		include( $_SERVER['DOCUMENT_ROOT'] . '/connectfour-php/games/templates/header.php' );
		include( $_SERVER['DOCUMENT_ROOT'] . '/connectfour-php/games/templates/instructions.php' );
		include( $_SERVER['DOCUMENT_ROOT'] . '/connectfour-php/games/templates/board.php' );
		include( $_SERVER['DOCUMENT_ROOT'] . '/connectfour-php/games/templates/socket.php' );
		include( $_SERVER['DOCUMENT_ROOT'] . '/connectfour-php/games/templates/footer.php' );
		
		// Call the method into the templates to render the html
		render_header($color);
		render_instructions($color);
		render_board($color);
		render_socket($color);
		render_footer($color);
	}

?>