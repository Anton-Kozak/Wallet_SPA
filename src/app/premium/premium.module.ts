import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremiumComponent } from './premium.component';
import { RouterModule } from '@angular/router';
import { TranslateSharedLazyModule } from '../shared/translate-shared-lazy/translate-shared-lazy.module';
import { CardModule } from 'src/app/shared/card/card.module';

@NgModule({
  declarations: [PremiumComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PremiumComponent }]),
    CardModule,
    TranslateSharedLazyModule
  ]
})
export class PremiumModule {}
