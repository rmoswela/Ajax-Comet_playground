function process()
{
	var string;
	string = "<ul>" +
		"<li>Red</li>" +
		"<li>Green</li>" +
		"<li>Blue</li>" +
		"</ul>";

	/*obtain reference to div element*/
	myDiv = document.getElementById("divElement");
	/*add content to the div element*/
	myDiv.innerHTML = string;
}
