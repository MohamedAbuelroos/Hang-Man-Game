// letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// get Array From Lettesr
let lettersArray = Array.from(letters);

//Select Letters Container
let lettersContainer = document.querySelector(".letters");

//Generate Letters
lettersArray.forEach((letter) => {
  // creat Span
  let span = document.createElement("span");
  //Creat Letter Text Node
  let theLetter = document.createTextNode(letter);
  //Append The Letter To Span
  span.appendChild(theLetter);
  //Add Class On Span
  span.className = "letter-box";
  //Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scale",
    "html",
    "css",
    "python",
    "mysql",
  ],
  movies: [
    "doctor strange",
    "avengers",
    "thor",
    "twilight",
    "prestige",
    "bloodshot",
  ],
  people: ["mark", "edeson", "cleopatra", "ghandi", "magdy yakoub"],
  countries: ["egypt", "syria", "palastine", "qatar", "bahrain", "yemen"],
};
//Get Random Property
let allKeys = Object.keys(words);
//Random Nymber Depend on Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
//Category
let randomPropName = allKeys[randomPropNumber];
//Category words
let randomPropValue = words[randomPropName];
//Random Nymber Depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// The Chosen word
let randomValueValue = randomPropValue[randomValueNumber];
// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

//Creat Spans Depen on Word
lettersAndSpace.forEach((letter) => {
  // Creat Empty Span
  let emptySpan = document.createElement("span");
  // if letter is space
  if (letter === " ") {
    //Add Class To The Span
    emptySpan.className = "has-space";
  }

  // Append Span To The Letter Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});
// Select Gues Spans
let guessSpans = document.querySelectorAll(".letters-guess span");
//Set Wrong Attemptes
let wrongAttemptes = 0;

//Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");
// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  //Set The Chose Status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    //get clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    //The Chosen Word
    // console.log(lettersAndSpace)
    lettersAndSpace.forEach((wordletter, wordIndex) => {
      // if the clicked letter equal to one of the chosen word letter
      if (theClickedLetter == wordletter) {
        //Set Status To Correct
        theStatus = true;
        //Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = wordletter;
          }
        });
      }
    });
    //Outside Loop
    // If Letter Is Wrong
    if (theStatus !== true) {
      //Increase The Wrong Attemptes
      wrongAttemptes++;
      //Add Class Wrong on The Draw Element
      theDraw.classList.add(`wrong-${wrongAttemptes}`);
      //Play Fail Sound
      document.getElementById("fail").play();

      if (wrongAttemptes === 8) {
        endGame();
      }
    } else {
      document.getElementById("success").play();
    }
  }
  let allGuessed = [];
  guessSpans.forEach(function (spanss) {
    if (spanss.innerHTML !== "") {
      allGuessed.push(spanss.innerHTML);
    }
  });
  if (allGuessed.join("") === randomValueValue.split(" ").join("")) {
    success();
  }
});

function success() {
  document.getElementById("succesed").play();
  let succesed = document.querySelector(".succesed");
  succesed.style.display = "flex";
}

function endGame() {
  lettersContainer.classList.add("finished");
  document.getElementById("failed").play();
  let failed = document.querySelector(".failed");
  failed.innerHTML = `${failed.innerHTML} ${randomValueValue.toUpperCase()}`;
  failed.style.display = "flex";
}
// console.log(randomValueValue);
