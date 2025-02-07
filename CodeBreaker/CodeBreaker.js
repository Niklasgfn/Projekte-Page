var gameRunning = false;

function resetGame() {
    gameRunning = false;
    document.getElementById("1").value = "";
    document.getElementById("1").style.boxShadow = "none";
    document.getElementById("1").style.background = "";
    document.getElementById("1").placeholder = "LOCKED";
    document.getElementById("Frage").innerHTML = "🔒 Willkommen zum CodeBreaker 🔒";
    document.getElementById("Antworten").innerHTML = "Klicke hier, um den Code zu knacken.";
    document.getElementById("hint").innerHTML = "";
    document.getElementById("mainScreen").onclick = null;
    document.getElementById("mainScreen").onclick = codeBreakerStart;
}

function codeBreakerStart() {
    document.getElementById("mainScreen").onclick = null;
    gameRunning = true;
    gameStart();
}

function gameStart() {
    var zahl1 = Math.round(Math.random() * 9 + 0.5);
    var zahl2 = Math.round(Math.random() * 9 + 0.5);
    var zahl3 = Math.round(Math.random() * 9 + 0.5);
    var meinZaehler = 1;
    var gameOver = 15;

    document.getElementById("1").style.boxShadow = "15px 15px 15px red";
    document.getElementById("1").style.background = "#33323c";
    document.getElementById("1").placeholder = "CODE"
    document.getElementById("Frage").innerHTML = "Bitte gebe eine Zahl von 111 bis 999 unten in das Feld ein. Du hast 15 Versuche.";
    document.getElementById("Antworten").innerHTML = "Versuch 1 von 15.";
    document.getElementById("hint").innerHTML = "Um die Zahl zu bestätigen, klicke auf 'Next'";

    document.getElementById("next").addEventListener("click", nextRound);

    function nextRound() {
        if (!gameRunning){
            return;
        }
        if (meinZaehler > gameOver) {
            return;
        }
        var meinVersuch = storeNumber();

        if (meinVersuch.length !== 3 || isNaN(meinVersuch)) {
            document.getElementById("hint").innerHTML = "Bitte gebe eine gültige Zahl mit drei Ziffern ein!";
            return;
        }
        document.getElementById("hint").innerHTML = "Um die Zahl zu bestätigen, klicke auf 'Next'";

        var tipp1 = meinVersuch.charAt(0);
        var tipp2 = meinVersuch.charAt(1);
        var tipp3 = meinVersuch.charAt(2);

        var richtigeStelle = 0;
        var richtigeZahl = 0;

        if (tipp1 == zahl1) {
            richtigeStelle++;
            richtigeZahl++;
        }
        else if (tipp1 == zahl2 || tipp1 == zahl3) {
            richtigeZahl++;
        }
        if (tipp2 == zahl2) {
            richtigeStelle++;
            richtigeZahl++;
        }
        else if (tipp2 == zahl1 || tipp2 == zahl3) {
            richtigeZahl++;
        }
        if (tipp3 == zahl3) {
            richtigeStelle++;
            richtigeZahl++;
        }
        else if (tipp3 == zahl1 || tipp3 == zahl2) {
            richtigeZahl++;
        }
        document.getElementById("Frage").innerHTML = richtigeStelle + " Zahl/en an der richtigen Stelle, " + richtigeZahl + " Zahl/en kommen im Code vor.";

        meinZaehler++;

        if (richtigeStelle == 3) {
            document.getElementById("Frage").innerHTML = "Du hast gewonnen. Die Lösung war: " + zahl1 + " " + zahl2 + " " + zahl3;
            document.getElementById("next").removeEventListener("click", nextRound);
        }
        else if (meinZaehler > gameOver) {
            document.getElementById("Frage").innerHTML = "Du hast den Code nicht geknackt. Die Lösung war: " + zahl1 + " " + zahl2 + " " + zahl3;
            document.getElementById("next").removeEventListener("click", nextRound);
            document.getElementById("hint").innerHTML = "Um einen neuen Code zu knacken, klicke auf 'Reset'";
        }
        else {
            document.getElementById("Antworten").innerHTML = "Versuch " + meinZaehler + " von 15.";
        }
    }
}

function storeNumber() {
    var input = document.getElementById("1").value;
    return input;
}