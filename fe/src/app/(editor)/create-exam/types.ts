export interface Question {
  id: string;
  number: string;
  topic: string;
  level: string;
  type: 'multiple-choice' | 'essay';
  content: string;
  options?: {
    label: string;
    text: string;
    isCorrect?: boolean;
  }[];
}

export interface MatrixRow {
  topic: string;
  nb: number;
  th: number;
  vd: number;
  vdc: number;
}