import { ExpenseForTable } from '../expense_models/expense-for-table';
import { ExpenseList } from '../expense_models/expense-list';
import { TopUsersStat } from '../user_models/top-users-stat';

export interface SpecifiedMonthData {
  mostUsed: string;
  mostSpent: string;
  average: number;
  total: number;
  largestExpense: number;
  topFiveUsers: TopUsersStat[];
  previousExpensesBars: ExpenseList[];
  expenses: ExpenseForTable[];
}
