import { ExpenseList } from './expense-list';
import { LastMonthStat } from './lastMonthStat';
import { TopUsersStat } from './top-users-stat';
import { User } from './user';

export interface DetailedWalletStatisticsDTO {
  hasExpenseData: boolean;
  mostSpentCategory: string;
  mostUsedCategory: string;
  averageDailyExpense: number;
  barExpenses: ExpenseList[];
  barCompareExpensesWithLastMonth: {
    currentMonthData: ExpenseList[];
    lastMonthData: ExpenseList[];
  };
  topFiveUsers: TopUsersStat[];
  lastSixMonths: LastMonthStat[];
  walletUsers: User[];
  amountOfMoneySpent: number;
}
