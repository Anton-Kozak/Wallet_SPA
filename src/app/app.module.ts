import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadModule } from 'ng2-file-upload';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule, } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileModule } from './profile/profile.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';




import { AppComponent } from './app.component';
// import { CreateWalletComponent } from './wallet/create-wallet/create-wallet.component';
// import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
// import { CheckRequestsComponent } from './request/check-requests/check-requests.component';
// import { CheckInvitesComponent } from './invites/check-invites/check-invites.component';
import { appRoutes } from './_routes';
// import { RequestAccessComponent } from './request/request-access/request-access.component';
// import { CreateInviteComponent } from './invites/create-invite/create-invite.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HasRoleDirective } from './_directives/hasRole.directive';
// import { EditWalletComponent } from './wallet/edit-wallet/edit-wallet.component';
// import { WalletAdminComponent } from './admin/wallet-admin/wallet-admin.component';

import { NotFoundComponent } from './not-found/not-found.component';
// import { HomeWalletComponent } from './home-wallet/home-wallet.component';
// import { TipsComponent } from './tips/tips.component';
import { MainModule } from './initial-pages/main/main.module';


export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    // CreateWalletComponent,
    // CreateExpenseComponent,
    // CheckRequestsComponent,
    // CheckInvitesComponent,
    // RequestAccessComponent,
    // CreateInviteComponent,
    // UserStatisticsComponent,
    // WalletStatisticsComponent,
    // CategoryStatisticsComponent,
   // SidebarComponent,
    HasRoleDirective,
    // EditWalletComponent,
    // WalletAdminComponent,
    // ShowPreviousExpensesComponent,
    // WalletSectionComponent,
    NotFoundComponent,
    // ManualComparisonComponent,
    // HomeWalletComponent,
    // TipsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // MatSidenavModule,
    MatNativeDateModule,
    FileUploadModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
        
      },
    }),
    RouterModule.forRoot(appRoutes),
    

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),

    BrowserAnimationsModule,

    FontAwesomeModule,
    //Lazy loading
    ProfileModule,
    // StartNowModule,
    MainModule,
  ],
  entryComponents: [
    // CreateExpenseComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
