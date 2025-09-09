export type Language = "en" | "fr";

export type Question = {
  id: number;
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  correctAnswer: number;
  explanation: Record<Language, string>;
};


