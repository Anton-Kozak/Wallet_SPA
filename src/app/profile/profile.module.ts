import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';
import { TranslateSharedLazyModule } from '../shared/translate-shared-lazy/translate-shared-lazy.module';

@NgModule({
  declarations: [ProfileComponent, ImageModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    TranslateSharedLazyModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule {}
