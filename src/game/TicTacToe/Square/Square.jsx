import "./Square.css";

function Square({ id, value, handleClick, board }) {
  return (
    <div id={id} onClick={() => handleClick(id)} className="square">
      <p className={
          id === board[0] || id === board[1] || id === board[2] ? "changed" : ""
        }>
        {value}
      </p>
    </div>
  );
}

export default Square;
