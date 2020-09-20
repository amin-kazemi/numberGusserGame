/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/


//Game values

//Since our values are changeble we use let and also we can declar our value in short form group like this instead of declar let for each values
let min = 1,
    max = 10,
    guessesLeft = 3,
    winningNum = getRandomNum(min,max);
    //for now i set it 2 but we need to set a function to genarat it randomly later


//UI Elements or Variables
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


//Assign Ui min and max 

//By assigning the ui min and max ,now it is dynamic so we can delete the numbers from html.
minNum.textContent = min;
maxNum.textContent = max;     


//Play agian event listeners  => we uses mousedown event instead of click because ,As soon as we release the mouse button then it basically clicks on play again automatically.So we want it to be just the mouse down not a click.
game.addEventListener('mousedown', function(e){

  if(e.target.className === 'play-again')
  window.location.reload();
})//now everything is fine lets set a function to genarat random num


//Listen for guess (submit)
guessBtn.addEventListener('click', function(){

  // when we do our comparison and stuff what we need the value come from the guessInput filed to be a number so we need to change the input value as number by using parseInt() method.
  let guess = parseInt(guessInput.value);

  //So now we want to validate our input,So we need a conditional here and we basically want to check to make sure that it's not blank. We want to make sure that it's not less than the minimum or higher than the maximum.

  //So usually we check :if guest is equal to empty string, but since we're using parsingINT it is as an integer it returns  NAN ,means not a number if we dont input value in guessInput. so for checking that we have method isNAN()

  //Validte
  if(isNaN(guess)  || guess < min || guess > max){
    //set message callback function
    //or u can const msg = `Please enter a number between ${min} and ${max}`; => setMessage(msg);
    //inorder to function work correctly we have 2 way=>1) return the value  2) or for wining logic use (else if)

    //we can do this 
    // const msg = `Please enter a number between ${min} and ${max}`;
    // return setMessage(msg, 'red');


    //or do this 
     setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  //check if won
   else if(guess === winningNum){
    
    //Game Over - Won

     gameOver(true, `Congratulation ${winningNum} is correct, YOU WON!`);


    // //set message
    // setMessage(`Congratulation ${winningNum} is correct, YOU WON!`, 'green');
    // //desiable input
    // guessInput.disabled = true;

    // //set border 
    // guessInput.style.borderColor = 'green';

    
    //check if lose
  }else{

    //Wrong num: if they lose then we want to subtract one from the guesses left.
    guessesLeft -= 1 ; //or guessesleft = gussesLeft - 1 ;

    // then we want to check to see if there's any guesses left.
    if(guessesLeft === 0){
      // Game Over - Lost
      gameOver(false, `Game Over,YOU LOST! The answer was ${winningNum}`);

      //set message
      // setMessage(`Game Over, YOU LOST! The answer was ${winningNum}`, 'red');
      // //desiable input
      // guessInput.disabled = true;

      // //set border 
      // guessInput.style.borderColor = 'red';


    }else{
      //Game Countinues - answer wrong
      //this is when they guess  wrong but the game is not over.

      //set message to tell the user it is the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      //set border 
      guessInput.style.borderColor = 'red';
      
      //Clear input when the num is not correct
      guessInput.value = '';

      
    }
 }

});



//gameOver function  in orther to prevent repitition of setting color/borderColor..etc.

function gameOver(won, msg){

  //now i write the condition if they win color become green if not red

  let color;

  won === true ? color = 'green' : color = 'red';

  //set message
  setMessage(msg);
  //desiable input
  guessInput.disabled = true;

  //for color we write the logic on the top => let color;won === true ? color = 'green' : color = 'red';

  //set color
  message.style.color = color;  
  //set border 
  guessInput.style.borderColor = color;



  //at the end , once the game is over we want the option to play again so we're going to go to our game over function 

  //Play again ?
  guessBtn.value = 'Play Again?'

  //And I also want to add a class to it because we need to add a new event handler for this new version of this button.

  guessBtn.className += 'play-again'; //i used append

  //OK so now we need an event listener for a play again.so i write it on top. **** since this class was added after the page loads we need to use event delegation meaning we have to add the listener onto a parent, And then we need to search for the target that we want, which is the play again.
}


// getRandomNum function
function getRandomNum(min,max){

  return(Math . floor(Math . random() * (max - min + 1) + min));
  //So what we're doing here is we're taking max take away min which is 10.Take away 1 which would be 9 plus 1 which would be 10.So this itself will give us between 0 and 9.
  //But if I keep reloading you'll see 0 up to 9 you won't see 10.So what we want to do is we want to add the min.Now we're adding min because the min might not be one. we said it to 1 but it could be between five and 10, so you don't want to use plus 1.You want to use whatever your minimum value is.So now we save it's going to be between 1 and 10.You just saw a 10.
}



//Set message function
// I can add another parametr COLOR ,so when the user inputs, is correct color of text become green and if it was false it become red or for each logic add seprate color style logic
function setMessage(msg, color){

  message.textContent = msg;

  //set color
  message.style.color = color;

  //set border red
  guessInput.style.borderColor = color;
}






//at the end , once the game is over we want the option to play again so we're going to go to our game over function 