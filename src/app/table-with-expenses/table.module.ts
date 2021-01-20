import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableWithExpensesComponent } from './table-with-expenses.component';
import { MatTableModule } from '@angular/material/table';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [TableWithExpensesComponent],
  imports: [
    CommonModule,
    MatTableModule,
    TranslateSharedLazyModule,
    MatPaginatorModule,
  ],
  exports: [TableWithExpensesComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TableModule { }
