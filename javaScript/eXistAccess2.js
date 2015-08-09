//eXistAccess
var url, collection, fileName, putURL;
var xmldoc;
var bGetError = "false";


function myFunction()
{
    document.getElementById("demo").innerHTML = "That's awesome!";
}

function URLInput()
{
	    url = document.getElementById("input").value;

}
	
function URLInputPUT()
{
	    putURL = document.getElementById("PUTinput").value;

}

function collectionInput()
{
	    collection = document.getElementById("collection").value;

}

function fileNameInput()
{

	fileName = document.getElementById("fileName").value;

}


	// the code for the Route class
	function Argument( onCondition, handler, asText, wait )
	{
		this.onCondition = onCondition;
		this.handler = handler;
		this.asText = asText;
		this.wait = wait;
	}

	Argument.prototype.getOnCondition = function() {
		return this.onCondition;
	}

	Argument.prototype.getHandler = function() {
		return this.handler;
	} 

	Argument.prototype.getAsText = function() {
		return this.asText;
	} 

	Argument.prototype.getWait = function() {
		return this.wait;
	} 	

	Argument.prototype.setWait = function( wait ) {
		return this.wait = wait;
	} 

	// use the Yahoo Connection Manager to exercise eXist's REST interface to
	// retrieve the data.
	function handleGetFailure(o)
	{
		if( o.argument.getOnCondition() === "onFailure")
			o.argument.getHandler()();
	}

	function handleGetSuccess(o)
	{
		if( o.argument.getAsText() === true )
			xmldoc = o.responseText;
		else
			xmldoc = o.responseXML;

		if( o.argument.getOnCondition() === "onSuccess")
			o.argument.getHandler()( xmldoc );
	}

	// the function utilizes eXist's REST interface to retrieve
	// the xml file from the database
	function getDocument( docURL, argument )
	{
		request = YAHOO.util.Connect.asyncRequest( "GET", docURL, { success:handleGetSuccess, failure:handleGetFailure, argument:argument } ); 	
	}

	// the function addDocument will put xml content (in String representation) into the eXist REST database	
	// at the location identified by the docURL
	function addDocument( docURL, xmlContent )
	{
		var encoded = Base64.encode('admin' + ':' + '');

		YAHOO.util.Connect.initHeader('Authorization', 'Basic ' + encoded, true);
		YAHOO.util.Connect.initHeader('Content-Type', 'application/xml; charset=utf-8', true);
		YAHOO.util.Connect.asyncRequest( "PUT", docURL, { success:function(){alert('add success')}, failure:function(){alert('add failure')} }, 
			xmlContent ); 
	}

	function createCollection(collectionURL)
	{
		var bootFile = "boot.xml";
		var xmlContent = "<boot>boot</boot>";
		var collectionBootFile = collectionURL + '/'+ bootFile;

		var encoded = Base64.encode('admin' + ':' + '');

		YAHOO.util.Connect.initHeader('Authorization', 'Basic ' + encoded, true);
		YAHOO.util.Connect.initHeader('Content-Type', 'application/xml; charset=utf-8', true);
		YAHOO.util.Connect.asyncRequest( 'PUT', collectionBootFile, { success:function(){alert('create success'); deleteDocument( collectionBootFile)}, failure:function(){alert('create failure')} }, 
			xmlContent ); 
	}

	function deleteDocument( docURL )
	{
		var encoded = Base64.encode('admin' + ':' + '');

		YAHOO.util.Connect.initHeader('Authorization', 'Basic ' + encoded, true);
		YAHOO.util.Connect.asyncRequest( 'DELETE', docURL, { success:function(){alert('delete success')}, failure:function(){alert('delete failure')} } ); 	
	}

	// XPathQuery receives an URL that may refer to a collection or a document. The
	// separate query string is then appended and getDocument is called to effectively
	// run the query against the database.
	function XPathQuery( url, query, argument )
	{

		if( argument.getAsText() )
			queryString = url + '?_query=' + query + '&_wrap=no';
		else
			queryString = url + '?_query=' + query;

		getDocument( queryString, argument );
	}	

