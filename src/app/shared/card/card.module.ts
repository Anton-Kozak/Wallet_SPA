import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';



@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    TranslateSharedLazyModule
  ],
  exports: [CardComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CardModule { }
