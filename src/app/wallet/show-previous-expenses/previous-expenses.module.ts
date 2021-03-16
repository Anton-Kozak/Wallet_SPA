import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { RouterModule } from '@angular/router';
import { ShowPreviousExpensesComponent } from './show-previous-expenses.component';
import { GraphsModule } from 'src/app/shared/graphs.module';
import { TableModule } from 'src/app/shared/table-with-expenses/table.module';

@NgModule({
  declarations: [ShowPreviousExpensesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ShowPreviousExpensesComponent }
    ]),
    TranslateSharedLazyModule,
    GraphsModule,
    TableModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PreviousExpensesModule {}
