var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject()
{
	var xmlHttp;

	try{
		xmlHttp = new XMLHttpRequest();
	}
	catch(e)
	{
		try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
		}
		catch(e)
		{
		}
	}
	if (!xmlHttp)
	{
		alert("Error creating the xmlHttpRequestObject!");
	}
	else
		return xmlHttp;
}

/*performs server request and assigns a server function*/
function process()
{
	/*continue only if we have a valid xml object*/
	if (xmlHttp)
	{
		/*try to connect to server*/
		try{
			xmlHttp.open("GET", "async.txt", true);
			xmlHttp.onreadystatechange = handleRequestStateChange;
			xmlHttp.send(null);
			/*change cursor to busy hourglass icon*/
			document.body.style.cursor = "wait";
		}
		catch(e)
		{
			/*display error incase of failure*/
			alert("can't connect to server: \n" + e.toString());
			/*revert hour glass to normal cursor*/
			document.body.style.cursor = "default";
		}
	}
}

/*function that handle http request*/
function handleRequestStateChange()
{
	/*obtain reference to div element on the HTML page*/
	myDiv = document.getElementById("divElement");

	/*display status of the request*/
	if (xmlHttp.readyState == 1)
	{
		myDiv.innerHTML = myDiv.innerHTML + "Request status: 1 (loading) <br/>";
	}
	else if (xmlHttp.readyState == 2)
	{
		myDiv.innerHTML = myDiv.innerHTML + "Request status: 1 (loaded) <br/>";
	}
	else if (xmlHttp.readyState == 3)
	{
		myDiv.innerHTML += "Request status: 1 (interactive) <br/>";
	}
	else if (xmlHttp.readyState == 4)
	{
		/*revert busy hour glass to normal cursor*/
		document.body.style.cursor = "default";

		/*read response only if http status is ok*/
		if (xmlHttp.status == 200)
		{
			try{
				/*read the message from server*/
				response = xmlHttp.responseText;
				/*display the msg*/
				myDiv.innerHTML += "Request status: 4 (complete). Server said: <br/>";
				myDiv.innerHTML += response;
			}
			catch(e)
			{
				/*display the error msg*/
				alert("Error reading the response " + e.toString());
			}
		}
		else
		{
			/*display status message*/
			alert("There was problem retrieving the data: \n" + xmlHttp.statusText);
			/*revert hourglass icon to normal*/
			document.body.style.cursor = "default";
		}
	}
}
