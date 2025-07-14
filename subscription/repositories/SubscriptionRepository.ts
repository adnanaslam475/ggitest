import { Subscription } from '../domain/Subscription';

export class SubscriptionRepository {
  private subscriptions: Map<string, Subscription> = new Map();

  async save(subscription: Subscription): Promise<void> {
    this.subscriptions.set(subscription.userId, subscription);
  }

  async get(userId: string): Promise<Subscription> {
    const subscription = this.subscriptions.get(userId);
    if (!subscription) {
      throw new Error(`No subscription found for user: ${userId}`);
    }
    return subscription;
  }

  async exists(userId: string): Promise<boolean> {
    return this.subscriptions.has(userId);
  }

  async delete(userId: string): Promise<void> {
    this.subscriptions.delete(userId);
  }
}
