// subscription/domain/Subscription.ts

export interface Subscription {
    userId: string;
    autoRenew: boolean;
    plan: 'monthly' | 'yearly';
    expiresAt: Date;
  }
  