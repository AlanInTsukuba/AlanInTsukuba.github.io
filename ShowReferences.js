// Get the modal
var modal = document.getElementById("project-references");
var refcontent
function ShowReference(refcite)
{
  var z, i, elmnt, file, xhttp;
/* Loop through a collection of all HTML elements: */
z = document.getElementsByClassName("reference-content")
for (i = 0; i < z.length; i++) {
elmnt = z[i];
/*search for elements with a certain atrribute:*/
file = elmnt.getAttribute("w3-include-xml");
if (file) {
/* Make an HTTP request using the attribute value as the file name: */
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4) {
if (this.status == 200) 
{
  getResult(this.responseXML, refcite);
}
if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
}
}
xhttp.open("GET", file, true);
xhttp.send();
/* Exit the function: */
return;
}
}
}

function getResult(xml,refcite)
{
  var divwrapper = "<div id='reference' class='modal-content'><span class='close'>&times;</span>";
  var txt = "";
  var path = "/references/reference[@id='" + refcite + "']";
//xml.path  = "/references/reference[@id='" + refcite + "']";
  if(xml.evaluate)
  {
    var nodes = xml.evaluate(path,xml,null,XPathResult.ANY_TYPE, null);
    var result = nodes.iterateNext();
        while (result) {
            txt += result.innerHTML;
            result = nodes.iterateNext();
        } 
  } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xml.setProperty("SelectionLanguage", "XPath");
        nodes = xml.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].nodeValue;
        }
    }

    if(txt.length > 0)
    {
    divwrapper += txt + "</div>";

    modal.innerHTML = divwrapper;  
    span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    refcontent = document.getElementById("reference");
    // When the user clicks anywhere outside of the modal, close it

    modal.style.display="block"
  }
}

window.onclick = function(event) {
  if(event.target.parentElement != refcontent && event.target.nodeName != "A")
   { modal.style.display = "none";}
}
