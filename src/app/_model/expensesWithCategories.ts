import { Expense } from './expense';

export interface ExpensesWithCategories{
    expenses: Expense[];
    categoryTitle: string;
}