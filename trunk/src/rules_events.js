/*******************************************
 rules_events.js
 Created on March 27, 2014, by Ben Emrick
 Copied from button_events.js
 Simon Says
 
 This file defines some callback functions for events that buttons can trigger (like when they are depressed).
 *******************************************
 Copyright 2014 Chris Devers
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 *******************************************/
 
/* Forces the given element to be redrawn. Needed for Webkit-based browsers. */
function forceRedraw(el) {
    "use strict";
    
    var t = el.ownerDocument.createTextNode(' ');
    el.appendChild(t);
    setTimeout(function() { el.removeChild(t); }, 0);
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
    edge.setAttribute("style", edge.getAttribute("bright_text"));
    
    forceRedraw(button);
}

function mouseOut(evt) {
    "use strict";
	return;
}

function mouseDown(evt, darkenEdge) {
    "use strict";
	
    var target, button, highlight, edge;
    
    darkenEdge = typeof darkenEdge !== "undefined" ? darkenEdge : true;
    
    // Try to find the button. If unsuccessful, return without doing anything.
    target = getTarget(evt);
    if (!target) {
        return;
    }
    button = getButton(target);
	if (!button) {
	    return;
	}
	
	// Make the button's spectral highlight darker to give the impression of its being pushed in.
    highlight = target.ownerDocument.getElementById("highlight");
    highlight.setAttribute("style", highlight.getAttribute("dark_text"));
	
	// Logic check for buttons
	// All other buttons in the row are lightened, or returned to their normal state
	// All other buttons in the column are lightened, or returned to their normal state
	massLighten(button);
	
    if (darkenEdge) {
        // Make the button stop glowing.
        edge = button.ownerDocument.getElementById("edge");
        edge.setAttribute("style", edge.getAttribute("dark_text"));
    }
    forceRedraw(button);
}

/* ----------------------------------------------------------------------------------------------------------------------*/
/* The following section containes helper functions                                                                      */
/* ----------------------------------------------------------------------------------------------------------------------*/

/* Returns the button that created the given event. Returns false on failure. */
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

function darken(id) {
	"use strict";
	
	var highlight;
	highlight = document.getElementById(id).getSVGDocument().getElementById("highlight");
    highlight.setAttribute("style", highlight.getAttribute("dark_text"));
}

function lighten(id) {
	"use strict";
	
	var highlight;
	highlight = document.getElementById(id).getSVGDocument().getElementById("highlight"); 
	highlight.setAttribute("style", highlight.getAttribute("bright_text"));
}

function recallRules() {
    "use strict";
    
    var i, rule;
    
    for (i = 0; i < NUM_RULES; i += 1) {
        rule = getRule(i);
        darken(("button" + rule) + i);
    }
}

function isPressed(id) {
	"use strict";
	
	var highlight; 
	highlight = document.getElementById(id).getSVGDocument().getElementById("highlight");
	return highlight.getAttribute("style") == highlight.getAttribute("dark_text");
}

function massLighten(button) {
	"use strict";
	
	var i, j, buttonXCoordinateStart, buttonYCoordinateStart, x, y, x2, y2;

	// ButtonXY where x is column and y is row
	// buttonXCoordinateStart and the 'y' version parse through "buttonXY" to get the numbers from the id
	buttonXCoordinateStart = 6;
	buttonYCoordinateStart = buttonXCoordinateStart + 1;
	x = parseInt(button.id.charAt(buttonXCoordinateStart));
	y = parseInt(button.id.charAt(buttonYCoordinateStart));
	
	// Lightens everything in the same row as the button pressed
	for (i = 0; i < NUM_RULES; i += 1) {
	    if (i != x && isPressed(("button" + i) + y)) {
		    lighten(("button" + i) + y);
		    x2 = i;
			break;
		}
	}
	
	// Lightens everything in the same column as the button pressed
	for (j = 0; j < NUM_RULES; j += 1) {
		if (j != y && isPressed(("button" + x) + j)) {
			lighten(("button" + x) + j);
			y2 = j;
			break;
		}
	}
	
	// Establish a rule for use in the game
	// First value is the color of the button that will be flashed in game, second is the one to be pressed
	setRule(y, x);
	setRule(y2, x2)	
	darken(("button" + x2) + y2);
}

function getButton(target) {
     "use strict";
	 
	 var i, j;
     var button;

     for (i = 0; i < NUM_RULES; i += 1) {
         for (j = 0; j < NUM_RULES; j += 1) {
             button = document.getElementById(("button" + i) + j);

             if (button.getSVGDocument() === target.ownerDocument) {
                 return button;
             }
         }
     }

     return null;
}

/* ----------------------------------------------------------------------------------------------------------------------*/
/* End of helper function section																						 */
/* ----------------------------------------------------------------------------------------------------------------------*/

function goBack() {
    "use strict";
    
    // Navigate to the previous page.
    window.location.href = prevPage;
}