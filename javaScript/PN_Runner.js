var TransitionObjects = [];
var status; 
var t;
var light;  
// in the future these will be passed in as arguments
var db = 'http://localhost:8080/exist3rc1/rest/db';
var PN_Instance = '/PetriNets/trafficLight/instance';
var instanceFilename = 'trafficLight.xml';
var PN_Definition = 'http://localhost:8080/exist3rc1/rest/db/trafficLightPN.xml';

    // the code for the Transition class
         function Transition( name )
    {
        this.name = name;
        this.input = [];
        this.output = [];
        // call getTransitionInformation() which makes an asynch XQuery call
        // to obtain the transition record from the PN_Definition. This will establish
        // the value for xmldoc.
        //setTransitionInformation(name);
        //xpathQuery = "//transitions/transition[@id='" + this.name + "']";
        //Transition.prototype.setTransitionInputs( xpathQuery );
    }

    Transition.prototype.getTransitionInputs = function()
    {
        return this.input;
    }

    Transition.prototype.getTransitionOutputs = function()
    {
        return this.output;
    }

    Transition.prototype.getName = function() {
        return this.name;
    }

    Transition.prototype.setTransitionInputs = function(xpathQuery) {
        xpathQuery += "/inputs/place";
        var query = "count( " + xpathQuery + ")";
        var numResults = LocalQuery(query);
        for (var j = 0; j < numResults; j++)
        {   
            var k = j+1;
            var oneResult = LocalQuery(xpathQuery + "[" + k + "]");
            this.input.push(oneResult);
        }

    } 

    Transition.prototype.setTransitionOutputs = function(xpathQuery) {
        xpathQuery += "/outputs/place";
        var query = "count( " + xpathQuery + ")";
        var numResults = LocalQuery(query);
        for (var j = 0; j < numResults; j++)
        {   
            var k = j+1;
            var oneResult = LocalQuery(xpathQuery + "[" + k + "]");
            this.output.push(oneResult);
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
        
    

    function buildTransitionList()
    {

                   // url = "http://localhost:8080/exist3rc1/rest/db/TrafficLights/trafficLightPN.xml";
                   // var argument = new Argument( "onSuccess", function(transitions) {

        //transition = "T1a";
        //transitions/transition[@id="T1a"]/inputs/place[1]

        for (var j = 0; j < transitions.length; j++)
        {
            var transition = new Transition(transitions[j]);
            xpathQuery = "//transitions/transition[@id='" + transition.name + "']";
            transition.setTransitionInputs( xpathQuery );
            transition.setTransitionOutputs( xpathQuery );
            TransitionObjects.push(transition);

        }
          
        TransitionObjecsAreReady(); //maybe not here, but somewhere inside of Transitions object.
          //  },false, false);
                    //getDocument(url, argument);

    }


   function enabled(transition)
   {
         



           

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
        


        var argument = new Argument( "onSuccess", function() {
        //GETRequest();
        var p;
        for (var k = 0; k < transitions.length; k++)
        {
            if (transitions[t] == transitions[k])
            {
                p = k;
            }
        }

        var rtnval = true;

        for( var i=0; i<TransitionObjects[p].input.length; i++ )
        {
            resourceSet = LocalQuery(TransitionObjects[p].input[i]);

            if ( resourceSet === "true")
            {
                resourceSet = true;
            }
            else 
            {
                resourceSet = false;
            }

            rtnval = rtnval && resourceSet;
        }
            
        document.getElementById("test2").innerHTML = rtnval;
        status = rtnval;
        alert(transitions[t] + ":" + status);
        light = t;
        TransitionObjecsAreReady();
    },false,false);

        getDocument(url, argument );
    }

    function updateTransition()
    {

        for (var i = 0; i < TransitionObjects[light].output.length; i++)
        {
            TransitionObjects[light].output[i];
            XUpdate1(url + '?_query=' + TransitionObjects[light].output[i]);
        }
    }