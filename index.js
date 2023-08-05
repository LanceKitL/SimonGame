// JavaScript: Create arrays to store game patterns and user patterns
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false; // Variable to track if the game has started or not
var level = 0; // Variable to keep track of the current level

// Use jQuery to detect when a keyboard key has been pressed
$(document).keypress(function (event) {
    // If the game has not started, call nextSequence() and change the h1 title to "Level 0"
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
    // Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    // Add the contents of the variable userChosenColour created above to the end of the new userClickedPattern array
    userClickedPattern.push(userChosenColour);

    // Play the corresponding sound for the clicked button
    playSound(userChosenColour);

    // Call a function to handle the user's response and check the pattern
    checkAnswer(userClickedPattern.length - 1);

    // Animate the button press
    animatePress(userChosenColour);
});

function animatePress(currentColour) {
    // Add the "pressed" class to the button
    $("#" + currentColour).addClass("pressed");

    // Use JavaScript to remove the "pressed" class after 100 milliseconds
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    level++; // Increase the level by 1 every time nextSequence() is called
    $("#level-title").text("Level " + level); // Update the h1 with the change in the value of level

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Apply animations to the randomly chosen color button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play the corresponding sound
    playSound(randomChosenColour);

    // Reset userClickedPattern for the next level
    userClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {
    // Check if the most recent user answer is the same as the game pattern.
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success!");

        // Check if the user has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            // If the user got the whole sequence right, proceed to the next level after a delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong!");
        // Handle an incorrect move here if needed.
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);
        // Game over logic here - Call a function to restart the game
        startOver();
    }
}

function startOver() {
    // Reset all the game variables to start over
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    $("#level-title").text("Press A Key to Start");
}
