import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ProfileComponent, ImageModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      extend: true,
    })
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule { }
