


var urlParams = {};
(function () {
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q))
        urlParams[d(e[1])] = d(e[2]);
})();



$(document).ready(function () {
			
         

//$.getScript('script/Graph.js');
//$.getScript('script/Node.js');
//$.getScript('script/Edge.js');

	/*if($.browser.safari == true)
	{
		alert("me");
		xmlHttp = new window.XMLHttpRequest();
        xmlHttp.open("GET",urlParams["data"],false);
        xmlHttp.send(null);
        xmlDoc = xmlHttp.responseXML.documentElement;
	}*/
   

    $.ajax({
        url: "data/" + urlParams["data"],
        dataType: ($.browser.msie) ? "text" : "xml",
        success: function (data) 
		{
            var xml;
            if (typeof data == "string") 
			{
                xml = new ActiveXObject("Microsoft.XMLDOM");
                xml.async = false;
                xml.loadXML(data);
            }
            else 
			{
				
                xml = data;
            }

            main(xml);
        },
		error: AjaxFailed

    });
	
	

});
function getActive()
{
  activeObj = document.activeElement;
  var inFocus = false;
  if (activeObj.tagName == "INPUT" || activeObj.tagName == "TEXTAREA")
  {
     inFocus = true;
  }
  alert(activeObject);
}
function AjaxFailed(result) 
{
      //alert("FAILED : " + result.status + ' ' + result.statusText);
	  alert("It appears that you are attempting to access this content on your local machine with a browser configuration that does not support the loading of local xml data. Please change your browser's local data priveleges or simply try a different browser (Internet Explorer 7.0 or higher or Firefox  3.6 or higher).");
}


function main(xml) 
{
 
   if($(xml).find('system > contentMode').text() == "flash")
   {
        doQuery();
   }
    else
    {  var player = new Player(xml); }
   
  
}



function doQuery() {
   
var flashvars =
			{
			    data:urlParams["data"],
                mode:urlParams["mode"]
			};
   
    var params = {
        menu: "false",
        scale: "exactFit",
        allowFullscreen: "false",
        allowScriptAccess: "always",
        wmode: "gpu",
        bgcolor: "#C0C0C0"

    };
    var attributes = {
        id: "Flash",
        name: "Flash"
    };

    $("#player").append('<div id="content"></div>');
    swfobject.embedSWF("upp.swf", "content", "100%", "100%", "10.0.0", "expressInstall.swf", flashvars, params, attributes);

    pageInit();

}

function closeApplication() {
    self.close();
}

var jsReady = false;
function isReady() {
    return jsReady;
}
function pageInit() {
    window.moveTo(0, 0);
    //window.resizeTo(screen.availWidth,screen.availHeight);
    jsReady = true;
    //document.forms["form1"].output.value += "\n" + "JavaScript is ready.\n";
    //window.document.movieID.focus();
    //alert(thisMovie("myPRIME"));
    var globalvar = thisMovie("Flash");
    //!!! Need to timeout for all browsers load order to catchup
	
    setTimeout('thisMovie("Flash").focus()', 250);
    //$('altContent').css({display:"block"});
}
 function thisMovie(movieName) {
         if (navigator.appName.indexOf("Microsoft") != -1) {
             return window[movieName];
         } else {
             return document[movieName];
         }
     }

//Ensure we handle window closing properly
var unloaded = false;
function unloadHandler()
{
    if (!unloaded) {
        ICE.SCORM.save(); //save all data that has already been sent
        ICE.SCORM.quit(); //close the SCORM API connection properly
        unloaded = true;
    }
 }
 window.onbeforeunload = unloadHandler;
 window.onunload = unloadHandler;
