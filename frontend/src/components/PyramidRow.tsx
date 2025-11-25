import PyramidInput from "./PyramidInput";
import classes from "./PyramidRow.module.css";

const PyramidRow = ({
  row,
  rowIndex,
  userAnswers,
  mode,
  handleInputChange,
  handleKeyDown,
  setInputRef,
}: {
  row: number[];
  rowIndex: number;
  userAnswers: string[];
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
