export interface ExamQuestion {
  id: number;
  type: 'multiple-choice' | 'free-response'; // Add question type
  topic: string;
  text: string;
  equation?: string; // Optional for free-response
  options?: { id: string; label: string; value: string }[]; // Optional for free-response
  correctAnswer?: string; // Optional for free-response
  requirements?: string[]; // Specific for free-response
  diagram?: boolean; // To indicate if a diagram is needed
}
