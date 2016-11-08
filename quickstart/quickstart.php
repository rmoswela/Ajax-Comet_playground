<?php
/*generate XML output*/
header('Content-Type: text/xml');

/*generate XML header*/
echo '<?php xml version="1.0" encoding="UTF-8" standalone="yes"?>';

/*create the <response> element*/
echo '<response>';

/*retrieve the username*/
$name = $_GET['name'];

/*generate output depending on username received from client*/
$userName = array('REUBEN', 'LAME', 'REU', 'MOSWELA');

if (in_array(strtoupper($name), $userName))
{
	echo 'Hello, master ' . htmlentities($name) . '!';
}
else if (trim($name) == "")
{
	echo 'Stranger, please tell me your name!';
}
else
	echo htmlentities($name) . ' I don\'t know you!';

/*close response element*/
echo '</response>';
?>
