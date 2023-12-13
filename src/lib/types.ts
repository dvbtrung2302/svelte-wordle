export type LetterStatus = "correct" | "incorrect" | "close" | "invalid" | "";

export type Notification = {
  id: string;
  message: string;
  timeout: number;
};
