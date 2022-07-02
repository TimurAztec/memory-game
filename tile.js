class Tile {

    #image
    #blank
    #selected
    pos = {
        x: 0,
        y: 0
    }
    size = {
        x: 0,
        y: 0
    }
    won

    get image() {
        return this.#selected ? this.#image : this.#blank;
    }

    constructor(imageId) {
        this.imageId = imageId;
        this.id = randNum(10000);
        this.won = false;
    }

    async load() {
        return new Promise((resolve, reject) => {
            let src = `https://picsum.photos/id/${this.imageId}/100/100`;
            this.#blank = new Image();
            this.#blank.src = 'assets/question.png';
            this.#image = new Image();
            this.#image.onload = () => { resolve(this) }
            this.#image.onerror = () => { reject(this) }
            this.#image.src = src
        });
    }

    setUp(pos, size) {
        this.pos = pos;
        this.size = size;
    }

    select() {
        fromTo(this.size, 'x', 0, 50).then(() => {
            this.#selected = true;
            fromTo(this.size, 'x', 100, 50)
        });
        let olPos = this.pos.x;
        fromTo(this.pos, 'x', this.pos.x + this.size.x / 2, 50).then(() => {
            fromTo(this.pos, 'x', olPos, 50)
        });
    }

    unselect() {
        this.#selected = false;
    }

}