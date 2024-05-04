// click on start reset button
  //check if we are playing?
    //if YES -> reload the page
    // if NO -> show trialsLeft box , change button text to reset game,1. 1,1. create random fruits a
    // we can set speed of fruits going down by each step by ourselves also
    // move fruit down by one step in loop every 30 sec
// check if fruit is too low
    // if NO -> repoeat 1.
    // if YES -> check if any trials are left?
        //   yes -> repeat 1.
        //  no -> show game over message and change button text to start game

// if we slice a fruit 
   //Apply sound in background and explode the fruit

//    wrapping entire code in document ready function

var playing = false;
var score ;
// creating an array of fruit images so as to access them randomly for the game
var fruits = ['apple','cherries','grapes','orange','pineapple'];
// creating a trials left variable to twll how many trials are left
var trialsLeft;
var step;
var action;
$(function (){

    //  accessing button using its id
    $("#startreset").click(function(){
       //if we are playing already
       if(playing == true){
        //    reload the page
        loaction.reload();
       }
       else{
        // we are not playing
        // setting playing to true , once we start playing
        playing = true;
        // set initial score to zero
        score = 0;
        $("#scorevalue").html(score);
        // showing trials left box as soon as the game starts 
        $("#trialsLeft").show();
        // initializing trialsLeft variable with 3 
        trialsLeft = 3;
        // appending no. of hearts equal to no. of trials left
        // calling addHearts() function which is defined later
        addHearts();

        // hiding GameOver Box after we restart the game
        $("#gameOver").hide();

        // changing button text to reset game
        $("#startreset").html("Reset Game")

        // creating random fruits and moving them one step down
        // placing everything in 1. inside a function  later and calling that function here

         startAction();        
       }
    }); 
    // startREset closed

    // fruit slicing code -> when we do mouseover on any fruit, it is sliced
    $("#fruit1").mouseover(function(){
    //    increasing score by 1 
        score++;
   
        // changing value of score to updated value of score
        $("#scorevalue").html(score);

        // playing audio, once we slice fruits -> accessing audio using 2ways
        // M-1 -> using getElementById
        // document.getElementById(sliceSound).play();
        //  M-2 -> usinmg jQuery Selector
        $("#sliceSound")[0].play();

        //  slice a fruit -> fruit stops going down , it explodes and we hide it through animation
        // stopAction()stops fruit from going down and also hides the fruit
        // clearInterval(action) will only stop the fruit
        clearInterval(action);
        
        // hide fruit 
        // here we've used 2 parameeters for hide() funcytion . This cannot be done by jquery , so we need jquery ui for this purpose and hence we embed it using google CDN
        $("#fruit1").hide("explode" , 500);
        
        // send new fruit after explosion
        setTimeout(startAction , 800);
    });




// defining function addHearts to add hearts in trialsLeft box
function addHearts(){
    
    // empty trialsBox first everytime
    $("#trialsLeft").empty();
        for(i=0 ; i<trialsLeft;i++){
            $("#trialsLeft").append('<img src="images/trialsLeftHeart.png" class = "life"> ');
    }   
}

// ess function k andr saare steps of 1.ka code h 
function startAction()
{
    // $("#fruitsContainer").append('<img src="images/apple.png" class="fruit">');
    // rather than appending, we 'll use new element created in indexx.html file
    // accessing fruit once we start the game
    $("#fruit1").show();
    // giving a source attribute to images of fruits inside a function chooseFruits() defined later
    chooseFruit();  
    // for random horizontal positioning of fruits, we change left property to be any value between the width of fruitsContainer
    $ ("#fruit1").css({'left' : Math.round(550*Math.random()) , 'top' : -50});

    // generate a random step for fruits to move down
     step = 1 + Math.round(5*Math.random());
    //  moving fruit down every 10 milliseconds
    action = setInterval(function(){
        // new value of top will be -> original value of top(by using position() function + one step every 10 ms)
        $("#fruit1").css('top' , $("#fruit1").position().top + step);
// check if fruit is too low -> if top parameter of freuit becomes less than height of fruitContainer, then it is considered too low
    if($("#fruit1").position().top > $("#fruitsContainer").height()){
        // check  if trials are left or not
        if(trialsLeft > 1){
            // repeating fruit generation as above -> same code

            $("#fruit1").show();       
            chooseFruit();  
            $ ("#fruit1").css({'left' : Math.round(550*Math.random ()) , 'top' : -50});
            step = 1 + Math.round(5*Math.random());

            // if we miss out on a fruit -> we reduce no. of TrialHearts and then we use add hearts() fnxn is used to put accurate no. of hearts
            trialsLeft--;

            addHearts();

        }
        else{
            // game Over
            playing = false;
            $("#startreset").html("Start Game");
            $("#gameOver").show();
            $("#gameOver").html('<p>Game Over!</p> <p>Your Score is:'+ score +  ' </p>');

            // hiding trialsLeft box when game is over
            $("#trialsLeft").hide();

            // since game is over, we don't need to dropour fruits anymore, so we stop interval
             stopAction();

        }
    }
    },10);
}

function chooseFruit()
{
//   $("#fruit1").attr('src' , 'images/apple.png');
$("#fruit1").attr('src' , 'images/'+ fruits[Math.round(4* Math.random())] + '.png');
} 

// to stop fruits from dropping when game is over
function stopAction()
{
    clearInterval(action);
    $("#fruit1").hide();
}

});
