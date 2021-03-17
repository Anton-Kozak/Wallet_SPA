import { ExpenseList } from '../expense_models/expense-list';
import { LastMonthStat } from '../lastMonthStat';
import { TopUsersStat } from '../user_models/top-users-stat';
import { User } from '../user_models/user';

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
