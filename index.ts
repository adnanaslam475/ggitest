// app.ts
import express from 'express';
import { ChatService } from './chat/services/ChatService';
import { ChatRepository } from './chat/repositories/ChatRepository';
import { UsageRepository } from './subscription/repositories/UsageRepository';

const app = express();
app.use(express.json());

const usageRepo = new UsageRepository();
const chatRepo = new ChatRepository();
const chatService = new ChatService(chatRepo, usageRepo);

app.post('/chat', async (req: any, res: any) => {
  const { userId, question } = req.body;
  try {
    const answer = await chatService.askQuestion(userId, question);
    res.json({ answer });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
// server.ts

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
