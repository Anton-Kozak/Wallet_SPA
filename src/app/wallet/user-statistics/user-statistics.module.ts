import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { RouterModule } from '@angular/router';
import { GraphsModule } from 'src/app/shared/graphs.module';
import { UserStatisticsComponent } from './user-statistics.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { EditExpenseModalComponent } from 'src/app/expenses/edit-expense-modal/edit-expense-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
    declarations: [UserStatisticsComponent, EditExpenseModalComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: UserStatisticsComponent }]),
        TranslateSharedLazyModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        GraphsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserStatisticsModule { }