import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateAppointmentDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

const incomeReducer = (acc: Transaction, cur: Transaction) => {
  if (cur.type === 'income') acc.value += cur.value;
  return acc;
};

const outcomeReducer = (acc: Transaction, cur: Transaction) => {
  if (cur.type === 'outcome') acc.value += cur.value;
  return acc;
};

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.reduce(incomeReducer);
    const outcomeTransactions = this.transactions.reduce(outcomeReducer);

    const balance: Balance = {
      income: incomeTransactions.value,
      outcome: outcomeTransactions.value,
      total: incomeTransactions.value - outcomeTransactions.value,
    };

    return balance;
    // TODO
  }

  public create({ title, type, value }: CreateAppointmentDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
