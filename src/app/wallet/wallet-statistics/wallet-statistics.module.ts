import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { RouterModule } from '@angular/router';
import { WalletStatisticsComponent } from './wallet-statistics.component';
import { GraphsModule } from 'src/app/shared/graphs.module';





@NgModule({
  declarations: [WalletStatisticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WalletStatisticsComponent }]),
    TranslateSharedLazyModule,
    GraphsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class WalletStatisticsModule { }