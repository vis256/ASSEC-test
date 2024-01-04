declare interface Test {
  name: string;
  questions: Question[];
}

declare interface Question {
  label: string;
  options: Option[];
}

declare interface Option {
  label: string;
  isCorrect: boolean;
  isSelected?: boolean;
}