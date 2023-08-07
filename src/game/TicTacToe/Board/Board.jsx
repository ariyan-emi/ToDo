import { useState } from "react";
import Square from "../Square/Square";
import "./Board.css";

function Board({ setScores }) {
  const [nodes, setNodes] = useState({});
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winLine, setWinLine] = useState([]);

  const gameReset = () => {
    setWinLine([]);
    setBoard(Array(9).fill(""));
  };

  const getAvailableMoves = (board) => {
    const moves = [];
    board.forEach((cell, index) => {
      if (!cell) moves.push(index);
    });
    return moves;
  };

  const handleClick = (id) => {
    if (
      isTerminal(board).winner === "X" ||
      isTerminal(board).winner === "O" ||
      isFull(board)
    ) {
      gameReset();
      return;
    }

    if (board[id] !== "") return;

    let editedBoard = [...board];
    editedBoard[id] = "X";

    setBoard(editedBoard);

    if (isTerminal(editedBoard).winner === "X") {
      console.log(isTerminal(editedBoard));
      setWinLine(isTerminal(editedBoard).winLine);
      setScores((prevState) => ({ ...prevState, x: prevState.x + 1 }));
      return;
    }

    let randomNumber = getBestMove(editedBoard, 0, false);
    if (editedBoard[randomNumber] === "") {
      editedBoard[randomNumber] = "O";
    }

    setBoard(editedBoard);

    if (isTerminal(editedBoard).winner === "O") {
      setWinLine(isTerminal(editedBoard).winLine);
      setScores((prevState) => ({ ...prevState, o: prevState.o + 1 }));
      return;
    }

    if (isTerminal(editedBoard).winner === "draw") {
      setScores((prevState) => ({ ...prevState, tie: prevState.tie + 1 }));
    }
  };

  const isEmpty = (board) => {
    return board.every((cell) => !cell);
  };

  const isFull = (board) => {
    return board.every((cell) => cell);
  };

  const isTerminal = (board) => {
    if (isEmpty(board)) return false;

    if (board[0] === board[1] && board[0] === board[2] && board[0]) {
      return { winner: board[0], winLine: [0, 1, 2] };
    }
    if (board[3] === board[4] && board[3] === board[5] && board[3]) {
      return { winner: board[3], winLine: [3, 4, 5] };
    }
    if (board[6] === board[7] && board[6] === board[8] && board[6]) {
      return { winner: board[6], winLine: [6, 7, 8] };
    }

    if (board[0] === board[3] && board[0] === board[6] && board[0]) {
      return { winner: board[0], winLine: [0, 3, 6] };
    }
    if (board[1] === board[4] && board[1] === board[7] && board[1]) {
      return { winner: board[1], winLine: [1, 4, 7] };
    }
    if (board[2] === board[5] && board[2] === board[8] && board[2]) {
      return { winner: board[2], winLine: [2, 5, 8] };
    }

    if (board[0] === board[4] && board[0] === board[8] && board[0]) {
      return { winner: board[0], winLine: [0, 4, 8] };
    }
    if (board[2] === board[4] && board[2] === board[6] && board[2]) {
      return { winner: board[2], winLine: [2, 4, 6] };
    }

    if (isFull(board)) {
      return { winner: "draw" };
    }

    return false;
  };

  const getBestMove = (newBoard, depth, isMax, callback = () => {}) => {
    if (depth === 0) setNodes({});

    if (isTerminal(newBoard) || depth === -1) {
      if (isTerminal(newBoard).winner === "X") {
        return 100 - depth;
      } else if (isTerminal(newBoard).winner === "O") {
        return -100 + depth;
      }
      return 0;
    }

    if (isMax) {
      let best = -100;

      getAvailableMoves(newBoard).forEach((index) => {
        let child = [...newBoard];
        child[index] = "X";

        let score = getBestMove(child, depth + 1, false, callback);
        best = Math.max(best, score);
      });

      return best;
    }

    if (!isMax) {
      let best = 100;

      getAvailableMoves(newBoard).forEach((index) => {
        let child = [...newBoard];
        child[index] = "O";

        let score = getBestMove(child, depth + 1, true, callback);
        best = Math.min(best, score);

        if (depth === 0) {
          console.log(nodes);
          const moves = nodes[score] ? `${nodes[score]},${index}` : index;
          nodes[score] = moves;
        }
      });
      if (depth === 0) {
        let returnValue;

        if (typeof nodes[best] === "string") {
          const arr = nodes[best].split(",");
          const rand = Math.floor(Math.random() * arr.length);
          returnValue = arr[rand];
        } else {
          returnValue = nodes[best];
        }

        callback(returnValue);
        return returnValue;
      }
      return best;
    }
  };

  return (
    <div className="board">
      {board.map((val, i) => {
        return (
          <Square
            key={i}
            id={i}
            value={val}
            handleClick={handleClick}
            board={winLine}
          />
        );
      })}
    </div>
  );
}

export default Board;
