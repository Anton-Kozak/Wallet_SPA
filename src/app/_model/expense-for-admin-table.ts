import { ExpenseForTable } from "./expense-for-table";

export interface ExpenseForAdminTable extends ExpenseForTable {
    isAdmin: boolean,
}
