import { ExpenseForTable } from '../expense_models/expense-for-table';
import { ExpenseList } from '../expense_models/expense-list';
import { TopUsersStat } from '../user_models/top-users-stat';

export interface SpecifiedMonthData {
  firstMonthMostUsed: string;
  firstMonthMostSpent: string;
  firstMonthAverage: number;
  firstMonthTotal: number;
  firstLargestExpense: number;
  firstMonthTopFiveUsers: TopUsersStat[];
  firstMonthPreviousExpensesBars: ExpenseList[];
  firstMonthExpenses: ExpenseForTable[];

  secondMonthMostUsed: string;
  secondMonthMostSpent: string;
  secondMonthAverage: number;
  secondMonthTotal: number;
  secondLargestExpense: number;
  secondMonthTopFiveUsers: TopUsersStat[];
  secondMonthPreviousExpensesBars: ExpenseList[];
  secondMonthExpenses: ExpenseForTable[];
}
