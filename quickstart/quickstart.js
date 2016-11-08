/*store reference to the XMLHttpRequest object*/
var xmlHttp = createXmlHttpRequestObject();

/*retrieves the xmlHttpRequest object*/
function createXmlHttpRequestObject()
{
	/*store reference to xmlHttpRequest object*/
	var xmlHttp;

	/*for running explorer 6 or older*/
	if (window.ActiveXObject)
	{
		try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(e){
			xmlHttp = false;
		}
	}
	/*if running mozilla or other browsers*/
	else
	{
		try{
			xmlHttp = new XMLHttpRequest();
		}
		catch(e)
		{
			xmlHttp = false;
		}
	}
	/*return created object or error msg*/
	if (!xmlHttp)
	{
		alert("Error creating the xmHttpRequest Object!");
	}
	else
	{
		return xmlHttp;
	}
}
/*make asynchronous HTTP request using the xmlHttpRequest Object*/
function process()
{
	/*proceed only if the xmlHttp object is not busy*/
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0)
	{
		/*retrieve the name typed by the user*/
		name = encodeURIComponent(document.getElementById("myName").value);
		/*execute quickstart.php from server*/
		xmlHttp.open("GET", "quickstart.php?name=" + name , true);
		/*define method to handle server response*/
		xmlHttp.onreadystatechange = handleServerResponse;
		/*make the server request*/
		xmlHttp.send(null);
	}
	else
	{
		/*if connection busy try after 1 second*/
		setTimeout('process()', 1000);
	}
}
/*callback function executed when message is received from server*/
function handleServerResponse()
{
	/*move fwd if transaction has completed*/
	if (xmlHttp.readyState == 4)
	{
		/*status of 200 indicate transaction has executed successfully*/
		if (xmlHttp.status == 200)
		{
			/*extract xml received from server*/
			xmlResponse = xmlHttp.responseXML;
			/*obtain the document element (root element) of XML structure*/
			xmlDocumentElement = xmlResponse.documentElement;
			/*get tex msg which is in the first child of the document element*/
			helloMessage = xmlDocumentElement.firstChild.data;
			/*display data received from server*/
			document.getElementById("divMessage").innerHTML = '<i>' + helloMessage + '<i>';
			/*restart sequence*/
			setTimeout('process()', 1000);
		}
		/*http status different from 200 signals an error*/
		else
		{
			alert("There was problem accessing the server: " + xmlHttp.statusText);
		}
	}
}

