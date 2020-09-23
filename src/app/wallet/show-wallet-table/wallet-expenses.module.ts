import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowWalletTableComponent } from './show-wallet-table.component';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';



@NgModule({
  declarations: [ShowWalletTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ShowWalletTableComponent }]),
    TranslateSharedLazyModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressbarModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class WalletExpensesModule { }