import { encoder } from "./encode.ts";

export type Board = {
  alive: number;
  x: number;
  y: number;
};

// Group of Pulsars
const pulsar = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 1, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 1, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ],
];

(function cgol() {
  const htmlBody = document.getElementsByTagName("body");
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const pauseButton = document.getElementById("pause") as HTMLButtonElement;
  const resetButton = document.getElementById("reset") as HTMLButtonElement;
  const clearButton = document.getElementById("clear") as HTMLButtonElement;
  const cycle = document.getElementById("counter") as HTMLElement;
  const toggleControls = document.getElementById("cog") as HTMLElement;
  const gameBottomControls = document.getElementById(
    "banner-bottom",
  ) as HTMLElement;
  const gameSideControls = document.getElementById(
    "speed-controls",
  ) as HTMLElement;
  const gameSlideValue = document.getElementById("speed") as HTMLInputElement;
  const gameEncoderForm = document.querySelector(
    ".banner-bottom-encoder",
  ) as HTMLFormElement;
  const gameEncoder = document.querySelector(
    ".encoder-text",
  ) as HTMLInputElement;
  const gameEncoderSubmit = document.querySelector(
    ".encoder-btn",
  ) as HTMLInputElement;
  function getTheme() {
    return document.getElementsByTagName("html")[0].dataset["theme"];
  }

  if (canvas !== null) {
    const ctx = canvas.getContext("2d");
    const border = 2;
    let height = canvas.height;
    let width = canvas.width;
    let scale = width / canvas.clientWidth;

    let board: Array<Board>[] = [];
    let xOffset = 0,
      yOffset = 0;

    let interval: NodeJS.Timeout | undefined = undefined;
    let speed = parseInt(gameSlideValue.value);
    let paused = false;
    let counter = 0;

    const initial = pulsar;
    const boardSize = initial.length;

    let block = {
      x: width / boardSize,
      y: height / boardSize,
    };

    // rewrite in encode.ts file
    function createBoard(size: number, reset?: boolean) {
      for (let i = 0; i < size; i++) {
        board.push([]);

        for (let j = 0; j < size; j++) {
          board[i].push({ alive: 0, x: j * block.x, y: i * block.y });

          if (initial[i][j] === 1 && !reset) {
            // board[i].push({ alive: 1, x: j * block.x, y: i * block.y });
            board[i][j].alive = 1;
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
            xOffset = border;
          }

          if (i === boardSize - 1) {
            yOffset = border;
          }

          ctx!.beginPath();
          ctx!.rect(
            Math.round(board[i][j].x),
            Math.round(board[i][j].y),
            Math.round(block.x - xOffset * scale),
            Math.round(block.y - yOffset * scale),
          );

          let hover: string = "#29242b";
          let background: string = "#FEFFFA";
          let fill: string = "#FF5C42";

          if (getTheme() === "dark") {
            hover = "#FEFFFA";
            background = "#29242b";
            fill = "#FFBB42";
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

      updateCode();
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
            [i + 1, j + 1],
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

          if (
            score === 3 ||
            (board[i][j].alive === 1 && score >= 2 && score <= 3)
          ) {
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

    function paint(
      area: DOMRect,
      e: MouseEvent | TouchEvent,
      brush: boolean = true,
    ): void {
      try {
        let posX, posY;

        if (e instanceof MouseEvent) {
          posX = e.clientX - area.left;
          posY = e.clientY - area.top;
        } else if (e instanceof TouchEvent) {
          posX = e.targetTouches[0].clientX - area.left;
          posY = e.targetTouches[0].clientY - area.top;
        }

        if (posX && posY) {
          const x = Math.floor((posX * scale) / block.x);
          const y = Math.floor((posY * scale) / block.y);

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

    function updateCode() {
      gameEncoder.value = encoder.encode(board);
    }

    let globalController: AbortController = new AbortController();

    function clickEvent(this: HTMLCanvasElement, e: MouseEvent): void {
      const area = this.getBoundingClientRect();
      paint(area, e, false);
    }

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

      this.addEventListener("mousemove", mouseMoveEvent, {
        signal: controller.signal,
      });
      document.addEventListener("mouseup", mouseUpEvent, {
        signal: controller.signal,
      });
    }

    function touchOverEvent(this: HTMLCanvasElement) {
      const controller = new AbortController();
      htmlBody[0].style.overflowY = "hidden";

      function touchEndEvent(this: HTMLCanvasElement) {
        htmlBody[0].style.overflowY = "";
        controller.abort();
      }

      function touchMoveEvent(this: HTMLCanvasElement, e: TouchEvent) {
        const area = this.getBoundingClientRect();
        paint(area, e);
      }

      this.addEventListener("touchmove", touchMoveEvent, {
        signal: controller.signal,
      });
      document.addEventListener("touchend", touchEndEvent, {
        signal: controller.signal,
      });
    }

    function addListeners() {
      globalController = new AbortController();

      canvas.addEventListener("click", clickEvent, {
        signal: globalController.signal,
      });
      canvas.addEventListener("mousemove", mouseOverEvent, {
        signal: globalController.signal,
      });
      canvas.addEventListener("mousedown", mouseDownEvent, {
        signal: globalController.signal,
      });
      canvas.addEventListener("touchstart", touchOverEvent, {
        signal: globalController.signal,
      });
    }

    function removeListeners() {
      globalController.abort();
    }

    function disableButtons() {
      pauseButton.setAttribute("disabled", "");
      resetButton.setAttribute("disabled", "");
      clearButton.setAttribute("disabled", "");
      gameSlideValue.setAttribute("disabled", "");
      gameEncoder.setAttribute("disabled", "");
      gameEncoderSubmit.setAttribute("disabled", "");
    }

    function enableButtons() {
      pauseButton.removeAttribute("disabled");
      resetButton.removeAttribute("disabled");
      clearButton.removeAttribute("disabled");
      gameSlideValue.removeAttribute("disabled");
      gameEncoder.removeAttribute("disabled");
      gameEncoderSubmit.removeAttribute("disabled");
    }

    toggleControls.addEventListener("click", function () {
      console.log("Hello");

      const activated =
        gameBottomControls.classList[0] === "show-controls" &&
        gameSlideValue.classList[0] === "show-slider";

      if (gameBottomControls && gameSideControls) {
        if (activated) {
          gameBottomControls.classList.remove("show-controls");

          for (let i = 0; i < gameSideControls.children.length; i++) {
            gameSideControls.children[i].classList.remove("show-slider");
          }

          toggleControls.style.transform = "rotate(0deg)";

          if (paused) {
            pauseButton.click();
          }

          disableButtons();
        } else {
          enableButtons();
          gameBottomControls.classList.add("show-controls");

          for (let i = 0; i < gameSideControls.children.length; i++) {
            gameSideControls.children[i].classList.add("show-slider");
          }

          toggleControls.style.transform = "rotate(-180deg)";
        }
      }
    });

    gameSlideValue.addEventListener("input", function () {
      speed = parseInt(gameSlideValue.value);

      if (!paused) {
        clearInterval(interval);
        interval = setInterval(newFrame, speed);
      }
    });

    pauseButton.addEventListener("click", function () {
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

    resetButton.addEventListener("click", function () {
      init(false);
      if (!paused) {
        pauseButton.click();
      }
    });

    clearButton.addEventListener("click", function () {
      init(true);
      if (!paused) {
        pauseButton.click();
      }
    });

    gameEncoderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const code = gameEncoder.value;
      gameEncoder.value = encoder.encode(board);
      board = encoder.decode(code, board);
      draw();
    });

    document.body.onload = () => {
      const theme = document.querySelector("#nav-theme-toggle");

      if (theme) {
        theme.addEventListener("click", () => draw());
      }
    };

    function newFrame() {
      updateCounter();
      game();
      draw();
    }

    if (interval === undefined) {
      init(false);
    }
  }
})();
