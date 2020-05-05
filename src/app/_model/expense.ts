export interface Expense {
    id?: number;
    expenseCategoryId: number,
    expenseName: string,
    expenseDescription?: string,
    creationDate: Date,
    moneySpent: number
}
