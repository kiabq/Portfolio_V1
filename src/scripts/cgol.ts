import { getTheme } from "./theme";

type Board = {
    alive: number,
    x: number,
    y: number
}

function cgol() {
    const canvas = document.getElementById("game") as HTMLCanvasElement;
    const pauseButton = document.getElementById("pause") as HTMLButtonElement;
    const resetButton = document.getElementById("reset") as HTMLButtonElement;
    const clearButton = document.getElementById("clear") as HTMLButtonElement;
    const cycle = document.getElementById("counter") as HTMLElement;
    const toggleControls = document.getElementById("cog") as HTMLElement;
    const gameBottomControls = document.getElementById("banner-controls") as HTMLElement;
    const gameSideControls = document.getElementById("speed") as HTMLInputElement;

    if (canvas !== null) {
        const ctx = canvas.getContext("2d");
        const border = 2;
        let height = canvas.height;
        let width = canvas.width;
        let scale = width / canvas.clientWidth;

        let board: Array<Board>[] = [];
        let xOffset = 0, yOffset = 0;
    
        let interval: number | undefined = undefined;
        let speed = 25;
        let dSpeed = speed;
        let paused = false;
        let counter = 0;

        // This array is proof that god had abandoned us. 
        // TODO:
        // Use Life Patterns to generate a 2d array on the fly.
        const initial = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

            createBoard(boardSize, reset);
            updateCounter();
            draw();

            if (!paused) {
                interval = setInterval(newFrame, speed);
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
                        Math.round(block.x - xOffset * scale),
                        Math.round(block.y - yOffset * scale),
                    );

                    let hover: string = ""; 
                    let background: string = "";
                    let fill: string = "#ff5c42";

                    if (getTheme() === "dark") {
                        hover = "#FEFFFA";
                        background = "#423847";
                    } else {
                        hover = "#423847";
                        background = "#FEFFFA";
                    }

                    if (paused && posX && posY && ctx!.isPointInPath(posX, posY)) {
                        ctx!.fillStyle = hover;
                    } else if (board[i][j].alive === 1) {
                        ctx!.fillStyle = fill;
                    } else {
                        ctx!.fillStyle = background;
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
                // Out of bounds error, no need to panic.
            }
        }

        let globalController: AbortController = new AbortController;

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

        function mouseDownEvent(this: HTMLCanvasElement): void {
            const controller = new AbortController();

            function mouseUpEvent(this: HTMLCanvasElement) {
                controller.abort();
            }

            function mouseMoveEvent(this: HTMLCanvasElement, e: MouseEvent) {
                const area = this.getBoundingClientRect();
                paint(area, e);
            }

            this.addEventListener("mousemove", mouseMoveEvent, { signal: controller.signal });
            document.addEventListener("mouseup", mouseUpEvent, { signal: controller.signal });
        }

        function touchOverEvent(this: HTMLCanvasElement) {
            const controller = new AbortController();

            function touchEndEvent(this: HTMLCanvasElement) {
                window.onscroll = function() {};
                controller.abort();
            }

            function touchMoveEvent(this: HTMLCanvasElement, e: TouchEvent) {
                const area = this.getBoundingClientRect();
                paint(area, e);

                window.onscroll = function(e) {
                    e.preventDefault();

                    let scrollTop = window.screenY || document.documentElement.scrollTop;
                    let scrollLeft = window.screenX || document.documentElement.scrollLeft;

                    window.scrollTo(scrollLeft, scrollTop);
                }
            }

            this.addEventListener("touchmove", touchMoveEvent, { signal: controller.signal })
            document.addEventListener("touchend", touchEndEvent, { signal: controller.signal })
        }

        function addListeners() {
            globalController = new AbortController();
            
            canvas.addEventListener("click", clickEvent, { signal: globalController.signal });
            canvas.addEventListener("mousemove", mouseOverEvent, { signal: globalController.signal });
            canvas.addEventListener("mousedown", mouseDownEvent, { signal: globalController.signal });
            canvas.addEventListener("touchstart", touchOverEvent, { signal: globalController.signal });
        }

        function removeListeners() {
            globalController.abort();
        }

        toggleControls.addEventListener("click", function() {
            const activated = (
                gameBottomControls.classList[0] === "show-controls" && 
                gameSideControls.classList[0] === "show-controls"
            );

            if (gameBottomControls && gameSideControls) {
                if (activated) {
                    gameBottomControls.classList.remove("show-controls");
                    gameSideControls.classList.remove("show-controls")
                    toggleControls.style.transform = "rotate(0deg)";
                } else {
                    gameBottomControls.classList.add("show-controls");
                    gameSideControls.classList.add("show-controls");
                    toggleControls.style.transform = "rotate(-180deg)";
                }
            }
        });

        gameSideControls.addEventListener("input", function() {
            speed = parseInt(gameSideControls.value);

            clearInterval(interval);
            interval = setInterval(newFrame, speed);
        })

        pauseButton.addEventListener("click", function() {
            if (paused) {
                removeListeners();
                pauseButton.textContent = "Pause";

                interval = setInterval(newFrame, speed);
                paused = false;
            } else {
                paused = true;
                clearInterval(interval);

                pauseButton.textContent = "Play";
                addListeners();
            }
        });

        resetButton.addEventListener("click", function() {
            init(false);
            if (!paused) {
                pauseButton.click();
            }
        })

        clearButton.addEventListener("click", function() {
            init(true);
            if (!paused) {
                pauseButton.click();
            }
        })

        document.body.onload = () => {
            const theme = document.querySelector(".nav-theme");

            if (theme) {
                theme.addEventListener("click", () => draw());
            }
        }

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