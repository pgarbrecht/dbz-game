// When the page loads, open the welcome popup
var popup = document.getElementById("welcomePopup"); 
window.onload = function welcome() {
     popup.classList.toggle("show");
  };

//Variables and event listeners for character selection
const gokuChoice = document.querySelector("#goku");
const vegetaChoice = document.querySelector("#vegeta");
const gohanChoice = document.querySelector("#gohan");
const trunksChoice = document.querySelector("#trunks");

gokuChoice.onclick = function() {
    createPlayer("Goku",["/imgs/goku/neutral.png","/imgs/goku/attack.png","/imgs/goku/fallen.png"]);
}
vegetaChoice.onclick = function() {
    createPlayer("Vegeta",["/imgs/vegeta/neutral.png","/imgs/vegeta/attack.png","/imgs/vegeta/fallen.png"]);
}
gohanChoice.onclick = function() {
    createPlayer("Gohan",["/imgs/gohan/neutral.png","/imgs/gohan/attack.png","/imgs/gohan/fallen.png"]);
}
trunksChoice.onclick = function() {
    createPlayer("Trunks",["/imgs/trunks/neutral.png","/imgs/trunks/attack.png","/imgs/trunks/fallen.png"]);
}

//Class for characters
class Player {
    //static property to remember # of players created
    static lastPlayerNumber = 0;

    constructor(character,images,playerNumber,hp) {
        this.character = character || ""
        this.images = images || []
        this.playerNumber = ++Player.lastPlayerNumber
        this.hp = hp || 100
    }
}

//variables to help keep track of and assign players
let charactersOnscreen = 0;
let players = [];
let p1;
let p2;

//Create new object from class when character chosen
function createPlayer(character,images) {
    const p = new Player(character,images); 
    players.push(p);
    charactersOnscreen += 1;
    removeWelcome();
}

//Remove the pop up once 2 players created
function removeWelcome() {
    if (charactersOnscreen > 1) {
        popup.style.display = "none";
        startGame();
    }
}

//elements needed once game starts
const p1Info = document.querySelector(".p1-info");
let p1Image = document.querySelector(".p1-image");
const p1Name = document.querySelector(".p1-name");
let p1HP = document.querySelector(".p1-hp");

const prompt = document.querySelector(".prompt");
const promptText = document.querySelector(".prompt-text");
const attackImage = document.querySelector(".attack-image");

const p2Info = document.querySelector(".p2-info");
let p2Image = document.querySelector(".p2-image");
const p2Name = document.querySelector(".p2-name");
let p2HP = document.querySelector(".p2-hp");

function startGame() {
    // assign objects to player variables
    p1 = players[0];
    p2 = players[1];
    // show their images, health character names, prompt 1
    p1Image.setAttribute("src",p1.images[0]);
    p1Name.textContent = `P1: ${p1.character}`;
    p1HP.textContent = `${p1.hp} HP`;
    p2Image.setAttribute("src",p2.images[0]);
    p2Name.textContent = `P2: ${p2.character}`;
    p2HP.textContent = `${p2.hp} HP`;
    p1Info.style.backgroundColor = "orange";
    p2Info.style.backgroundColor = "orange";
    prompt.style.backgroundColor = "white";
    promptText.textContent = `15 seconds to collect ki!`;
    //will add p2turn() and try to wrap both in while loop for p1 and p2 health > 0
    fight();
    setTimeout(() => {
        alert("P1 will go first");
        }, "500")
}

function fight() {
    const gridItems = document.querySelectorAll(".grid-item");
    const ki = document.querySelector(".ki");
    let kiCollected = 0; 
    let hitPosition;
    let currentTime = 90;
    let timerId = null;
    let displayTime = 15;
  
    function randomGridItem() {
        gridItems.forEach(item => {
            item.classList.remove('ki')
        })

        let randomGridItem = gridItems[Math.floor(Math.random() * 9)]
        randomGridItem.classList.add("ki");

        hitPosition = randomGridItem.id
    }

    gridItems.forEach(item => {
        item.addEventListener("mousedown", () => {
            if (item.id == hitPosition) {
                kiCollected++;
                hitPosition = null;
            }
        })
    })

    function moveKi() {
        timerId = setInterval(randomGridItem, 1000)
    }

    moveKi();

    // alert("P1 will go first");

    function countDown() {
        currentTime--;
        displayTime -= 1
        promptText.textContent = `${displayTime} seconds to collect ki!`;
        //P1 Round 1
        if(currentTime == 75) {
            gridItems.forEach(item => {
                item.classList.remove('ki')
            });
            p1Attack();
            setTimeout(() => {
            alert("P2 will go next.");
            }, "500")
            kiCollected = 0;
            displayTime = 15;
        }
        //P2 Round 1
        if(currentTime == 60) {
            gridItems.forEach(item => {
                item.classList.remove('ki')
            });
            p2Attack();
            setTimeout(() => {
                alert("P1 will go next");
            }, "500")
            kiCollected = 0;
            displayTime = 15;
        }
        //P1 Round 2
        if(currentTime == 45) {
            gridItems.forEach(item => {
                item.classList.remove('ki')
            });
            p1Attack();
            setTimeout(() => {
                alert("P2 will go next");
            }, "500")
            kiCollected = 0;
            displayTime = 15;
        }
        //P2 Round 2
        if(currentTime == 30) {
            gridItems.forEach(item => {
                item.classList.remove('ki')
            });
            p2Attack();
            setTimeout(() => {
                alert("P1 will go next");
            }, "500")
            kiCollected = 0;
            displayTime = 15;
        }
        //P1 Round 3
        if(currentTime == 15) {
            gridItems.forEach(item => {
                item.classList.remove('ki')
            });
            p1Attack();
            setTimeout(() => {
                alert("P2 will go next");
            }, "500")
            kiCollected = 0;
            displayTime = 15;
        }
        //P2 Round 3
        if(currentTime == 0) {
            clearInterval(countDownTimerId);
            clearInterval(timerId);
            gridItems.forEach(item => {
                item.classList.remove('ki')
            });
            p2Attack();
            setTimeout(() => {
                alert("P1 will go next");
            }, "500")
            kiCollected = 0;
            //if statement for p1.hp>p2.hp show p2 fallen and else if for vice versa
        }
    }

    function p1Attack() {
        p1Image.setAttribute("src",p1.images[1]);
        attackImage.setAttribute("src","/imgs/p1blast.png");
        p2Image.setAttribute("src","/imgs/explosion.png");
        p2.hp -= kiCollected;
        promptText.textContent = `P2 lost ${kiCollected} hp!`;
        kiCollected = 0;
        p2HP.textContent = `${p2.hp} HP`;
        //set timeout to stop attack after 3 seconds
        setTimeout(() => {
            p1Image.setAttribute("src",p1.images[0]);
            p2Image.setAttribute("src",p2.images[0]);
            attackImage.setAttribute("src","/imgs/transparent.png");
          }, "400")
    }

    function p2Attack() {
        p2Image.setAttribute("src",p2.images[1]);
        attackImage.setAttribute("src","/imgs/p2blast.png");
        p1Image.setAttribute("src","/imgs/explosion.png");
        p1.hp -= kiCollected;
        promptText.textContent = `P1 lost ${kiCollected} hp!`;
        kiCollected = 0;
        p1HP.textContent = `${p1.hp} HP`;
        setTimeout(() => {
            p2Image.setAttribute("src",p2.images[0]);
            p1Image.setAttribute("src",p1.images[0]);
            attackImage.setAttribute("src","/imgs/transparent.png");
          }, "400")
    }

    let countDownTimerId = setInterval(countDown, 1000);

}
