var options = "X";
//Score references
var p1s = document.getElementById("pl1s");
var p2s = document.getElementById("pl2s");
//counters for increasing scores
var count1 = 0;
var count2 = 0;

//Getting game button's reference
var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var b4 = document.getElementById("b4");
var b5 = document.getElementById("b5");
var b6 = document.getElementById("b6");
var b7 = document.getElementById("b7");
var b8 = document.getElementById("b8");
var b9 = document.getElementById("b9");
var btns = [b1, b2, b3, b4, b5, b6, b7, b8, b9];

//Resets every button's text and color
function reset(){
    for(let i=0; i<9; i++){
        btns[i].innerHTML = "";
        btns[i].style.backgroundColor = "#a52a2a"
        btns[i].disabled = false;
    }
}

//Checks for any WINNING pattern, and will call a method for highlighting those button's color
function checker(){
    var b1 = document.getElementById("b1").innerHTML;
    var b2 = document.getElementById("b2").innerHTML;
    var b3 = document.getElementById("b3").innerHTML;
    var b4 = document.getElementById("b4").innerHTML;
    var b5 = document.getElementById("b5").innerHTML;
    var b6 = document.getElementById("b6").innerHTML;
    var b7 = document.getElementById("b7").innerHTML;
    var b8 = document.getElementById("b8").innerHTML;
    var b9 = document.getElementById("b9").innerHTML;
    
    var l1 = [[b1,b2,b3], [b1, b4, b7], [b1, b5, b9], [b2, b5, b8], [b3, b6, b9], [b3, b5, b7], [b4, b5, b6], [b7, b8, b9]];
    var l2 = [["b1","b2","b3"], ["b1", "b4", "b7"], ["b1", "b5", "b9"], ["b2", "b5", "b8"], ["b3", "b6", "b9"], ["b3", "b5", "b7"], ["b4", "b5", "b6"], ["b7", "b8", "b9"]];
    for(let i=0; i<l1.length; i++){
        if(getCase(l1[i][0], l1[i][1], l1[i][2])){
            highLight(l2[i][0], l2[i][1], l2[i][2], l1[i][0]);
        }
    }
}
//returns true if any winning pattern matches
function getCase(no1, no2, no3){
    if(((no1=="X") || (no1=="O")) && ((no1 == no2) && (no2 == no3))){
        return true;
    }
    else{
        return false;
    }
}
//disable all buttons
function btnDisable(){
    for(let i=0; i<9; i++){
        btns[i].disabled = true;
    }
}

//Disables the buttons, and paints the button's ORANGE, which are in WINNING pattern.
//It takes buttons id's as the three arguments and symbol=X or O as another argument, but the symbol īs currently not in use.
function highLight(cell1, cell2, cell3, win){
    btnDisable();
    document.getElementById(cell1).style.backgroundColor = '#FFA500';
    document.getElementById(cell2).style.backgroundColor = '#FFA500';
    document.getElementById(cell3).style.backgroundColor = '#FFA500';
    if(win == "O"){
        count1 = count1 + 1;
        p1s.innerHTML = ""+count1;
    }
    if(win == "X"){
        count2++;
        p2s.innerHTML = ""+count2;
    }
}

//The button pressed will be disabled and symbol 'X' or 'O' will appear on it
function setButton(button, options){
    var btnId = "b" + button;
    var btn = document.getElementById(btnId);
    btn.innerHTML = options;
    btn.disabled = true;
    //Checks if a WINNING pattern is made
    checker();
}

//Checks which symbol is next going to appear, like if last symbol was X, then O will be printed next 
function clicker(button){
    if(options == "X"){
        options = "O";
        setButton(button, options);
    }
    else if(options == "O"){
        options = "X";
        setButton(button, options);
    }
}
//retrieving user's name from the text fields and storing them in Score Board
function getUser(){
    //getting user info elements reference-- p1->participant-1
    if(document.getElementById("p1").value == ""){document.getElementById("pl1").innerHTML = "Player 1";}
    else{document.getElementById("pl1").innerHTML = document.getElementById("p1").value;}
    if(document.getElementById("p2").value == ""){document.getElementById("pl2").innerHTML = "Player 2";}
    else{document.getElementById("pl2").innerHTML = document.getElementById("p2").value;}
    
    p1s.innerHTML = "0";
    p2s.innerHTML = "0";

    document.getElementById("intro").style.display = "none";
    document.getElementById("scoreBoard").style.display = "unset";
    document.getElementById("resetBtn").style.display = "flex";
    document.getElementById("resetBtn").style.justifyContent = "space-around";
    document.getElementById("gameButtons").style.display = "flex";
}
//Refreshes the page in order to start new tournament
function refreshPage(){
    location.reload();
}