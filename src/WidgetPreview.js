import "./WidgetPreview.css"; 
import BingoCard from "./BingoCard";

const WidgetPreview = ({backgroundColor, textColor, outlineColor, titleColor, titleToggle, onTitleChange, onAnySquareTextChange, onAnySquareTextEdit}) => {
    const handleTitleChange = (newTitle) => {
        onTitleChange(newTitle);
    };
    
    const handleAnySquareTextChange = (index, newSquareText) => {
      console.log("handling square text change in widgetpreview.js");
      onAnySquareTextChange(index, newSquareText);
    };

    const handleAnySquareTextEdit = (index) => {
      onAnySquareTextEdit(index);
    };

    return (
        <div className = "preview">
            <BingoCard
                backgroundColor={backgroundColor}
                textColor={textColor}
                outlineColor={outlineColor}
                titleColor = {titleColor}
                titleToggle = {titleToggle}
                onTitleChange={handleTitleChange}
                onAnySquareTextChange={handleAnySquareTextChange}
                onAnySquareTextEdit={handleAnySquareTextEdit}
                />
        </div>
    );
}

export default WidgetPreview;