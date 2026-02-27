export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'transfer' | 'ads_tiktok' | 'ads_snapchat' | 'import_goods';
  description: string;
  amount: number;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  period: string;
  periodType: 'weekly' | 'monthly';
  issueDate: string;
  totalAmount: number;
  status: 'paid' | 'unpaid' | 'partial';
  services: {
    name: string;
    details: string;
    amount: number;
  }[];
}
