type Board = {
    alive: number,
    x: number,
    y: number
}

function cgol() {
    let canvas = document.getElementById("game") as HTMLCanvasElement;
    let pauseButton = document.getElementById("pause") as HTMLButtonElement;
    let resetButton = document.getElementById("reset") as HTMLButtonElement;
    let cycle = document.getElementById("counter") as HTMLElement;

    if (canvas !== null) {
        let ctx = canvas.getContext("2d");
        let height = canvas.width;
        let width = canvas.height;

        let board: Array<Board>[] = [];
        let xOffset = 0, yOffset = 0;
        let border = 2;

        let interval: number | undefined = undefined;
        let paused = false;
        let counter = 0;

        let initial = [
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        let boardSize = initial.length;

        let block = {
            x: width / boardSize,
            y: height / boardSize
        }

        function createBoard(size: number, reset?: boolean) {
            for (let i = 0; i < size; i++) {
                board.push([]);

                for (let j = 0; j < size; j++) {
                    if (initial[i][j] === 1 && !reset) {
                        board[i].push({ alive: 1, x: j * block.x, y: i * block.y })
                    } else {
                        board[i].push({ alive: 0, x: j * block.x, y: i * block.y })
                    }
                }
            }
        }

        function init(reset: boolean) {
            board = [];
            counter = 0;

            if (interval) {
                clearInterval(interval);
            }

            updateCounter();
            createBoard(boardSize, reset);
            draw();

            if (!paused) {
                interval = setInterval(newFrame, 200);
            }
        }

        function draw(posX?: number, posY?: number) {
            for (let i = 0; i < boardSize; i++) {
                for (let j = 0; j < boardSize; j++) {
                    xOffset = border;
                    yOffset = border;

                    if (j === boardSize - 1) {
                        xOffset = 0;
                    }

                    if (i === boardSize - 1) {
                        yOffset = 0;
                    }

                    ctx!.beginPath();
                    ctx!.rect(
                        Math.round(board[i][j].x),
                        Math.round(board[i][j].y),
                        Math.round(block.x - xOffset),
                        Math.round(block.y - yOffset),
                    );
                    
                    if (paused && posX && posY && ctx!.isPointInPath(posX, posY)) {
                        ctx!.fillStyle = "blue";
                    } else if (board[i][j].alive === 1) {
                        ctx!.fillStyle = "yellow";
                    } else {
                        ctx!.fillStyle = "grey";
                    }

                    ctx!.fill();
                }
            }
        }
        
        function game() {
            let newBoard: Array<Board>[] = [];

            for (let i = 0; i < boardSize; i++) {
                newBoard.push([]);

                for (let j = 0; j < boardSize; j++) {
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
                                score += board[eY][eX].alive;
                            }
                        }
                    }

                    if (score === 3 || (board[i][j].alive === 1 && score >= 2 && score <= 3)) {
                        newBoard[i].push({ alive: 1, x: j * block.x, y: i * block.y });
                    } else {
                        newBoard[i].push({ alive: 0, x: j * block.x, y: i * block.y });
                    }
                }
            }

            board = newBoard;
        }

        function updateCounter() {
            cycle.textContent = `${counter}`;
            counter++;
        }

        function clickEvent(this: HTMLCanvasElement, e: MouseEvent) {
            let area = this.getBoundingClientRect();

            let posX = e.clientX - area.left;
            let posY = e.clientY - area.top;

            let x = Math.floor(posX / block.x);
            let y = Math.floor(posY / block.y)

            if (board[y][x].alive === 0) {
                board[y][x].alive = 1;
            } else {
                board[y][x].alive = 0;
            }
            
            draw();
        };

        function mouseOverEvent(this: HTMLCanvasElement, e: MouseEvent) {
            let area = this.getBoundingClientRect();

            let posX = e.clientX - area.left;
            let posY = e.clientY - area.top;

            draw(posX, posY);
        }   

        function mouseDownEvent(this: HTMLCanvasElement) {
            function mouseUpEvent() {
                canvas.removeEventListener("mousemove", mouseMoveEvent);
                canvas.removeEventListener("mouseup", mouseUpEvent);
            }

            function mouseMoveEvent(this: HTMLCanvasElement, e: MouseEvent) {
                let area = this.getBoundingClientRect();

                let posX = e.clientX - area.left;
                let posY = e.clientY - area.top;
    
                let x = Math.floor(posX / block.x);
                let y = Math.floor(posY / block.y);

                let current = board[y][x];

                current.alive = 1;
                
                draw();
            }

            canvas.addEventListener("mousemove", mouseMoveEvent);
            canvas.addEventListener("mouseup", mouseUpEvent);
        }

        clickEvent.bind(canvas);
        mouseOverEvent.bind(canvas);
        mouseDownEvent.bind(canvas);

        pauseButton.addEventListener("click", () => {
            if (paused) {
                canvas.removeEventListener("click", clickEvent);
                canvas.removeEventListener("mousemove", mouseOverEvent);
                canvas.removeEventListener("mousedown", mouseDownEvent);

                pauseButton.textContent = "Pause";

                paused = false;
                interval = setInterval(newFrame, 200);
            } else {
                paused = true;
                clearInterval(interval);

                pauseButton.textContent = "Play";

                canvas.addEventListener("click", clickEvent);
                canvas.addEventListener("mousemove", mouseOverEvent);
                canvas.addEventListener("mousedown", mouseDownEvent);
            }
        });

        resetButton.addEventListener("click", () => {
            init(true);
        
            if (!paused) {
                pauseButton.click();
            }
        })

        function newFrame() {
            updateCounter();

            game();
            draw();
        }

        if (interval === undefined) {
            init(false);
        }
    }
}

cgol();

export default cgol;