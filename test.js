var assert = require('assert');

describe('Score calculation', function () {
    describe('Row score', function () {
        it('with 2 and 2 should be 4', function () {
            var game = require('./game.js');
            var row = [2, 2, 0, 0];

            var actual = game.getRowScore(row);

            var expected = 4;
            assert.equal(actual, expected);
        });

        it('with 4 and 4 should be 8', function () {
            var game = require('./game.js');
            var row = [4, 4, 0, 0];

            var actual = game.getRowScore(row);

            var expected = 8;
            assert.equal(actual, expected);
        });

        it('with 4,4,2,0 should be 8', function () {
            var game = require('./game.js');
            var row = [4, 4, 2, 0];

            var actual = game.getRowScore(row);

            var expected = 8;
            assert.equal(actual, expected);
        });

        it('with 4,4,2,2 should be 12', function () {
            var game = require('./game.js');
            var row = [4, 4, 2, 2];

            var actual = game.getRowScore(row);

            var expected = 12;
            assert.equal(actual, expected);
        });

        it('with 4,4,4,2 should be 8', function () {
            var game = require('./game.js');
            var row = [4, 4, 4, 2];

            var actual = game.getRowScore(row);

            var expected = 8;
            assert.equal(actual, expected);
        });

        it('with 4,8,4,2 should be 0', function () {
            var game = require('./game.js');
            var row = [4, 8, 4, 2];

            var actual = game.getRowScore(row);

            var expected = 0;
            assert.equal(actual, expected);
        });

        it('with 2,0,0,2 should be 4', function () {
            var game = require('./game.js');
            var row = [2, 0, 0, 2];

            var actual = game.getRowScore(row);

            var expected = 4;
            assert.equal(actual, expected);
        });

        it('with 0,0,2,2 should be 4', function () {
            var game = require('./game.js');
            var row = [0, 0, 2, 2];

            var actual = game.getRowScore(row);

            var expected = 4;
            assert.equal(actual, expected);
        });

        it('with 2,4,4,2 should be 8', function () {
            var game = require('./game.js');
            var row = [2, 4, 4, 2];

            var actual = game.getRowScore(row);

            var expected = 8;
            assert.equal(actual, expected);
        });

        it('with 4,2,8,8 should be 16', function () {
            var game = require('./game.js');
            var row = [4, 2, 8, 8];

            var actual = game.getRowScore(row);

            var expected = 16;
            assert.equal(actual, expected);
        });

    });

    describe('Grid score for "left" and "right"', function () {
        it('should be 16', function () {
            var game = require('./game.js');
            var grid = [
                [2, 2, 0, 0],
                [2, 2, 0, 0],
                [2, 2, 0, 0],
                [2, 2, 0, 0]
            ];

            var actual = game.getHGridScore(grid);

            var expected = 16;
            assert.equal(actual, expected);
        });

        it('should be 12', function () {
            var game = require('./game.js');
            var grid = [
                [2, 2, 0, 0],
                [2, 64, 0, 32],
                [2, 2, 0, 0],
                [2, 2, 0, 0]
            ];

            var actual = game.getHGridScore(grid);

            var expected = 12;
            assert.equal(actual, expected);
        });

        it('should be 0', function () {
            var game = require('./game.js');
            var grid = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];

            var actual = game.getHGridScore(grid);

            var expected = 0;
            assert.equal(actual, expected);
        });

    });

    describe('Col score', function () {
        it('should be 16', function () {
            var game = require('./game.js');
            var col = [2, 2, 0, 0];

            var actual = game.getColScore(col);

            var expected = 4;
            assert.equal(actual, expected);
        });

    });

    describe('Grid score for "up" and "down"', function () {
        it('should be 16', function () {
            var game = require('./game.js');
            var grid = [
                [2, 2, 0, 0],
                [2, 2, 0, 0],
                [2, 2, 0, 0],
                [2, 2, 0, 0]
            ];

            var actual = game.getVGridScore(grid);

            var expected = 16;
            assert.equal(actual, expected);
        });

        it('should be 4', function () {
            var game = require('./game.js');
            var grid = [
                [2, 0, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];

            var actual = game.getVGridScore(grid);

            var expected = 4;
            assert.equal(actual, expected);
        }); //it

    });

    describe('Grid transposed', function () {
        it('should be transposed', function () {
            var game = require('./game.js');
            var grid = [
                [2, 0, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];

            var actual = game.transposed(grid);

            var expected = [
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            assert.deepEqual(actual, expected);
        });
    });

    describe('Choose next move', function () {
        it('should be left or right', function () {
            var game = require('./game.js');
            var grid = [
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];

            var actual = game.getBestMove(grid);

            assert.ok(actual == game.Move.RIGHT || actual == game.Move.LEFT);
        });

        it('should be down or up', function () {
            var game = require('./game.js');
            var grid = [
                [2, 0, 0, 0],
                [0, 0, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0]
            ];

            var actual = game.getBestMove(grid);

            assert.ok(actual == game.Move.DOWN || actual == game.Move.UP);
        });

        it('should be right or left', function () {
            var game = require('./game.js');
            var grid = [
                [4, 4, 4, 0],
                [8, 8, 0, 0],
                [0, 4, 0, 2],
                [0, 0, 0, 0]
            ];

            var actual = game.getBestMove(grid);

            assert.ok(actual == game.Move.RIGHT || actual == game.Move.LEFT);
        });

        it('should be randomly down or up', function () {
            var game = require('./game.js');
            var grid = [
                [2, 0, 0, 0],
                [0, 0, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0]
            ];

            var actuals = [];
            for (var i=0; i<1000; i++)
                actuals.push(game.getBestMove(grid));

            assert.ok(actuals.indexOf(game.Move.DOWN) > -1);
            assert.ok(actuals.indexOf(game.Move.UP) > -1);
        });

        it('should be right or left', function () {
            var game = require('./game.js');
            var grid = [
                [  2,  4,  2, 2 ],
                [  4, 32, 32, 16],
                [128, 16,  8, 4 ],
                [  4,  2,  4, 2 ]
            ];

            var actual = game.getBestMove(grid);

            assert.ok(actual == game.Move.RIGHT || actual == game.Move.LEFT);
        });
    });

});




