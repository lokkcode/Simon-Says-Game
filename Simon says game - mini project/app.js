let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"]

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");


// step 1 : any key press -- game starting phase
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is started");
        started = true;

        levelUp();
    };
});
    



// step 2 : creating flash on random button and inc levels

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },100)
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },300)

    let sound = new Audio("./sounds/btnsound.mp3");
    sound.play();
}

function levelUp(){
    userSeq = []; // reseting userseq for next level
    level++;
    h2.innerText = `level ${level}`

    if(level>highestScore){
        highestScore = level;
    }


    //random btn choose
    let randIdx = Math.floor(Math.random()*btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq)

    gameFlash(randBtn);
}




// step 3 :  btn press and matching pressed buttons --> user == game or not

//checking
function checkSeq(idx){
    console.log("current level is: ", level )
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            setTimeout(levelUp, 1000)
        }
    }else{
        h2.innerHTML = `GAME OVER ! and your score was <b> ${level} </b> </br> Press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        
        let h3 = document.querySelector("h3");
        h3.innerText = `Highest Score : ${highestScore}`;

        let gameOverSound = new Audio("./sounds/game-over.mp3");
        gameOverSound.play();

        resetGame(); // after game over reseting from beginning
    }
}

function btnPress(){
    let btn = this; // this btn know the color
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkSeq(userSeq.length-1);
}


let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress)
}


function resetGame(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    
}