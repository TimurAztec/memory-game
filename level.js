class Level {

    selectedIds = [];
    selectedImage = [];

    constructor(canvas, ctx, numOfTiles, changeLevelCallBack) {
        canvas.width = Math.floor(numOfTiles / 2) * 100;
        canvas.height = Math.floor(numOfTiles / (numOfTiles / 2)) * 100;
        this.canvas = canvas;
        this.ctx = ctx;
        this.numOfTiles = numOfTiles;
        this.score = numOfTiles * 2;
        this.changeLevelCallback = changeLevelCallBack;
        this.wonTiles = 0;
        this.createTiles().then(() => {
            this.loaded = true;
        });
    }

    process() {
        if (!this.loaded) return this.loaded;
        this.drawNextFrame();
        if (this.wonTiles >= (this.numOfTiles / 2)) {
            this.changeLevelCallback();
        }
        return this.loaded;
    }

    async createTiles() {
        this.tiles = new Array(this.numOfTiles);
        try {
            for (let i = 0 ; i < this.numOfTiles ; i += 2) {
                let id = randNum(1000, 1);
                this.tiles[i] = await new Tile(id).load();
                this.tiles[i + 1] = await new Tile(id).load();
            }
        } catch (e) {
            await sleep(50);
            await this.createTiles();
        }
        shuffle(this.tiles);
        this.pos = {x: 0, y: 0};
        for (let tile of this.tiles) {
            tile.setUp(Object.assign({}, this.pos), {x: 100, y: 100});
            this.pos.x += 100;
            if (this.pos.x >= this.canvas.width) {
                this.pos.x = 0;
                this.pos.y += 100;
            }
        }
    }

    drawNextFrame() {
        this.ctx.clearRect(0 , 0, this.canvas.width, this.canvas.height);
        for (let tile of this.tiles) {
            this.ctx.drawImage(tile.image, tile.pos.x, tile.pos.y, tile.size.x, tile.size.y);
        }
    }

    select(x, y) {
        for (let tile of this.tiles) {
            if ((x > tile.pos.x && x < (tile.pos.x + tile.size.x)) &&
                (y > tile.pos.y && y < (tile.pos.y + tile.size.y)) &&
                this.selectedIds.length < 2 && !tile.won && !this.selectedIds.includes(tile.id)) {
                tile.select();
                this.selectedIds.push(tile.id);
                this.selectedImage.push(tile.imageId);
            }
        }
        if (this.selectedIds.length >= 2) {
            sleep(1000).then(() => {
                if (this.selectedImage[0] && this.selectedImage[1]) {
                    let won = this.selectedImage[0] === this.selectedImage[1];
                    for (let tile of this.tiles) {
                        if (tile.imageId === this.selectedImage[0] && won) {
                            tile.won = true;
                        }
                        if (!tile.won) {
                            tile.unselect();
                        }
                    }
                    this.selectedIds.length = 0;
                    this.selectedImage.length = 0;
                    if (won) {
                        this.wonTiles++;
                    } else {
                        this.score--;
                        if (this.score <= 0) {
                            this.score = 0
                        }
                    }
                }
            });
        }
    }

}