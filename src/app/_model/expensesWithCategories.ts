import { Expense } from './expense';

export interface ExpensesWithCategories{
    expenses: Expense[];
    categoryId: number;
    categoryName: string;
}