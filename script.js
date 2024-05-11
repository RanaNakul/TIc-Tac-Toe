const boxes = document.querySelectorAll(".box");
const display = document.querySelector(".display-container");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;

let gameGird;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X"
    gameGird = ["","","","","","","","",""];

    boxes.forEach((box,index) =>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        // box.classList = `box box${index+1}`;
        box.classList.remove("win");
    })
    newGameBtn.classList.remove("active");
    display.innerText = `Current PLayer - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X")
        currentPlayer ="O";
    else
        currentPlayer = "X";
    
    display.innerText = `Current PLayer - ${currentPlayer}`;
}

function checkGameOver(){
    let ans = "";

    winningPositions.forEach((position) =>{

        if((gameGird[position[0]] !== "" || gameGird[position[1]] !== "" || gameGird[position[2]] !== "") &&
            (gameGird[position[0]] === gameGird[position[1]] && gameGird[position[1]] === gameGird[position[2]]) ){

                if(gameGird[position[0]] === "X")
                    ans = "X";
                else
                    ans = "O";

                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    if(ans !== ""){
        display.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add('active');
        return;
    }
    
    let fillCount =0;
    gameGird.forEach((box) => {
        if(box !== "")
            fillCount++;
    })

    if(fillCount === 9){
        display.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }


}

function handleClick(index){
    if(gameGird[index] === ""){
        boxes[index].innerText=currentPlayer;
        gameGird[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index) =>{
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);