/*
function XUpdate2()
{
	//var XUpdate = '<xu:modifications xmlns:xu="http://www.xmldb.org/xupdate" version="1.0">
      //   				<xu:update select="//junk">test</xu:update>
     	//			</xu:modifications>'


	HTTP.post = function (UpdateURL, XUpdate, callback, errorHandler)
	{
		var request = HTTP.newRequest();
		request.onreadystatechange = function() 
		{
			if (xmlhttp.readyState == 4)
			{
				
				if (xmlhttp.status == 200)
				{
					callback(HTTP._getResponse(request));
				}
				else
				{
					if (errorHandler) errorHandler (request.status, request.statusText);
					else callback(null);
				}
			}

		}


		request.open("POST", UpdateURL, false, "admin", "admin");
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


	}
	


}
*/
function LocalQuery(query)
{

	var queryval = xmldoc.evaluate( query, xmldoc, null, XPathResult.STRING_TYPE, null).stringValue; 
	
	return queryval;

}


function XPathQuery1(query)
{	// var obj = JSON.parse(xmldoc);
	var queryval = [];
	var numResults = xmldoc.evaluate( "count(" + query + ")", xmldoc, null, XPathResult.NUMBER_TYPE, null ).numberValue;
	var results = new Array( numResults );
	alert(numResults);
	//data(//places/place[1]/@value)
		// for each result
		for( i = 1; i<=results.length; i++ )
		{	//data(//route/point[1]/@lat)
			var xpath = /*"data(" +*/ query + "[" + i + "]";
			var oneResult = xmldoc.evaluate( xpath, xmldoc, null, XPathResult.STRING_TYPE, null).stringValue; 
			alert(oneResult);
			queryval.push(oneResult);
		}
		alert(queryval);
	/*
	var iterator = document.evaluate(query, xmldoc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );

try {
  var thisNode = iterator.iterateNext();
  while (thisNode) {
    //string += thisNode.textContent;
    queryval.push(thisNode.textContent);
 	thisNode = iterator.iterateNext();
 	
 	  }	

}
catch (e) {
  dump( 'Error: Document tree modified during iteration ' + e );
}
	
	//queryval.push(xmldoc.evaluate( query, xmldoc, null, XPathResult.STRING_TYPE, null).stringValue);
	//document.getElementById("t").innerHTML = queryval;
*/
	return queryval;
}

function XPathQuery2(query, attr)
{	// var obj = JSON.parse(xmldoc);
	//return xmldoc.evaluate( query, xmldoc, null, XPathResult.STRING_TYPE, null).stringValue;
	//queryval = xmldoc.evaluate( query, xmldoc, null, XPathResult.STRING_TYPE, null).stringValue;
	var queryval = [];
	var numResults = xmldoc.evaluate( "count(" + query + ")", xmldoc, null, XPathResult.NUMBER_TYPE, null ).numberValue;
	var results = new Array( numResults );
	alert(numResults);
	//data(//places/place[1]/@value)
		// for each result
		for( i = 1; i<=results.length; i++ )
		{	//data(//route/point[1]/@lat)
			var xpath = /*"data(" +*/ query + "[" + i + "]/" + attr/* + ")"*/;
			var oneResult = xmldoc.evaluate( xpath, xmldoc, null, XPathResult.STRING_TYPE, null).stringValue; 
			alert(oneResult);
			queryval.push(oneResult);
		}
		alert(queryval);
	/*
	var iterator = document.evaluate(query, xmldoc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );

try {
  var thisNode = iterator.iterateNext();
  while (thisNode) {
    //string += thisNode.textContent;
    queryval.push(thisNode.textContent);
 	thisNode = iterator.iterateNext();
 	
 	  }	

}
catch (e) {
  dump( 'Error: Document tree modified during iteration ' + e );
}
	
	//queryval.push(xmldoc.evaluate( query, xmldoc, null, XPathResult.STRING_TYPE, null).stringValue);
	//document.getElementById("t").innerHTML = queryval;
*/
	return queryval;
}


function XUpdate( url, query, argument )
	{

		queryString = url + '?_query=' + query;

		getDocument( queryString, argument );
	}	

function XUpdate1(XQuery)
	
{	
	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() 
	{
		if (xmlhttp.readyState == 4)
		{
			if (xmlhttp.status == 200)
			{
				
			}
		}
	}

	if (XQuery = null) 
	{
		var XQuery = '?_query=update replace //junk/text() with "test"';	
	}
	
	var putURL0 = "http://localhost:8080/exist/rest/db/";
	var	collection0 = "coll/";
	var fileName0 = "junk.xml"

	xmlhttp.open("GET",putURL0+collection0+fileName0+XQuery);

	//xmlhttp.open("GET",url);
	xmlhttp.send(null);

}