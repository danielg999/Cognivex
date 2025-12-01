export interface PyramidInputProps {
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
}
