import type { Board } from "./life";

export const encoder = {
    random() {
        const board = new Array();
        for (let i = 0; i < 31; i++) {
            const row = new Array();
            for (let j = 0; j < 31; j++) {
                const random = Math.random();
                random > 0.5 ? row.push(0) : row.push(1);
            }
            board.push(row);
        }
        return board;
    },

    encode(array: Array<Board[]>) {
        let string = "";

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                string += (array[i][j].alive).toString();
            }
        }

        return string;
    },

    // TODO:
    // - parse for any numbers or characters that are not 1s or 0s.
    // - throw an error for an invalid code.
    // - add dropdown to select different premade patterns.
    decode(code: string, board: Array<Board[]>) {
        for (let i = 0; i <= code.length; i++) {
            const rowIndex = Math.floor(i / 31);
            const columnIndex = i % 31;

            if (board[rowIndex] !== undefined) {
                board[rowIndex][columnIndex].alive = parseInt(code[i]);
            }
        }

        return board;
    }
}