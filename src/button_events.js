/*******************************************
 button_events.js
 Created on March 11, 2014, by Jeremy Davis
 Simon Says
 
 This file defines some callback methods for events that buttons can trigger (like when they are depressed).
 *******************************************/

/* A helper function to return the button that created the given event. Returns false on failure. */
function getTarget(evt) {
    "use strict";
    
    if (evt.target) {
        return evt.target;
    }
    if (evt.srcElement) {
        return evt.srcElement;
    }
    
    return false;
}

/* Updates the button's graphics in response to a mouse-over event. */
function mouseOver(evt) {
    "use strict";
    
    var button, edge;
    
    // Try to find the button. If unsuccessful, return without doing anything.
    button = getTarget(evt);
    if (!button) {
        return;
    }
    
    // TODO: Call onMouseDown if this was the last button pressed and the user never released the mouse button. (Is this even possible?)
    // Otherwise, make the button glow.
    edge = button.ownerDocument.getElementById("edge");
    edge.style = edge.getAttribute("bright_text");
}

function mouseOut(evt) {
    "use strict";
    
    var button, highlight, edge;
    
    // Try to find the button. If unsuccessful, return without doing anything.
    button = getTarget(evt);
    if (!button) {
        return;
    }
    
    // Make the button's spectral highlight brighter to give the impression of its being released.
    highlight = button.ownerDocument.getElementById("highlight");
    highlight.style = highlight.getAttribute("bright_text");
    
    // Make the button stop glowing.
    edge = button.ownerDocument.getElementById("edge");
    edge.style = edge.getAttribute("dark_text");
}

function mouseDown(evt) {
    "use strict";
    
    var button, highlight, edge;
    
    // Try to find the button. If unsuccessful, return without doing anything.
    button = getTarget(evt);
    if (!button) {
        return;
    }
    
    // Make the button's spectral highlight darker to give the impression of its being pushed in.
    highlight = button.ownerDocument.getElementById("highlight");
    highlight.style = highlight.getAttribute("dark_text");
    
    // Make the button stop glowing.
    edge = button.ownerDocument.getElementById("edge");
    edge.style = edge.getAttribute("dark_text");
}

function mouseUp(evt) {
    "use strict";
    
    var button, highlight, edge;
    
    // Try to find the button. If unsuccessful, return without doing anything.
    button = getTarget(evt);
    if (!button) {
        return;
    }
    
    // Make the button's spectral highlight brighter to give the impression of its being released.
    highlight = button.ownerDocument.getElementById("highlight");
    highlight.style = highlight.getAttribute("bright_text");
    
    // Make the button start glowing again.
    edge = button.ownerDocument.getElementById("edge");
    edge.style = edge.getAttribute("bright_text");
}

function goBack() {
    "use strict";
    
    // Navigate to the previous page.
    window.location.href = prevPage;
}

function settings() {
    "use strict";
	
	// Go to the settings window.
    window.location.href = "../settings.html";
}