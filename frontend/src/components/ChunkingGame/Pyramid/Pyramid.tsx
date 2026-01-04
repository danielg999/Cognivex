import PyramidRow from "./PyramidRow/PyramidRow";
import classes from "./Pyramid.module.css";
import { PyramidProps } from "./Pyramid.types";

const Pyramid: React.FC<PyramidProps> = ({
  numbers,
  userAnswers,
  mode,
  handleInputChange,
  handleKeyDown,
  setInputRef,
  rowsVisibility,
}) => {
  return (
    <div className={classes["pyramid"]}>
      {numbers.map((row, rowIndex) => (
        <PyramidRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          userAnswers={userAnswers[rowIndex]}
          mode={mode}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          setInputRef={setInputRef}
          isVisible={rowsVisibility[rowIndex]}
        />
      ))}
    </div>
  );
};

export default Pyramid;
