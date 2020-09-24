import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { RouterModule } from '@angular/router';
import { HomeWalletComponent } from './home-wallet.component';




@NgModule({
  declarations: [HomeWalletComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeWalletComponent }]),
    TranslateSharedLazyModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeWalletModule { }