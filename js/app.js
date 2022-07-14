console.log("dbz rules");

// When the page loads, open the welcome popup
window.onload = function welcome() {
    var popup = document.getElementById("welcomePopup");  popup.classList.toggle("show");
  };

//Event listeners for character selection
const gokuChoice = document.querySelector("#goku");
const vegetaChoice = document.querySelector("#vegeta");
const gohanChoice = document.querySelector("#gohan");
const trunksChoice = document.querySelector("#trunks");

//Class for characters
class Player {
    //static property to remember # of players created
    static lastPlayer = 0;

    constructor(player,hp,ki) {
        this.player = ++Player.lastPlayer;
        this.hp = hp || 100
        this.ki = ki || 0
    }
}