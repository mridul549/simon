var buttonColors = ["red","blue","yellow","green"];

var gamePattern = [];
var userClickedPattern = [];

var level=0;
var started=false;

$(".btn").click(function() {
    userClickedPattern.push(this.id);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer();
})

$(document).keypress(function () {
    if(!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})

function nextSequence () {
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomColorChosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);

    $("#"+randomColorChosen).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
}

function animatePress (currentColor) {
    $("."+currentColor).addClass("pressed");
    setTimeout(function() {
        $("."+currentColor).removeClass("pressed");
    },100);
}

function playSound(name) {
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function checkAnswer() {
    var index=userClickedPattern.length-1;
    if(userClickedPattern[index]===gamePattern[index])
    {
        if (userClickedPattern.length===gamePattern.length) {
            userClickedPattern=[];
            setTimeout(function() {
                nextSequence();
            },1000)
        }
    }
    else {
        wrongAnswer();
    }
}

function wrongAnswer() {
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200)
    $("#level-title").text("Game Over, press any key to start");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    gamePattern=[];
    userClickedPattern=[];
    started=false;
    level=0;
}