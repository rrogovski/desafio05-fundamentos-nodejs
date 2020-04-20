import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// DTO to request from route transaction POST
interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw Error(`You don't have enough balance`);
    }

    if (!['income', 'outcome'].includes(type)) {
      throw Error(`This type is not valid!`);
    }

    return this.transactionsRepository.create({
      title,
      value,
      type,
    });
  }
}

export default CreateTransactionService;
