import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TipsComponent } from './tips.component';
import { TranslateSharedLazyModule } from '../shared/translate-shared-lazy/translate-shared-lazy.module';



@NgModule({
  declarations: [TipsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TipsComponent }]),
    TranslateSharedLazyModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TipsModule { }
