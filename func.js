const btn = document.querySelector('#btn');
const board = document.querySelector('#board');
const sc = document.querySelector('#score');
const ins = document.querySelector('#ins');
const hiscoreBox = document.querySelector('#high');
const mus = document.querySelector('#play');
const bga = new Audio('bg.mp3');
const move = new Audio('move.mp3');
const die = new Audio('die.mp3');
bga.loop = true;
bga.volume = 0.7;
move.volume = 0.4;
die.volume = 0.9;
let mic = false;
const foody = new Audio('kill.mp3');
foody.volume = 0.2


board.style.display = 'none';
btn.addEventListener('click', () => {
    btn.style.display = 'none';
    ins.style.display = 'none';
    board.style.display = 'grid';
})
// Game constants.
let inputdir = {
    x: 0,
    y: 0
};
let speed = 8;
let lastpainttime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = {
    x: 6,
    y: 5
};
let score = 0;

// Game functions.


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }
    lastpainttime = ctime;

    gameEngine();
}

function iscollide(snakeArr) {
    for (let i = 1; i < snakeArr.length; i++) {
        if ((snakeArr[0].x == snakeArr[i].x) && (snakeArr[0].y == snakeArr[i].y)) {
            return true;
        }
    }
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    if (iscollide(snakeArr)) {
        bga.volume = 0.2;
        die.play();
        alert("Game Over ! Press OK to continue playing.....");
        snakeArr = [{ x: 13, y: 15 }];
        inputdir = {
            x: 0,
            y: 0
        };
        bga.volume = 0.7;
        score = 0;
        speed = 8;
        sc.textContent = 0;
    }

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        score++;
        foody.play();
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        if (score % 2 == 0) {
            speed++;
        }
        sc.textContent = score;
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart = food.y;
    FoodElement.style.gridColumnStart = food.x;
    FoodElement.classList.add('food');
    board.appendChild(FoodElement);
}

// Main logic starts here.

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
mus.addEventListener('click', () => {
    if (mic === true) {
        bga.pause();
        mus.innerHTML = "&#128264;";
        mic = false;
    }
    else {
        bga.play();
        mus.innerHTML = "&#128266;";
        mic = true;
    }
})
window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            move.play();
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            move.play();
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowRight":
            move.play();
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        case "ArrowLeft":
            move.play();
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
})