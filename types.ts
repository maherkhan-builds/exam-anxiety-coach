export interface ExamFormData {
  examName: string;
  examDate: string; // ISO date string e.g., 'YYYY-MM-DD'
  anxietyLevel: number; // Scale 1-5
  studyHabits: string;
  strengths: string;
  weaknesses: string;
}

export interface ExamPlan {
  recommendations: string[];
  action_steps: string[];
  summary: string;
}