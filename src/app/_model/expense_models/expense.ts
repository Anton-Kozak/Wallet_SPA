export interface Expense {
  id?: number;
  expenseCategoryId: number;
  expenseTitle: string;
  expenseDescription?: string;
  creationDate: string;
  moneySpent: number;
}
