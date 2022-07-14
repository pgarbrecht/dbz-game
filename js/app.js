// When the page loads, open the welcome popup
window.onload = function welcome() {
    var popup = document.getElementById("welcomePopup");  popup.classList.toggle("show");
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
    static lastPlayer = 0;

    constructor(character,player,hp,ki) {
        this.character = character || ""
        this.player = ++Player.lastPlayer
        this.hp = hp || 100
        this.ki = ki || 0
    }
}

//Onclick function to create new object from class when character chosen, and remove the pop up once 2 players created, and show their images in the stadium, their health and character names up top, and prompt 1
function createPlayer(character) {
    //add while statement here for 1 and 2 players in existence -- 2 should then remove pop up
    console.log(character); //replace with object creation
}

