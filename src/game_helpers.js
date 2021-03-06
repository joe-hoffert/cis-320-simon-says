/*******************************************
 game_helpers.js
 Created on March 20, 2014, by Jeremy Davis
 Simon Says
 
 This file defines some helper functions for the main game logic in game.html.
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

/* Returns true if the given score would be placed on the high-score table and false otherwise. */
function isHighScore(score) {
    "use strict";
    
    var lowestScore = getHighScore(MAX_NUM_HIGHSCORES);
    
    return lowestScore === "" || lowestScore < score;
}

/* Called to end the game when the player runs out of lives. */
function gameOver() {
    "use strict";
    
    if (isHighScore(currentScore)) {
        setCurrentScore(currentScore);
        window.location.href = "../new_high_score.html";
    } else {
        window.location.href = "../highScore.html";
    }
}

/* Returns true if, according to the rules, a click of the given button is correct at this point in the sequence, and false otherwise. */
function isClickCorrect(button_number) {
    "use strict";
    
    return rules[flashingButtonSequence[numButtonsClicked]] == button_number;
}

/* Adds a random button to the end of the sequence. */
function addButtonToSequence() {
    "use strict";
    
    flashingButtonSequence[flashingButtonSequence.length] = Math.floor(Math.random() * NUM_BUTTONS);
}

/* Creates a new button sequence of the current length. */
function createNewButtonSequence() {
    "use strict";
    
    var i;
    
    flashingButtonSequence = [];
    for (i = 0; i < sequenceLength; i += 1) {
        addButtonToSequence();
    }
}

/* Returns the "id" attribute of a button given its number. */
function numberToId(number) {
    "use strict";
    
    return "button" + number;
}

/* Returns the number of a button given its "id" attribute. */
function idToNumber(id) {
    "use strict";
    
    return parseInt(id.substr("button".length), 10);
}