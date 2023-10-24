function setUp() {
    const turns = document.getElementById('uTurn').value;
    // console.log(Number.isInteger(parseFloat(turns)));
    if (turns<1 || turns > 100 || Number.isInteger(parseFloat(turns)) === false) {
        document.getElementById('invalid').style.display = "inline";
    } else {
        document.getElementById('invalid').style.display = "none";
        document.getElementById('set').style.display = "none";
        document.getElementById('play').style.display = "block";
        document.getElementById('name').innerHTML = document.getElementById('uName').value;
        document.getElementById('shots').innerHTML = document.getElementById('uTurn').value;
    }
}
function confettiFalling() {

    var box = document.getElementById("box");
    var colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];

    for (var i = 0; i < 1000; i++) {

        // Create 1000 DIV elements for confetti
        var div = document.createElement("div");
        div.classList.add("confetti");
        box.appendChild(div);
    }

    var confetti = document.querySelectorAll('.confetti');

    for (var i = 0; i < confetti.length; i++) {

        var size = Math.random() * 0.01 * [i];

        confetti[i].style.width = 5 + size + 'px';
        confetti[i].style.height = 16 + size + 'px';
        confetti[i].style.left = Math.random() * innerWidth + 'px';

        var background = colors[Math.floor(Math.random() * colors.length)];
        confetti[i].style.backgroundColor = background;

        box.children[i].style.transform = "rotate("+ size*[i] +"deg)";
    }
}

// function restart() {
//   document.getElementById('report').innerHTML = "";
//   document.getElementById('shotCount').innerHTML = "0";
//   document.getElementById('totalHits').innerHTML = "0";
//   document.getElementById('totalMisses').innerHTML = "0";
//   document.getElementById('sunkShips').innerHTML = "0";
//   document.getElementById('shipsLeft').innerHTML = "5";
//   for (i=0; i<game.ship.length; i++) {
//     let hits = game.ship[i] + "Hits";
//     document.getElementById(hits).innerHTML = "0";
//     let status = game.ship[i] + "Status";
//     document.getElementById(status).innerHTML = "Alive";
//   }
//   gameover = 1;
// }