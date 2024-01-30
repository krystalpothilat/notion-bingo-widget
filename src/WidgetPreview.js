import "./WidgetPreview.css"; 
import BingoCard from "./BingoCard";

const WidgetPreview = ({backgroundColor, textColor, outlineColor, titleColor, onTitleChange, onAnySquareTextChange}) => {
    const handleTitleChange = (newTitle) => {
        onTitleChange(newTitle);
      };
    
      const handleAnySquareTextChange = (index, newSquareText) => {
        console.log("handling square text change in widgetpreview.js");
        onAnySquareTextChange(index, newSquareText);
      };

    return (
        <div className = "preview">
            <BingoCard
                backgroundColor={backgroundColor}
                textColor={textColor}
                outlineColor={outlineColor}
                titleColor = {titleColor}
                onTitleChange={handleTitleChange}
                onAnySquareTextChange={handleAnySquareTextChange}
                />
        </div>
    );
}

export default WidgetPreview;