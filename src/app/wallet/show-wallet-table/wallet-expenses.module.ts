import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowWalletTableComponent } from './show-wallet-table.component';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CreateExpenseComponent } from 'src/app/expenses/create-expense/create-expense.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TableModule } from '../../shared/table-with-expenses/table.module';
import { CardModule } from 'src/app/shared/card/card.module';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { TableWithExpensesComponent } from 'src/app/table-with-expenses/table-with-expenses.component';

@NgModule({
  declarations: [ShowWalletTableComponent, CreateExpenseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ShowWalletTableComponent }]),
    TranslateSharedLazyModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatMomentDateModule,
    TableModule,
    CardModule,
    ProgressbarModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class WalletExpensesModule {}
