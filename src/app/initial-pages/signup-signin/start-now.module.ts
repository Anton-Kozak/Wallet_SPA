import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupSigninComponent } from './signup-signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';



@NgModule({
  declarations: [SignupSigninComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SignupSigninComponent }]),
    FormsModule,
    ReactiveFormsModule,
    TranslateSharedLazyModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class StartNowModule { }
