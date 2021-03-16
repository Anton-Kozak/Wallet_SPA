import { ExpenseList } from './expense-list';
import { LastMonthStat } from './lastMonthStat';

export interface DetailedUserStatisticsDTO {
  mostSpentCategory: string;
  mostUsedCategory: string;
  averageDailyExpense: number;
  largestExpense: number;
  barExpenses: ExpenseList[];
  monthCompareData: {
    currentMonthData: number;
    lastMonthData: number;
  };
  lastSixMonths: LastMonthStat[];
  amountOfMoneySpent: number;
}
