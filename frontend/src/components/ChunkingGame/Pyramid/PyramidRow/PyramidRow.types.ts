export interface PyramidRowProps {
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
}
