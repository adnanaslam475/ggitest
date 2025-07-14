import { SubscriptionRepository } from '../repositories/SubscriptionRepository';

export class SubscriptionService {
  constructor(private repo: SubscriptionRepository) {}

  async createBundle(userId: string, plan: 'monthly' | 'yearly') {
    await this.repo.save({
      userId,
      autoRenew: true,
      plan,
      expiresAt: this.calculateExpiry(plan),
    });
  }

  calculateExpiry(plan: string): Date {
    const now = new Date();
    return plan === 'monthly'
      ? new Date(now.setMonth(now.getMonth() + 1))
      : new Date(now.setFullYear(now.getFullYear() + 1));
  }

  async renewIfNeeded(userId: string) {
    const sub = await this.repo.get(userId);
    if (sub.autoRenew && sub.expiresAt < new Date()) {
      sub.expiresAt = this.calculateExpiry(sub.plan);
      await this.repo.save(sub);
    }
  }
}
