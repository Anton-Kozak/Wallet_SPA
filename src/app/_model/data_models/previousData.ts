import { ExpenseList } from '../expense_models/expense-list';
import { ExpensesWithCategories } from '../expense_models/expensesWithCategories';
import { TopUsersStat } from '../user_models/top-users-stat';

export interface PreviousData {
  previousExpensesBars: ExpenseList[];
  previousMonthExpenses: ExpensesWithCategories[];
  topFiveUsers: TopUsersStat[];
}
