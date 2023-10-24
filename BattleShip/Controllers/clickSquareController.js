let gameover = 1;
let reset = false;

function clickSq(status, sq, id) {
    if (gameover === 1) {
        if (id < 10) {
            id = "0" + id
        }
        if (status === 'missed') {
            document.getElementById("report").innerHTML = "You missed!";
            document.getElementById(id).ariaValueText = "5";
            document.getElementById(id).innerHTML = game.icons.missed;
            let miss = parseInt(document.getElementById("totalMisses").innerHTML);
            miss += 1;
            document.getElementById("totalMisses").innerHTML = miss
        }
        else if (status === 'hit') {
            document.getElementById(id).innerHTML = game.icons.hit;
            document.getElementById(id).ariaValueText = "3";
            let hit = parseInt(document.getElementById("totalHits").innerHTML);
            hit += 1;
            document.getElementById("totalHits").innerHTML = hit;
            for (i = 0; i < game.ship.length; i++) {
                let compare = game.ship[i] + 'Coordinate';
                if (compare === sq) {
                    document.getElementById("report").innerHTML = game.ship[i] + " hit!";
                    let status = game.ship[i] + 'Status';
                    let id = game.ship[i] + 'Hits';
                    let life = parseInt(document.getElementById(id).innerHTML);
                    life += 1;
                    document.getElementById(id).innerHTML = life;
                    if (game.ship[i] === 'carrier' && life === 5) {
                        document.getElementById("report").innerHTML = game.ship[i] + " sunk!";
                        document.getElementById(status).innerHTML = "Sunk";
                        let remain = document.getElementById('shipsLeft').innerHTML;
                        remain -= 1;
                        document.getElementById('shipsLeft').innerHTML = remain;
                        let sunk = parseInt(document.getElementById('sunkShips').innerHTML);
                        sunk += 1;
                        document.getElementById('sunkShips').innerHTML = sunk;
                        for (i = 0; i < game.coordinate.carrier.length; i++) {
                            document.getElementById(game.coordinate.carrier[i]).innerHTML = game.icons.dead;
                            document.getElementById(game.coordinate.carrier[i]).ariaValueText = "4";
                        }
                    }
                    if (game.ship[i] === 'battleship' && life === 4) {
                        document.getElementById("report").innerHTML = game.ship[i] + " sunk!";
                        document.getElementById(status).innerHTML = "Sunk";
                        let remain = document.getElementById('shipsLeft').innerHTML;
                        remain -= 1;
                        document.getElementById('shipsLeft').innerHTML = remain;
                        let sunk = parseInt(document.getElementById('sunkShips').innerHTML);
                        sunk += 1;
                        document.getElementById('sunkShips').innerHTML = sunk;
                        for (i = 0; i < game.coordinate.battleship.length; i++) {
                            document.getElementById(game.coordinate.battleship[i]).innerHTML = game.icons.dead;
                            document.getElementById(game.coordinate.battleship[i]).ariaValueText = "4";
                        }
                    }
                    if (game.ship[i] === 'submarine' && life === 3) {
                        document.getElementById('submarineHits').innerHTML = "3";
                        document.getElementById("report").innerHTML = game.ship[i] + " sunk!";
                        document.getElementById(status).innerHTML = "Sunk";
                        let remain = document.getElementById('shipsLeft').innerHTML;
                        remain -= 1;
                        document.getElementById('shipsLeft').innerHTML = remain;
                        let sunk = parseInt(document.getElementById('sunkShips').innerHTML);
                        sunk += 1;
                        document.getElementById('sunkShips').innerHTML = sunk;
                        for (i = 0; i < game.coordinate.submarine.length; i++) {
                            document.getElementById(game.coordinate.submarine[i]).innerHTML = game.icons.dead;
                            document.getElementById(game.coordinate.submarine[i]).ariaValueText = "4";
                        }
                    }
                    if (game.ship[i] === 'cruiser' && life === 3) {
                        document.getElementById("report").innerHTML = game.ship[i] + " sunk!";
                        document.getElementById(status).innerHTML = "Sunk";
                        let remain = document.getElementById('shipsLeft').innerHTML;
                        remain -= 1;
                        document.getElementById('shipsLeft').innerHTML = remain;
                        let sunk = parseInt(document.getElementById('sunkShips').innerHTML);
                        sunk += 1;
                        document.getElementById('sunkShips').innerHTML = sunk;
                        for (i = 0; i < game.coordinate.cruiser.length; i++) {
                            document.getElementById(game.coordinate.cruiser[i]).innerHTML = game.icons.dead;
                            document.getElementById(game.coordinate.cruiser[i]).ariaValueText = "4";
                        }
                    }
                    if (game.ship[i] === 'destroyer' && life === 2) {
                        // document.getElementById('destroyerHits').innerHTML = "2";
                        document.getElementById("report").innerHTML = game.ship[i] + " sunk!";
                        document.getElementById(status).innerHTML = "Sunk";
                        let remain = document.getElementById('shipsLeft').innerHTML;
                        remain -= 1;
                        document.getElementById('shipsLeft').innerHTML = remain;
                        let sunk = parseInt(document.getElementById('sunkShips').innerHTML);
                        sunk += 1;
                        document.getElementById('sunkShips').innerHTML = sunk;
                        for (i = 0; i < game.coordinate.destroyer.length; i++) {
                            document.getElementById(game.coordinate.destroyer[i]).innerHTML = game.icons.dead;
                            document.getElementById(game.coordinate.destroyer[i]).ariaValueText = "4";
                        }
                        document.getElementById('destroyerHits').innerHTML = String(life);
                        console.log(String(life));
                    }
                }
            }
        }
        let count = parseInt(document.getElementById("shotCount").innerHTML);
        count += 1;
        document.getElementById("shotCount").innerHTML = count;
        let see = parseInt(document.getElementById("shots").innerHTML)
        if (count === see) {
            document.getElementById("report").innerHTML = "GAME OVER!";
            document.getElementById("reveal").innerHTML = "RESTART";
            let tRow = " ";
            for (let r = 0; r < game.myBoard.length; r++) {
                tRow += `<tr id="R${r}">`;
                for (let c = 0; c < game.myBoard.length; c++) {
                    let tokStr = `${r}` + `${c}`;
                    let sq = game.myBoard[r][c];
                    let table = parseInt((document.getElementById(tokStr).ariaValueText));
                    if (table === 1) {
                        tRow += `<td id="${r}${c}" class="square" aria-valuetext="1" onclick="clickSq('missed' , ${sq}, ${tokStr})"> ${game.ocean.icon} </td>`;
                    }
                    else if (table === 2) {
                        tRow += `<td id="${r}${c}" class="square" aria-valuetext="2" onclick="clickSq('hit' , ${sq}, ${tokStr})"> ${game.icons.here} </td>`;
                    }
                    else if (table === 3) {
                        tRow += `<td id="${r}${c}" class="square" aria-valuetext="3" onclick="clickSq('hit' , ${sq}, ${tokStr})"> ${game.icons.hit} </td>`;
                    }
                    else if (table === 4) {
                        tRow += `<td id="${r}${c}" class="square" aria-valuetext="4" onclick="clickSq('hit' , ${sq}, ${tokStr})"> ${game.icons.dead} </td>`;
                    }
                    else if (table === 5) {
                        tRow += `<td id="${r}${c}" class="square" aria-valuetext="5" onclick="clickSq('missed' , ${sq}, ${tokStr})"> ${game.icons.missed} </td>`;
                    }
                }
                tRow += `</tr>`;
            }
            document.getElementById("table1").innerHTML = tRow;
            gameover = 2;
            reset = true;
            return gameover + reset
        }
        let check = parseInt(document.getElementById('sunkShips').innerHTML);
        if (check === 5) {
            confettiFalling();
            document.getElementById("report").style.color = "blue";
            document.getElementById("report").innerHTML = "WINNER!";
            document.getElementById("reveal").innerHTML = "RESTART";
            document.getElementById("box").style.display = "block";
            gameover = 1;
            reset = true;
            return gameover + reset
        }
    }
    if (gameover === 2) {
        document.getElementById("report").innerHTML = "Used Max Shots!";
    }
}