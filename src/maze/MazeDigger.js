import Maze from "./Maze";

export default class MazeDigger {

    maze;
    height;
    width;
    paths = [[0, 0]];
    pos = [0, 0];

    constructor(height, width) {
        this.maze = new Maze();
        this.maze.initTilemap(height, width);
        this.height = height;
        this.width = width;

        this.maze.pushState(this.pos[0], this.pos[1], true);
    }

    setStartingPos(y, x)
    {
        this.pos = [y, x];
        this.paths = [this.pos];
    }

    getPath(dir)
    {
        let posY = this.pos[0],
            posX = this.pos[1];

        switch (dir) {
            /* Up */
            case 1:
                return [[posY - 1, posX], [posY - 2, posX]];
            /* Right */
            case 2:
                return [[posY, posX + 1], [posY, posX + 2]];
            /* Down */
            case 3:
                return [[posY + 1, posX], [posY + 2, posX]];
            /* Left */
            case 4:
                return [[posY, posX - 1], [posY, posX - 2]];
        }
    }

    isPathClear(dir)
    {
        let path = this.getPath(dir);

        return (
            !this.maze.getState(path[0][0], path[0][1]) &&
            !this.maze.getState(path[1][0], path[1][1])
        );
    }

    digPath(dir)
    {
        let path = this.getPath(dir);

        this.maze.pushState(path[0][0], path[0][1], true);
        this.maze.pushState(path[1][0], path[1][1], true);

        this.addPath(path[1][0], path[1][1]);
    }

    hasPaths()
    {
        return this.paths.length > 0;
    }

    getClearPaths()
    {
        let paths = [];

        for (let dir = 1; dir <= 4; dir++) {
            if (this.isPathClear(dir)) {
                paths.push(dir);
            }
        }

        return paths;
    }

    removePath()
    {
       this.paths = this.paths.filter(item => item !== this.pos)
    }

    addPath(y, x)
    {
        this.pos = [y, x];
        this.paths.push([y, x]);
    }

    switchPath()
    {
        this.pos = this.getRandomElementFromArray(this.paths);
    }

    getRandomElementFromArray(items)
    {
        return items[Math.floor(Math.random() * items.length)];
    }

    generate()
    {
        while(this.hasPaths()) {

            let paths = this.getClearPaths();

            if (paths.length) {
                this.digPath(
                    this.getRandomElementFromArray(paths)
                );
            } else {
                this.removePath();

                if (this.hasPaths()) {
                    this.switchPath();
                }
            }
        }

        return this.maze;
    }
}