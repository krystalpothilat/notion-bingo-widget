import BingoSquare from "./BingoSquare";
import "./BingoCard.css";


function BingoCard(){

    return (
      <div className = "bingocard">
        <h2 id = "title">3x3 Bingo Grid</h2>

        <div className = "squares">
          {[...Array(9).keys()].map((index) => (
            <BingoSquare key={index} />
          ))}
        </div>

      </div>

      );
}

export default BingoCard;