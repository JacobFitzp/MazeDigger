import MazeDigger from "./maze/MazeDigger";
import MazeRenderer from "./maze/MazeRenderer";

$(() => {
    $('#maze-generate').click(function () {

        let mazeSize = $('#maze-size').val(),
            maze = new MazeDigger(mazeSize, mazeSize),
            mazeRenderer = new MazeRenderer();

        mazeRenderer.renderToCanvas($('#maze-canvas')[0], maze.generate());
    });
});

