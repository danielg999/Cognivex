import classes from "./PyramidInput.module.css";

const PyramidInput = ({
  num,
  rowIndex,
  numIndex,
  userAnswer,
  mode,
  handleInputChange,
  handleKeyDown,
  setInputRef,
}: {
  num: number;
  rowIndex: number;
  numIndex: number;
  userAnswer: string;
  mode: "remember" | "recall" | "results";
  handleInputChange: (
    rowIndex: number,
    numIndex: number,
    value: string
  ) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    numIndex: number
  ) => void;
  setInputRef: (
    rowIndex: number,
    numIndex: number
  ) => (el: HTMLInputElement | null) => void;
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
