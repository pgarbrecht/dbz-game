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
    createPlayer("Goku");
}
vegetaChoice.onclick = function() {
    createPlayer("Vegeta");
}
gohanChoice.onclick = function() {
    createPlayer("Gohan");
}
trunksChoice.onclick = function() {
    createPlayer("Trunks");
}

//Class for characters
class Player {
    //static property to remember # of players created
    static lastPlayerNumber = 0;

    constructor(character,playerNumber,hp,ki) {
        this.character = character || ""
        this.playerNumber = ++Player.lastPlayerNumber
        this.hp = hp || 100
        this.ki = ki || 0
    }
}

//Onclick function to create new object from class when character chosen, and remove the pop up once 2 players created, and show their images in the stadium, their health and character names up top, and prompt 1
let charactersOnscreen = 0;

function createPlayer(character) {
    const p = new Player(character); 
    console.log(p);
    //insert code here to show char on screen
    charactersOnscreen += 1;
    removeWelcome();
}

function removeWelcome() {
    if (charactersOnscreen > 1) {
        popup.style.display = "none";
    }
}