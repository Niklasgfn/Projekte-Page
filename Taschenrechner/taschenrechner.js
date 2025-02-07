const ANZEIGE_ID = "anzeige";
const EINGABEFELD_ID = "text_field";
const RECHENWEG_ANZEIGE_ID = "rechenweg";


function insertText(text){
    var textarea = document.getElementById(EINGABEFELD_ID);
    textarea.value += text;
}

function removeText(){
    var textarea = document.getElementById(EINGABEFELD_ID).value;
    newText = textarea.slice(0, -1);
    document.getElementById(EINGABEFELD_ID).value = newText;
}

function insertSymbol(symbol){
    var textarea = document.getElementById(EINGABEFELD_ID);
    if(textarea.value.endsWith("+") || textarea.value.endsWith("-") || textarea.value.endsWith("/") || textarea.value.endsWith("*") || textarea.value.endsWith(".")){
        var newText = textarea.value.slice(-1);
        if(newText.value != symbol){
            removeText();
            textarea.value += symbol;
        }
        textarea = textarea;
    }
    else{
        textarea.value += symbol;
    }
}

function clearTextArea(){
    document.getElementById(EINGABEFELD_ID).value = "";
}

function clearAll(){
    document.getElementById(EINGABEFELD_ID).value = "";
    document.getElementById(RECHENWEG_ANZEIGE_ID).innerHTML = "";
}

function sum(){
    var eingabefeld = document.getElementById(EINGABEFELD_ID);
    var rechenweg = eingabefeld.value;
    var ergebnis = new Function("return " + rechenweg)();
    eingabefeld.value = ergebnis;
    document.getElementById(RECHENWEG_ANZEIGE_ID).innerHTML = rechenweg;
}

function plusMinus(){
    var eingabefeld = document.getElementById(EINGABEFELD_ID);
    newText = eingabefeld.value;
    
    if(newText.startsWith("-")){
        eingabefeld.value = newText.substring(1);
    }
    else{
        eingabefeld.value = "-" + newText;
    }
}

function kehrwert(){
    var eingabefeld = document.getElementById(EINGABEFELD_ID);
    var kehrwert = "1/("+eingabefeld.value+")";
    if (eingabefeld.value == 0) {
        eingabefeld.value = "ERROR";
    } 
    else {
        eingabefeld.value = 1 / eingabefeld.value;
        document.getElementById(RECHENWEG_ANZEIGE_ID).innerHTML = kehrwert;
    }
}

function quadrat(){
    var eingabefeld = document.getElementById(EINGABEFELD_ID);
    var quadrat = "sqr("+eingabefeld.value+") ="
    eingabefeld.value = eingabefeld.value * eingabefeld.value;
    document.getElementById(RECHENWEG_ANZEIGE_ID).innerHTML= quadrat;
}

function wurzel(){
    var eingabefeld = document.getElementById(EINGABEFELD_ID);
    var wurzel = eingabefeld.value;
    if (wurzel < 0) {
        eingabefeld.value = "ERROR";
    } 
    else {
        var ergebnis = wurzel ** 0.5;
        eingabefeld.value = ergebnis;
        wurzel = "√("+wurzel+")";
        document.getElementById(RECHENWEG_ANZEIGE_ID).innerHTML = wurzel;
    }
}

function prozent() {
    var eingabefeld = document.getElementById(EINGABEFELD_ID);
    var anzeige = eingabefeld.value;
    var match = anzeige.match(/([\d.]+)(?=[+\-*/]?$)/);
    if (match) {
        var letzteZahl = match[0];
        var prozentWert = letzteZahl * 0.01;
        eingabefeld.value = anzeige.replace(/([\d.]+)(?=[+\-*/]?$)/, prozentWert);
    }
}
