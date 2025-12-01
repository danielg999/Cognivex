import classes from "./PyramidInput.module.css";
import { PyramidInputProps } from "./PyramidInput.types";

const PyramidInput: React.FC<PyramidInputProps> = ({
  num,
  rowIndex,
  numIndex,
  userAnswer,
  mode,
  handleInputChange,
  handleKeyDown,
  setInputRef,
}) => {
  let result = (
    <span key={numIndex} className={classes["pyramid-number"]}>
      {num}
    </span>
  );
  if (mode === "recall") {
    result = (
      <input
        ref={setInputRef(rowIndex, numIndex)}
        className={classes["pyramid-input"]}
        type="text"
        maxLength={1}
        onChange={(e) => handleInputChange(rowIndex, numIndex, e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, rowIndex, numIndex)}
      />
    );
  } else if (mode === "results") {
    result = (
      <input
        className={`${classes["pyramid-input"]} ${
          userAnswer === num.toString()
            ? classes["correct"]
            : classes["incorrect"]
        }`}
        type="text"
        maxLength={1}
        value={userAnswer}
        onChange={(e) => handleInputChange(rowIndex, numIndex, e.target.value)}
        disabled={true}
      />
    );
  }

  return result;
};

export default PyramidInput;
