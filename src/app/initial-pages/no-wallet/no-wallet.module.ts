
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { NoWalletComponent } from './no-wallet.component';
import { MatBadgeModule } from '@angular/material/badge';




@NgModule({
  declarations: [NoWalletComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: NoWalletComponent }]),
    TranslateSharedLazyModule,
    MatBadgeModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NoWalletModule { }