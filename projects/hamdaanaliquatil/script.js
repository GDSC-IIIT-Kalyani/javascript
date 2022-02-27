"use strict";
var count=1;
let e;
const words=[
    {
      word:"nehru",
      hint : ["I am the first elected leader of my country",
                "A Tryst with Destiny",
                "I am from South East Asia",
            "I am a lawyer by profession",
        "India"],
    },
    {
      word:"putin",
      hint: ["I was a spy",
                "Nato is my worst nightmare",
                "I dream of USSR reunification",
            "I started WW3",
        "I am the President of Russia"],
    },
    {
      word:"wuhan",
      hint: ["I am a city in Asia",
                "A city that changed your life forever",
                "I have a pandemic named after me",
                "Located in China",
                "I'm infamous for Bats",
                 ],
    },
    {
      word:"nixon",
      hint: ["I'm not a crook",
                "Watergate",
                "I am the 37th president of my country",
                "I am a Republican at heart",
            "USA"],
    },
    {
      word:"obama",
      hint: ["Hello Texas",
                "I bomb countries and still get away with it",
                "I am the 44th president of my country",
                "I am a Democratic at heart",
            "USA"],
    },
    {
      word:"adani",
      hint: ["I am an Indian billionaire industrialist and philanthropist",
                "Infamous for the farm laws",
                "3rd Indian conglomerate to cross 100 bn. market cap",
            "Neck is deep in debt",
            "An ecosystem named after me",
        ],
    },
    ]

    const showhint = function(e){
        const hints= document.querySelector(".hint")
        const li=document.createElement("li")
        li.classList.add("hint"+count)
        li.classList.add("lihint")
        li.innerHTML=words[e].hint[count-1]
        hints.appendChild(li)
        console.log(words[e].hint)
     }

var lettersPattern = /[a-z]/,
    currentGuessCount = 1,
    currentGuess = document.querySelector("#guess" + currentGuessCount),
    // words = ["nehru", "putin", "wuhan", "nixon", "obama", "italy", "adani"],
    
    
    solutionWord = "",
    chooseWord = function () {
        e = Math.floor(Math.random() * (words.length - 1)) + 1;
        solutionWord = words[e].word
        showhint(e)
    };
chooseWord(), document.addEventListener("keydown", (function (e) {
    var t = e.key;
    currentGuessCount < 7 && (1 == t.length && lettersPattern.test(e.key) && currentGuess.dataset.letters.length < 5 ? updateLetters(t) : "Backspace" == e.key && "" != currentGuess.dataset.letters ? deleteFromLetters() : "Enter" == e.key && 5 == currentGuess.dataset.letters.length && submitGuess())
}));
var submitGuess = function () {
        for (var e = function (e) {
                setTimeout((function () {
                    revealTile(e, checkLetter(e))
                }), 200 * e)
            }, t = 0; t < 5; t++) e(t)
    },
    checkIfGuessComplete = function (e) {
        4 == e && checkWin()
    },
    jumpTiles = function () {
        for (var e = function (e) {
                setTimeout((function () {
                    document.querySelector("#guess" + currentGuessCount + "Tile" + (e + 1)).classList.add("jump")
                }), 200 * e)
            }, t = 0; t < 5; t++) e(t)
            
    },
    count=0,
    checkWin = function () {
        console.log("test1")
        solutionWord == currentGuess.dataset.letters ? setTimeout((function () {
            jumpTiles()
        }), 500) : (currentGuessCount += 1, currentGuess = document.querySelector("#guess" + currentGuessCount), count++, showhint(e), 7 == currentGuessCount && setTimeout((function () {
            showSolution()
        }), 500))
    },
    showSolution = function () {
        alert("Better luck next time. The solution was: " + solutionWord)
    },
    updateLetters = function (e) {
        var t = currentGuess.dataset.letters + e,
            s = t.length;
        currentGuess.dataset.letters = t, updateTiles(s, e)
    },
    updateTiles = function (e, t) {
        var s = document.querySelector("#guess" + currentGuessCount + "Tile" + e);
        s.innerText = t, s.classList.add("has-letter")
    },
    deleteFromLetters = function () {
        var e = currentGuess.dataset.letters,
            t = e.slice(0, -1);
        currentGuess.dataset.letters = t, deleteFromTiles(e.length)
    },
    deleteFromTiles = function (e) {
        var t = document.querySelector("#guess" + currentGuessCount + "Tile" + e);
        t.innerText = "", t.classList.remove("has-letter")
    },
    checkLetter = function (e) {
        var t = currentGuess.dataset.letters.charAt(e);
        return t == solutionWord.charAt(e) ? "correct" : checkLetterExists(t) ? "present" : "absent"
    },
    checkLetterExists = function (e) {
        return solutionWord.includes(e)
    },
    revealTile = function (e, t) {
        flipTile(e + 1, t), checkIfGuessComplete(e)
    },
   

    flipTile = function (e, t) {
        var s = document.querySelector("#guess" + currentGuessCount + "Tile" + e);
        s.classList.add("flip-in"), setTimeout((function () {
            s.classList.add(t)
        }), 250), setTimeout((function () {
            s.classList.remove("flip-in"), s.classList.add("flip-out")
        }), 250), setTimeout((function () {
            s.classList.remove("flip-out")
        }), 1500)
    };
