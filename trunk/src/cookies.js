/*******************************************
 cookies.js
 Created on March 25, 2014, by Jeremy Davis
 Simon Says
 
 This file all functions related to cookies.
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

var IMMORTAL_COOKIE_YEARS, MAX_NUM_HIGHSCORES;
IMMORTAL_COOKIE_YEARS = 1000;
MAX_NUM_HIGHSCORES    = 10;

/* A helper function for changing a string so it will be written correctly in HTML.
   Code taken from http://stackoverflow.com/questions/5251520/how-do-i-escape-some-html-in-javascript */
function escapeHTML(string)
{
    var pre = document.createElement("pre");
    var text = document.createTextNode(string);
    pre.appendChild(text);
    return pre.innerHTML;
}

/* Sets the value of the specified cookie. If the expiry is undefined, the cookie will expire when the browser is closed.
   The path points to the file or directory in which the cookie can be accessed ("/" for the whole site). An undefined path
   means only the currently running file can access the cookie. */
function setCookie(cookieName, value, expiry, path) {
    "use strict";
    
    var cookieString = cookieName + "=" + value;
    
    if (expiry !== undefined) {
        cookieString += "; expires=" + expiry;
    }
    
    if (path !== undefined) {
        cookieString += "; path=" + path;
    }
    
    document.cookie = cookieString;
}

/* Returns the value of the specified cookie, or "" if the cookie does not exist.
   This implementation is based on that found at http://www.w3schools.com/js/js_cookies.asp. */
function getCookie(cookieName) {
    "use strict";
    
    var allCookies, i, cookie;
    
    // The cookies are storied in a single semicolon-separated string of name-value pairs ("cookie1=value1; cookie2=value2; ...").
    allCookies = document.cookie.split(';');
    
    cookieName += "=";
    
    for (i = 0; i < allCookies.length; i += 1) {
        cookie = allCookies[i].trim();
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    
    return "";
}

/* A convenience method for setting a rule. Each argument should be an integer from 0 to one less than the number of game buttons. */
function setRule(buttonFlashed, buttonPressed) {
    "use strict";
    
    var date = new Date();
    date.setFullYear(date.getFullYear() + IMMORTAL_COOKIE_YEARS); // The rule should never expire.
    
    setCookie("simon_rule" + buttonFlashed, buttonPressed, date, "/");
}

/* A convenience method for getting a rule. The argument should be an integer from 0 to one less than the number of game buttons.
   Returns the number, in the same range, of the button that should be pressed in response to the given button being flashed. */
function getRule(buttonFlashed) {
    "use strict";
    
    var cookie, PARSE_DECIMAL;
    cookie = getCookie("simon_rule" + buttonFlashed);
    PARSE_DECIMAL = 10;
    
    // If the rule has not been set yet, set the default rule.
    if (cookie == "") {
        setRule(buttonFlashed, buttonFlashed);
        return buttonFlashed;
    }
    
    return parseInt(cookie, PARSE_DECIMAL);
}

/* A convenience method for getting the current score so that it will not be lost between pages. */
function getCurrentScore() {
    "use strict";
    
    var cookie = getCookie("simon_currentscore");
    
    if (cookie !== "") {
        return parseFloat(cookie);
    }
    
    return "";
}

/* A convenience method for setting the current score so that it will not be lost between pages.
   score must be a number. */
function setCurrentScore(score) {
    "use strict";
    
    setCookie("simon_currentscore", score, undefined, "/");
}

/* A convenience method for getting a high score. The rank should be in the range [1, MAX_NUM_HIGHSCORES].
   Returns the score as a number if it exists or "" if not. */
function getHighScore(rank) {
    "use strict";
    
    var cookie = getCookie("simon_highscore" + rank);
    
    if (cookie !== "") {
        return parseFloat(cookie);
    }
    
    return "";
}

/* A convenience method for getting the name associated with a high score. The rank should be in the range [1, MAX_NUM_HIGHSCORES].
   Returns the name if it exists or "" if not. */
function getHighScoreName(rank) {
    "use strict";
    
    return getCookie("simon_highscorename" + rank);
}

/* A convenience method for setting a high score. The rank is automatically calculated. Name should be the user's name,
   and score should be the score that the user attained. */
function setHighScore(name, score) {
    "use strict";
    
    var date, rank, cookie;
    
    date = new Date();
    date.setFullYear(date.getFullYear() + IMMORTAL_COOKIE_YEARS); // The high score should never expire.
    
    // Shift all the lower scores down before inserting this one.
    for (rank = MAX_NUM_HIGHSCORES + 1; rank > 1; rank -= 1) {
        cookie = getHighScore(rank - 1);
        
        if (cookie === "") {
            continue;
        }
        
        if (parseFloat(cookie) >= score) {
            break;
        }
        
        if (rank <= MAX_NUM_HIGHSCORES) {
            setCookie("simon_highscorename" + rank, getHighScoreName(rank - 1), date, "/");
            setCookie("simon_highscore" + rank, cookie, date, "/");
        }
    }
    
    if (rank <= MAX_NUM_HIGHSCORES) {
        setCookie("simon_highscorename" + rank, escapeHTML(name), date, "/");
        setCookie("simon_highscore" + rank, escapeHTML(score), date, "/");
    }
}