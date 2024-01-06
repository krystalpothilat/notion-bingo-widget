import BingoSquare from "./BingoSquare";
import "./BingoCard.css";


function BingoCard(){

    return (
        <div>
          <h2>3x3 Bingo Grid</h2>
          <div>
            {[...Array(9).keys()].map((index) => (
              <BingoSquare key={index} />
            ))}
          </div>
        </div>
      );
}

export default BingoCard;