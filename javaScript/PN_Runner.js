var ElementXpathQueries = [];
var status;	
// in the future these will be passed in as arguments
var db = 'http://localhost:8080/exist3rc1/rest/db';
var PN_Instance = '/PetriNets/trafficLight/instance';
var instanceFilename = 'trafficLight.xml';
var PN_Definition = 'http://localhost:8080/exist3rc1/rest/db/trafficLightPN.xml';

    // the code for the Transition class
         function Transition( name )
    {
        this.name = name;
        this.inputs = [];
        this.outputs = [];
        // call getTransitionInformation() which makes an asynch XQuery call
        // to obtain the transition record from the PN_Definition. This will establish
        // the value for xmldoc.
        setTransitionInformation();
    }

    Transition.prototype.getTransitionInputs = function()
    {
        return this.inputs;
    }

    Transition.prototype.getTransitionOutputs = function()
    {
        return this.outputs;
    }

    Transition.prototype.getName = function() {
        return this.name;
    }


    // A few comemnts...

    //Transition.prototype.setTransitionInformation = function() { ...  
    // when the code is like the line above, the computation below doesn't happen at all.
    // and that was the reason why I altered this inside the Transition constructor.
    // however, for the same reason the first line above doesn't get called, neither Transition.getName, nor Transition.setTransitionInputs do.
    //When I write Transition.getName() it complains about Transition.getName not being a function. When I write getName(), it complains about this function not having been defined.
    function setTransitionInformation() {
         xpathQuery = "//transitions/transition[@id='" + Transition.getName + "']";

        //querying on PN_Definition
        var argument = new Argument( "onSuccess", function() { 

            // in the following two methods, do client side XQueries (i.e., local) to pull
            // the information out of the retrieved transition data which is now in xmldoc
            // this provides the benefit of 
            Transition.setTransitionInputs//( xmldoc, xpathQuery ); 
            Transition.setTransitionOutputs//( xmldoc, xpathQuery );

            document.getElementById("test").innerHTML = Transition.getTransitionInputs[1];
            }, false,false);
            var PN_Definition = "http://localhost:8080/exist3rc1/rest/db/TrafficLights/trafficLightPN.xml";
            getDocument(PN_Definition, argument ); 
    }

    Transition.prototype.setTransitionInputs = function(xmldoc, xpathQuery) {
        xpathQuery += "/inputs/place";
        var query = "count( " + xpathQuery + ")";
        var numResults = LocalQuery(query);
        for (var j = 0; j < numResults; j++)
        {   
            var k = j+1;
            var oneResult = LocalQuery(xpathQuery + "[" + k + "]");
            this.inputs.push(oneResult);
        }

    } 

    Transition.prototype.setTransitionOutputs = function(xmldoc, xpathQuery) {
           xpathQuery += "/outputs/place";
        var query = "count( " + xpathQuery + ")";
        var numResults = LocalQuery(query);
        for (var j = 0; j < numResults; j++)
        {   
            var k = j+1;
            var oneResult = LocalQuery(xpathQuery + "[" + k + "]");
            this.outputs.push(oneResult);
        }


    }  

    function PN_Runner_Constructor ()
    {
        
        
        var url = db + PN_Instance + '/' + instanceFilename;
        var argument = new Argument( "onFailure", function() {

                // create the collection to hold the instance data
                createCollection(db + PN_Instance );
            
                // establish the initial netMarkings        
                var url = PN_Definition;
                var query = '//places/place';
                var argument = new Argument( "onSuccess", function() {

                                        
                    var initialMarking = "<netMarking>" + xmldoc + "</netMarking>";
        
                    // store the initial markings into the database
                    addDocument( db + PN_Instance + "/" + instanceFilename, initialMarking );
                }, true ); // set the asText field to true to have _wrap=no added

                XPathQuery(url, query, argument );

        }, false ); 

        getDocument(url, argument );
    }
        
	

    function buildTransitionList(transitions)
    {

                    url = "http://localhost:8080/exist3rc1/rest/db/TrafficLights/trafficLightPN.xml";
                    var argument = new Argument( "onSuccess", function() {

        //transition = "T1a";
        //transitions/transition[@id="T1a"]/inputs/place[1]

        for (var j = 0; j < transitions.length; j++)
        {


    }


   function enabled(transitions, transition)
   {
   		 



         var rtnval = true;      

        //transition = "T1a";
        //transitions/transition[@id="T1a"]/inputs/place[1]

/*
        var xpathQuery = "//transitions/transition[@id='" + transition + "']/inputs/place";

            //querying on PN_Definition
          url = "http://localhost:8080/exist3rc1/rest/db/TrafficLights/trafficLightPN.xml";
  //      GETRequest();


        var xpathQueries = [];
        var numResults = XPathQuery("count(" + xpathQuery + ")");
        var results = new Array( numResults );
        //alert(numResults);
        
        // for each result
        for( i = 1; i<=numResults; i++ )
        {   
            var xpath =  xpathQuery + "[" + i + "]";
            var oneResult = XPathQuery(xpath);
            //alert(oneResult);
            xpathQueries.push(oneResult);
        }
*/        
            // now evaluate each of the dependencies anding together the results of the
            // queries
        db = "http://localhost:8080/exist3rc1/rest/db";
        PN_Instance = "/PetriNets/trafficLight/instance/";
        xmlFileName = "trafficLight.xml";
        url = db + PN_Instance + xmlFileName;
        var p;
        for (var k = 0; k < transitions.length; k++)
        {
            if (transition == transitions[k])
            {
                p = k;
            }
        }


        var argument = new Argument( "onSuccess", function(p) {
        //GETRequest();
        var rtnval = true;  

        for( var i=0; i<ElementXpathQueries[p].length; i++ )
        {
            resourceSet = XPathQuery(ElementXpathQueries[p][i]);
            rtnval = rtnval && resourceSet;
        }
            
        document.getElementById("test2").innerHTML = rtnval;
        status = rtnval;
        
    },false);
        getDocument(url, argument );
    }