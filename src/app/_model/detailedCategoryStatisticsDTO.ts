import { ExpenseForTable } from './expense-for-table';
import { LastMonthStat } from './lastMonthStat';
import { TopUsersStat } from './top-users-stat';

export interface DetailedCategoryStatisticsDTO {
  largestExpense: number;
  currentMonthLargestExpense: number;
  mostSpentUser: TopUsersStat;
  mostUsedUser: TopUsersStat;
  barCompareExpensesWithLastMonth: {
    currentMonthData: number;
    lastMonthData: number;
  };
  topFiveUsers: TopUsersStat[];
  lastSixMonths: LastMonthStat[];
  spentThisMonth: number;
  spentAll: number;
  categoryExpenses: ExpenseForTable[];
}
