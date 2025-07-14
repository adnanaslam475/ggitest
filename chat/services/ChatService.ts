import { ChatRepository } from '../repositories/ChatRepository';
import { UsageRepository } from '../../subscription/repositories/UsageRepository';
import { v4 as uuidv4 } from 'uuid';

export class ChatService {
    constructor(
        private chatRepo: ChatRepository,
        private usageRepo: UsageRepository
    ) { }

    async askQuestion(userId: string, question: string): Promise<string> {
        const usage = await this.usageRepo.getUsage(userId);

        if (usage.totalUsed >= usage.limit) {
            throw new Error('Usage limit reached');
        }

        const answer = `Mocked AI response to: ${question}`;


        // ...


        await this.chatRepo.save({
            id: uuidv4(),
            userId,
            question,
            answer,
            createdAt: new Date(),
        });


        await this.usageRepo.incrementUsage(userId);

        return answer;
    }
}
