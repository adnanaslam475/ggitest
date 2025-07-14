export class UsageRepository {
    private usage = new Map<string, { totalUsed: number; limit: number }>();
  
    async getUsage(userId: string) {
      if (!this.usage.has(userId)) {
        this.usage.set(userId, { totalUsed: 0, limit: 3 });
      }
      return this.usage.get(userId)!;
    }
  
    async incrementUsage(userId: string) {
      const record = await this.getUsage(userId);
      record.totalUsed += 1;
    }
  
    async setLimit(userId: string, limit: number) {
      const record = await this.getUsage(userId);
      record.limit = limit;
    }
  }
  