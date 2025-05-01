export type AccountHistory = {
  id: string;
  description: string;
  amount: number;
  currency: string;
  status: 'OUTCOME' | 'INCOME';
};
