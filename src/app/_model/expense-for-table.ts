export interface ExpenseForTable {
    id: number,
    userName: string,
    expenseDescription: string,
    expenseCategory?: string,
    expenseName: string,
    creationDate: Date,
    moneySpent: number
}
