import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { EditExpenseModalComponent } from './edit-expense-modal/edit-expense-modal.component';



@NgModule({
    declarations: [CreateExpenseComponent, EditExpenseModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '', children: [
                { path: 'createExpense', component: CreateExpenseComponent },
                { path: 'editExpense', component: EditExpenseModalComponent },
            ]
        }]),
        TranslateSharedLazyModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ExpenseModule { }