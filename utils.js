function randNum(max, min = 0) {
    return Math.floor(Math.random() * max) + min;
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => { resolve() }, ms)
    });
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return [
        ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
        ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    ];
}

function fromTo(ref, field, toValue, ms) {
    let interval;
    let splitValue = (toValue - ref[field]) / ms;
    return new Promise(resolve => {
        interval = setInterval(() => {
            ref[field] += splitValue;
            if (splitValue > 0 && ref[field] >= toValue) {
                clearInterval(interval);
                resolve();
            }
            if (splitValue < 0 && ref[field] <= toValue) {
                clearInterval(interval);
                resolve();
            }
        }, 1);
    });
}