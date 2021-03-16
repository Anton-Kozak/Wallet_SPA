import { ExpenseList } from './expense-list';
import { ExpensesWithCategories } from './expensesWithCategories';
import { TopUsersStat } from './top-users-stat';

export interface PreviousData {
  previousExpensesBars: ExpenseList[];
  previousMonthExpenses: ExpensesWithCategories[];
  topFiveUsers: TopUsersStat[];
}
