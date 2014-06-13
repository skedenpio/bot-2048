var exports = {};

exports.Move = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}

exports.getColScore = function (col) {
    return this.getRowScore(col);
}

exports.getRowScore = function (row) {
    var score = 0;
    var cell = 0;

    for (var i = 0; i < row.length; i++) {
        if (row[i] == 0) continue;

        if (cell == 0) {
            cell = row[i];
        } else {
            if (cell == row[i]) {
                score += 2 * cell;
                cell = 0;
            } else {
                cell = row[i];
            }
        }
    }
    return score;
};

exports.getHGridScore = function (grid) {
    var score = 0;
    var self = this;

    grid.forEach(function (row) {
        score += self.getRowScore(row);
    });

    return score;
};

exports.getVGridScore = function (grid) {
    var tGrid = this.transposed(grid);
    return this.getHGridScore(tGrid);
};

exports.transposed = function (grid) {
    var tGrid = new Array(grid.length);

    for (var r = 0; r < grid.length; r++) {
        tGrid[r] = new Array(grid[r].length);
        for (var c = 0; c < grid[r].length; c++) {
            tGrid[r][c] = grid[c][r];
        }
    }

    return tGrid;
};

exports.getBestMove = function (grid) {
    var result;

    if (this.getHGridScore(grid) > this.getVGridScore(grid))
        result = this.getValueRandomly(this.Move.RIGHT, this.Move.LEFT);
    else
        result = this.getValueRandomly(this.Move.DOWN, this.Move.UP);

    return result;
};

exports.getValueRandomly = function (val1, val2) {
    var result;

    if (Math.random() > 0.5)
        result = val1;
    else
        result = val2;

    return result;
}

exports.getGrid = function (dom) {
    var grid = [];

    for (var r = 1; r < 5; r++) {
        var row = [];
        for (var c = 1; c < 5; c++) {
            var cell = 0;
            try {
                cell = dom
                  .getElementsByClassName('tile-position-'+c+'-'+r)[0]
                  .getElementsByClassName('tile-inner')[0].innerHTML;
            } catch (e) {
            }

            row.push(parseInt(cell));
        }
        grid.push(row);
    }

    return grid;
}

var gm = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
var dom = document;

function runGame() {
    setTimeout(function () {
        var grid = exports.getGrid(dom);
        var move = exports.getBestMove(grid)
        gm.inputManager.emit('move', move);
        runGame();
    }, 10);
}

runGame();







