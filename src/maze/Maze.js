
export default class Maze {

    height = 20;
    width = 20;
    tilemap = [];

    initTilemap(height, width)
    {
        this.height = height;
        this.width = width;

        for (let y = 0; y < this.height; y++) {
            let row = [];
            for (let x = 0; x < this.width; x++) {
                row[x] = false;
            }
            this.tilemap[y] = row;
        }
    }

    getState(y, x)
    {
        if (y >= this.height || x >= this.width || y < 0 || x < 0) {
            return true;
        }

        return this.tilemap[y][x];
    }

    pushState(y, x, state)
    {
        this.tilemap[y][x] = state;
    }

    exportTilemap()
    {
        return this.tilemap;
    }
}