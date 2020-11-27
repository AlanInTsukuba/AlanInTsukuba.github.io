function ShowReference(ref)
{
modal = document.getElementById("project-references");
var z, elmnt, label;
if(modal)
{
if(modal.innerHTML.length == 0)
{
LoadReferences(ref);
return true;
}
z = modal.getElementsByTagName("div");
for(i = 0; i < z.length; i++)
{
elmnt = z[i];
label = elmnt.getAttribute("id");
if(label )
{
if( label == ref)
{
    var x = elmnt.getElementsByClassName("close");
    if(x.length == 0)
    {
        elmnt.insertAdjacentHTML("afterbegin","<span class='close'>&times;</span>")
        elmnt.insertAdjacentHTML("beforeend","<p><a href='RefList.html' target='_blank'>Show full reference list.</p>")
    }
span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
elmnt.setAttribute("class", "modal-content");
modal.style.display = "block";
return true;
}
}
}
}

return false;
}
// Get the modal
var modal = document.getElementById("project-references");

function LoadReferences(ref) {
var z, i, elmnt, file, xhttp;
/* Loop through a collection of all HTML elements: */
z = document.getElementsByClassName("reference-content")
for (i = 0; i < z.length; i++) {
elmnt = z[i];
/*search for elements with a certain atrribute:*/
file = elmnt.getAttribute("w3-include-html");
if (file) {
/* Make an HTTP request using the attribute value as the file name: */
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4) {
if (this.status == 200) 
{
LoadReferenceDocument(this,ref);
}
if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
/* Remove the attribute, and call this function once more: */
elmnt.removeAttribute("w3-include-html");
LoadReferences();
}
}
xhttp.open("GET", file, true);
xhttp.send();
/* Exit the function: */
return;
}
}
}

function LoadReferenceDocument(xhttp, ref) {
document.getElementsByClassName("reference-content")[0].innerHTML =
xhttp.responseText;
if(ref != null){ShowReference(ref);}
}
