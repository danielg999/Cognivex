import PyramidInput from "../PyramidInput/PyramidInput";
import classes from "./PyramidRow.module.css";
import { PyramidRowProps } from "./PyramidRow.types";

const PyramidRow: React.FC<PyramidRowProps> = ({
  row,
  rowIndex,
  userAnswers,
  mode,
  handleInputChange,
  handleKeyDown,
  setInputRef,
}) => {
  return (
    <div className={classes["pyramid-row"]}>
      {row.map((num, numIndex) => (
        <PyramidInput
          key={numIndex}
          num={num}
          rowIndex={rowIndex}
          numIndex={numIndex}
          userAnswer={userAnswers?.[numIndex]}
          mode={mode}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          setInputRef={setInputRef}
        />
      ))}
    </div>
  );
};

export default PyramidRow;
