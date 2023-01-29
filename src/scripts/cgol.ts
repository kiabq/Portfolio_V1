let canvas = document.getElementById("game") as HTMLCanvasElement;

function cgol() {
    if (canvas !== null) {
        let ctx = canvas.getContext("2d");
        let height = canvas.width;
        let width = canvas.height;

        let board: Array<number>[] = [];
        let x = 0;
        let y = 0;

        let border = 0;

        let interval = null;
        
        let initial = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]

        function createBoard(height: number, width: number, borderWidth: number) {
            for (let i = 0; i < height; i++) {
                board.push([]);

                for (let j = 0; j < width; j++) {
                    if (initial[i][j] === 1) {
                        board[i].push(1)
                    } else {
                        board[i].push(0)
                    }
                }

                border = borderWidth;
            }

            x = board[0].length;
            y = board.length;
        }

        function init() {
            createBoard(initial.length, initial[0].length, 2);

            draw();

            interval = setInterval(newFrame, 200)
        }

        function draw() {
            for (let i = 0; i < y; i++) {
                for (let j = 0; j < x; j++) {
                    let xOffset = border;
                    let yOffset = border;

                    if (j === x - 1) {
                        xOffset = 0;
                    }

                    if (i === y - 1) {
                        yOffset = 0;
                    }

                    if (board[i][j] === 1) {
                        ctx!.fillStyle = "yellow";
                    } else {
                        ctx!.fillStyle = "grey";
                    }

                    ctx?.fillRect(
                        (width / x) * j, 
                        (height / x) * i, 
                        width / x - xOffset, 
                        height / x - yOffset
                    );
                }
            }
        }
        
        function game() {
            let newBoard: Array<number>[] = [];

            for (let i = 0; i < y; i++) {
                let buffer = [];

                for (let j = 0; j < x; j++) {
                    let score = 0;
                    
                    let edgeCheck = [
                        [i - 1, j - 1],
                        [i - 1, j],
                        [i - 1, j + 1],
                        [i, j - 1],
                        [i, j + 1],
                        [i + 1, j - 1],
                        [i + 1, j],
                        [i + 1, j + 1]
                    ]

                    for (let k = 0; k < edgeCheck.length; k++) {
                        let eY = edgeCheck[k][0];
                        let eX = edgeCheck[k][1];
                        if (board[eY] !== undefined) {
                            if (board[eX] !== undefined) {
                                score += board[eY][eX];
                            }
                        }
                    }

                    if (score === 3) {
                        buffer.push(1);
                    } else if (board[i][j] === 1 && score >= 2 && score <= 3) {
                        buffer.push(1);
                    } else {
                        buffer.push(0);
                    }
                }

                newBoard.push(buffer);
            }

            board = newBoard;
        }

        function newFrame() {
            game();
            draw();        
        }

        if (interval === null) {
            init();
        }
    }
}

cgol();

export default cgol;