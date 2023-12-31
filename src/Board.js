import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < ncols; i++) {
      const tempRow = [];
      for (let j = 0; j < nrows; j++) {
        if (Math.floor(Math.random()*2)) {
          tempRow.push(true)
        }
        else {
          tempRow.push(false)
        }
      }
      initialBoard.push(tempRow)
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let row of board) {
      for (let item of row) {
        if (item) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAroundMe(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

    // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map((row) => ([...row]))
    // Previous line derived from solution in Springboard materials

    // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y+1, x, boardCopy);
      flipCell(y, x+1, boardCopy);
      flipCell(y-1, x, boardCopy);
      flipCell(y, x-1, boardCopy)

    // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (<h1>You have won.</h1>)
  }
  // TODO

  // make table board

  // TODO
  else {
    return (
      <table className="Board">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <Cell key={`${rowIndex}-${columnIndex}`} isLit={cell} flipCellsAroundMe={evt => flipCellsAroundMe(`${rowIndex}-${columnIndex}`)}/>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

}

export default Board;
