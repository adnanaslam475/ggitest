import { ChatMessage } from '../domain/Chat';

export class ChatRepository {
  private db = new Map<string, ChatMessage[]>();

  async save(message: ChatMessage): Promise<void> {
    const messages = this.db.get(message.userId) || [];
    messages.push(message);
    this.db.set(message.userId, messages);
  }
}
