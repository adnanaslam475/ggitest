export interface ChatMessage {
    id: string;
    userId: string;
    question: string;
    answer: string;
    createdAt: Date;
  }