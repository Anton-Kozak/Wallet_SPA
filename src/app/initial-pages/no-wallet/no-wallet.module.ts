import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { NoWalletComponent } from './no-wallet.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CreateWalletComponent } from 'src/app/wallet/create-wallet/create-wallet.component';
import { CheckInvitesComponent } from 'src/app/invites/check-invites/check-invites.component';
import { RequestAccessComponent } from 'src/app/request/request-access/request-access.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NoWalletComponent,
    CreateWalletComponent,
    CheckInvitesComponent,
    RequestAccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: NoWalletComponent }]),
    ReactiveFormsModule,
    FormsModule,
    TranslateSharedLazyModule,
    MatBadgeModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NoWalletModule {}
