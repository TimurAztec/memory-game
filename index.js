let CANVAS = document.querySelector('#canvas');
let SCORE_LABEL = document.querySelector('#score');
let CTX = CANVAS.getContext('2d');
let CURRENT_LEVEL
let SCORE = 0;
let NUM_OF_TILES = 10;

function changeLevel() {
    SCORE += CURRENT_LEVEL.score;
    NUM_OF_TILES += 4;
    CURRENT_LEVEL = new Level(CANVAS, CTX, NUM_OF_TILES, changeLevel);
}

function gameloop() {
    if (CURRENT_LEVEL.process()) {
        SCORE_LABEL.innerHTML = `SCORE: ${SCORE}`;
    } else {
        SCORE_LABEL.innerHTML = `Loading...`;
    }
    requestAnimationFrame(gameloop)
}

CURRENT_LEVEL = new Level(CANVAS, CTX, NUM_OF_TILES, changeLevel);
gameloop();

CANVAS.addEventListener('click', (event) => {
    CURRENT_LEVEL.select(...getMousePos(CANVAS, event));
});
