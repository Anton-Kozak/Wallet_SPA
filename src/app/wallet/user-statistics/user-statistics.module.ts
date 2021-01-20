import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { RouterModule } from '@angular/router';
import { GraphsModule } from 'src/app/shared/graphs.module';
import { UserStatisticsComponent } from './user-statistics.component';
import { EditExpenseModalComponent } from 'src/app/expenses/edit-expense-modal/edit-expense-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../../shared/table-with-expenses/table.module';




@NgModule({
    declarations: [UserStatisticsComponent, EditExpenseModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: UserStatisticsComponent }]),
        TranslateSharedLazyModule,
        FormsModule,
        ReactiveFormsModule,
        GraphsModule,
        TableModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserStatisticsModule { }