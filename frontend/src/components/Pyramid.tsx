import PyramidRow from "./PyramidRow";
import classes from "./Pyramid.module.css";

const Pyramid = ({
  numbers,
  userAnswers,
  mode,
  handleInputChange,
  handleKeyDown,
  setInputRef,
}: {
  numbers: number[][];
  userAnswers: string[][];
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
  console.log("Rendering Pyramid with numbers:", numbers);
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
        />
      ))}
    </div>
  );
};

export default Pyramid;
