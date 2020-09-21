import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadModule } from 'ng2-file-upload';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileModule } from './profile/profile.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';




import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CreateWalletComponent } from './wallet/create-wallet/create-wallet.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { CheckRequestsComponent } from './request/check-requests/check-requests.component';
import { CheckInvitesComponent } from './invites/check-invites/check-invites.component';
import { appRoutes } from './_routes';
// import { HomeComponent } from './home/home.component';
import { ShowWalletTableComponent } from './wallet/show-wallet-table/show-wallet-table.component';
import { RequestAccessComponent } from './request/request-access/request-access.component';
import { CreateInviteComponent } from './invites/create-invite/create-invite.component';
import { PieGraphComponent } from './graphs/pie-graph/pie-graph.component';
import { UserStatisticsComponent } from './wallet/user-statistics/user-statistics.component';
import { WalletStatisticsComponent } from './wallet/wallet-statistics/wallet-statistics.component';
import { SingleBarChartComponent } from './graphs/single-bar-chart/single-bar-chart.component';
import { LineChartComponent } from './graphs/line-chart/line-chart.component';
import { BarComparisonComponent } from './graphs/bar-comparison/bar-comparison.component';
import { CategoryStatisticsComponent } from './wallet/category-statistics/category-statistics.component';
import { BarCategoryComparisonComponent } from './graphs/bar-category-comparison/bar-category-comparison.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EditExpenseModalComponent } from './expenses/edit-expense-modal/edit-expense-modal.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { EditWalletComponent } from './wallet/edit-wallet/edit-wallet.component';
import { WalletAdminComponent } from './admin/wallet-admin/wallet-admin.component';
import { ShowPreviousExpensesComponent } from './wallet/show-previous-expenses/show-previous-expenses.component';
import { WalletSectionComponent } from './wallet/wallet-section/wallet-section.component';
import { SignupSigninComponent } from './initial-pages/signup-signin/signup-signin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DonutChartComponent } from './graphs/donut-chart/donut-chart.component';
import { DonutChartCategoriesComponent } from './graphs/donut-chart-categories/donut-chart-categories.component';
import { ManualComparisonComponent } from './wallet/manual-comparison/manual-comparison.component';
import { InitialNavbarComponent } from './layout/initial-navbar/initial-navbar.component';
import { ContactsComponent } from './initial-pages/contacts/contacts.component';
import { MainComponent } from './initial-pages/main/main.component';
import { HomeComponent } from './initial-pages/home/home.component';
import { NoWalletComponent } from './initial-pages/no-wallet/no-wallet.component';
import { AboutComponent } from './initial-pages/about/about.component';
import { HomeWalletComponent } from './home-wallet/home-wallet.component';
import { TipsComponent } from './tips/tips.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateWalletComponent,
    CreateExpenseComponent,
    CheckRequestsComponent,
    CheckInvitesComponent,
    HomeComponent,
    ShowWalletTableComponent,
    RequestAccessComponent,
    CreateInviteComponent,
    PieGraphComponent,
    UserStatisticsComponent,
    WalletStatisticsComponent,
    SingleBarChartComponent,
    LineChartComponent,
    BarComparisonComponent,
    CategoryStatisticsComponent,
    BarCategoryComparisonComponent,
    SidebarComponent,
    EditExpenseModalComponent,
    HasRoleDirective,
    EditWalletComponent,
    WalletAdminComponent,
    ShowPreviousExpensesComponent,
    WalletSectionComponent,
    SignupSigninComponent,
    NotFoundComponent,
    MainPageComponent,
    DonutChartComponent,
    DonutChartCategoriesComponent,
    ManualComparisonComponent,
    InitialNavbarComponent,
    ContactsComponent,
    MainComponent,
    NoWalletComponent,
    AboutComponent,
    HomeWalletComponent,
    TipsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ChartsModule,
    FileUploadModule,
    MatDialogModule,
    MatTooltipModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ProgressbarModule.forRoot(),
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

    ProfileModule,
  ],
  entryComponents: [
    CreateExpenseComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
