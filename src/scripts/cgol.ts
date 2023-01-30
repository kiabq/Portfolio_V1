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
        const ctx = canvas.getContext("2d");
        const border = 2;
        let height = canvas.height;
        let width = canvas.width;
        let scale = width / canvas.clientWidth;

        let board: Array<Board>[] = [];
        let xOffset = 0, yOffset = 0;
    
        let interval: number | undefined = undefined;
        let paused = false;
        let counter = 0;

        const initial = [
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

        const boardSize = initial.length;

        let block = {
            x: width / boardSize,
            y: height / boardSize
        }

        function createBoard(size: number, reset?: boolean) {
            for (let i = 0; i < size; i++) {
                board.push([]);

                for (let j = 0; j < size; j++) {
                    if (initial[i][j] === 1 && !reset) {
                        board[i].push({ alive: 1, x: j * block.x, y: i * block.y });
                    } else {
                        board[i].push({ alive: 0, x: j * block.x, y: i * block.y });
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
                    ];

                    for (let k = 0; k < edgeCheck.length; k++) {
                        const eY = edgeCheck[k][0];
                        const eX = edgeCheck[k][1];
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

        function paint(area: DOMRect, e: MouseEvent | TouchEvent, brush: boolean = true): void {
            try {
                let posX, posY;

                if (e instanceof MouseEvent) {
                    posX = e.clientX - area.left;
                    posY = e.clientY - area.top;
                } else if (e instanceof TouchEvent) {
                    posX = e.targetTouches[0].clientX - area.left;
                    posY = e.targetTouches[0].clientY- area.top;
                }
    
                if (posX && posY) {
                    const x = Math.floor(posX * scale / block.x);
                    const y = Math.floor(posY * scale/ block.y);
                    
                    const current = board[y][x];
    
                    if (!brush && current.alive) {
                        current.alive = 0;
                    } else {
                        current.alive = 1;
                    }
                    
                    draw();
                }
            } catch (error) {
                removeListeners();
                addListeners();
            }
            
        }

        function clickEvent(this: HTMLCanvasElement, e: MouseEvent): void {
            const area = this.getBoundingClientRect();
            paint(area, e, false);
        };

        function mouseOverEvent(this: HTMLCanvasElement, e: MouseEvent): void {
            const area = this.getBoundingClientRect();
            
            const posX = e.clientX - area.left;
            const posY = e.clientY - area.top;

            draw(posX * scale, posY * scale);
        }

        function mouseDownEvent(this: HTMLCanvasElement):void {
            const controller = new AbortController();

            function mouseUpEvent(this: HTMLCanvasElement) {
                controller.abort();
            }

            function mouseMoveEvent(this: HTMLCanvasElement, e: MouseEvent) {
                const area = this.getBoundingClientRect();
                paint(area, e);
            }

            this.addEventListener("mousemove", mouseMoveEvent, { signal: controller.signal });
            this.addEventListener("mouseup", mouseUpEvent, { signal: controller.signal });
        }

        function touchOverEvent(this: HTMLCanvasElement) {
            const controller = new AbortController();

            function endTouchEvent(this: HTMLCanvasElement) {
                window.onscroll = function() {};
                controller.abort();
            }

            function touchMoveEvent(this: HTMLCanvasElement, e: TouchEvent) {
                const area = this.getBoundingClientRect();
                paint(area, e);

                window.onscroll = function() {
                    const scrollTop = window.screenY || document.body.scrollTop;
                    const scrollLeft = window.screenX || document.body.scrollLeft;

                    window.scrollTo(scrollLeft, scrollTop);
                }
            }

            this.addEventListener("touchmove", touchMoveEvent, { signal: controller.signal })
            this.addEventListener("touchend", endTouchEvent, { signal: controller.signal })
        }

        function addListeners() {
            canvas.addEventListener("click", clickEvent);
            canvas.addEventListener("mousemove", mouseOverEvent);
            canvas.addEventListener("mousedown", mouseDownEvent);
            canvas.addEventListener("touchstart", touchOverEvent);
        }

        function removeListeners() {
            canvas.removeEventListener("click", clickEvent);
            canvas.removeEventListener("mousemove", mouseOverEvent);
            canvas.removeEventListener("mousedown", mouseDownEvent);
            canvas.removeEventListener("touchstart", touchOverEvent);
        }

        pauseButton.addEventListener("click", () => {
            if (paused) {
                removeListeners();
                pauseButton.textContent = "Pause";

                interval = setInterval(newFrame, 200);
                paused = false;
            } else {
                paused = true;
                clearInterval(interval);

                pauseButton.textContent = "Play";
                addListeners();
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