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

/* Sets the value of the specified cookie. The cookie will only expire when the browser is closed. */
function setCookie(cookieName, value) {
    "use strict";
    
    document.cookie = cookieName + "=" + value;
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
