import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { RouterModule } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { WalletAdminComponent } from './wallet-admin/wallet-admin.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CheckRequestsComponent } from '../request/check-requests/check-requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateInviteComponent } from '../invites/create-invite/create-invite.component';
import { EditWalletComponent } from '../wallet/edit-wallet/edit-wallet.component';
import { TableModule } from '../shared/table-with-expenses/table.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    WalletAdminComponent,
    CheckRequestsComponent,
    CreateInviteComponent,
    EditWalletComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WalletAdminComponent }]),
    TranslateSharedLazyModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ProgressbarModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AdminModule {}
