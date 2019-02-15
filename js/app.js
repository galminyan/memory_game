
/*********************************variables***********************************/
//Create a list that holds all of your cards
const cards = ['fa-gem', 'fa-fighter-jet',
               'fa-anchor', 'fa-bolt', 
               'fa-cube', 'fa-leaf', 
               'fa-bicycle', 'fa-bomb',
               'fa-gem', 'fa-fighter-jet', 
               'fa-anchor', 'fa-bolt', 
               'fa-cube', 'fa-leaf', 
               'fa-bicycle', 'fa-bomb'];

const counterMoves = document.querySelector('.moves');
let moves = 0;
let num = 3;
const counterTime = document.querySelector('.seconds');
const counterTime2 = document.querySelector('.minutes');
let time = 0
let second;
let minute;
let firstClick = false;

const allStars = document.querySelectorAll('.fa-star'); 

let cardHtml;
let textrrrr;
let allCards;
let deck;

/*********************Top initial steps for the game****************************/

//the tamplate of 'li' in the 'ul' 
function createGridCards(card) {
    return  `<li tabindex="0" class="card" data-icon="${card}"><i class="fa ${card}"></i></li>`
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//using the shuffle function on my cards
function shuffleCards() {
        cardHTML = shuffle(cards).map(function(card) {
        return createGridCards(card);
    }); 
}

//start a new game
function initGame() { 
    shuffleCards();   
    deck = document.querySelector('.deck');
    deck.innerHTML = cardHTML.join('');
    //start the timer when the deck first clicked
    deck.addEventListener('click', foo);
    function foo() {
        firstClick = true;
        startTimer();
        deck.removeEventListener('click', foo);
    }
    chooseCards();
    clickToStart.style.display = "none";
};

//button to start the first game
const clickToStart = document.querySelector('.start');
clickToStart.addEventListener('click',initGame);

/************************************score-panel*******************************/
//restart button
const startOver = document.querySelector('.restart');
startOver.addEventListener('click', restart);

function restart() {
    initGame();
    openCards = [];
    resetTimer();
    hideMatchCards();//reset cards
    moves = 0;
    num = 3;
    counterMoves.innerText = moves; //reset moves
    time = 0;
    counterTime.innerHTML = '00' ; //reset timer
    counterTime2.innerHTML = '00' ; //reset timer
    allStars.forEach(function(star) {   //reset rating stars
        if (star.classList.contains('far')) {
            star.classList.toggle('fas');
            star.classList.toggle('far');
        };        
    });
}

//stars rate
function ratingStars() {     
    if (moves == 12){
        allStars[2].classList.toggle('fas');
        allStars[2].classList.toggle('far');
        num-=1;
    }
    if (moves == 18){
        allStars[1].classList.toggle('fas');
        allStars[1].classList.toggle('far');
        num-=1;
    }
}


// start the timer with the first click
function startTimer(){
    
    if (firstClick != false){
        console.log('timerstart');
        timer = setInterval(function() {
        time++; 
        second = (time % 60);
        minute = parseInt(time / 60);
        if (second < 10) {
            second = `0${(time % 60)}`;
        }
        // if minutes < 10 add a 0 before the minutes
        if (minute < 10) {
            minute = `0${parseInt(time / 60)}`;
        }
        counterTime.innerHTML = second;
        counterTime2.innerHTML = minute;

        },1000);
    }
}

// stop the timer
function resetTimer() {
    clearInterval(timer);
}

/*************************************The cards*****************************/
 // create an array to collect the open cards
let openCards = [];
// open and show the cards that have been clicked
let matchCards = [];

function chooseCards() {
    // select all elements with the class 'card'
    allCards = document.querySelectorAll('.card');
    allCards.forEach(function(card) {
        card.addEventListener('click', function cardOpens() {
            // the possibillity to click only on hidden cards
            console.log('card was clicked');
            if (!card.classList.contains('open') && !card.classList.contains('show')  && 
            !card.classList.contains('match')) {
                openCards.push(card);
                card.classList.add('open', 'show');
                //check if there is a match!
                matchingCards()
                if (matchCards.length == 16) {
                    resetTimer();
                    winText();
                    openModal();
                }
            };
        });
     });
}



// check if the two open cards are equal and counts the moves
function matchingCards() {          
    if (openCards.length >= 2){
       allCards.forEach(function(card) {
           card.style.pointerEvents = "none";
        });
        if (openCards[0].dataset.icon == openCards[1].dataset.icon){
           openCards[0].classList.add('match');
           openCards[1].classList.add('match');
           matchCards.push(...openCards);
           openCards = [];
           allCards.forEach(function(card) {
               card.style.cssText = "pointer-events: auto;"
           });
       }else{
           openCards[0].classList.add('oops');
           openCards[1].classList.add('oops');
           setTimeout (hideOpenCards, 800);
       }
    moves += 1;
    counterMoves.innerText = moves; 
    ratingStars();
    }
};


// hide the open cards by removing their classes
function hideOpenCards() {
    allCards.forEach(function(card){
        card.classList.remove('open', 'show', 'oops');
        card.style.cssText = "pointer-events: auto;"
    });
    
    openCards = [];
}


// hide all the cards by removing their classes 
function hideMatchCards() {
    allCards.forEach(function(card){
       card.classList.remove('open', 'show', 'match');
        card.style.cssText = "pointer-events: auto;"
       
    });
    matchCards = [];
}

/****************************winning the game****************************/

// Get the modal
const modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
const closeModal = document.getElementsByClassName("close")[0];
const playAgain = document.querySelector(".startAgain");

function openModal() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

playAgain.onclick = function () {
    restart();
    modal.style.display = "none";
}
    
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const yourScore = document.querySelector('.announcement');


function winText() {
    yourScore.innerHTML = 
    `<p><span class="winwin">You win the game:
    <i class="fas fa-award"></i></span>
    <br><br>
    <span class="winwin">Your time is ${minute} minutes and ${second} secondes
    <i class="fa fa-clock"></i></span>
    <br>
    <span class="winwin">You did ${moves} moves
    <i class="fas fa-shoe-prints"></i>  </span>
    <br>
    <span class="winwin">You left with ${num} stars of rating!
    <i class="fas fa-star"></i></span>
    <br><br>
    <span class="winwin">Close or Play Again...</span>
    </p>`
}

/****************************************************************************/
