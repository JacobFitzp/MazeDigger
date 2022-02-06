
export default class MazeRenderer
{
    /**
     *
     * @param canvas
     * @param {Maze} maze
     */
    renderToCanvas(canvas, maze)
    {
        let tilemap = maze.exportTilemap(),
            y = 0,
            x = 0,
            tileSize = Math.ceil(canvas.height / maze.height),
            context = canvas.getContext('2d');

        context.fillStyle = 'red';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = 'black';

        tilemap.forEach(function (row) {

            x = 0;

            row.forEach(function (tile) {
                if (tile) {
                    context.fillRect(x, y, tileSize * 2, tileSize);
                }

                x += tileSize * 2;
            });

            y += tileSize;
        });
    }
}