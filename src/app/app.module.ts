import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainComponent } from './main/main.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { CreateWalletComponent } from './wallet/create-wallet/create-wallet.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { CheckRequestsComponent } from './request/check-requests/check-requests.component';
import { CheckInvitesComponent } from './invites/check-invites/check-invites.component';
import { appRoutes } from './_routes';
import { HomeComponent } from './home/home.component';
import { ShowWalletTableComponent } from './wallet/show-wallet-table/show-wallet-table.component';
import { RequestAccessComponent } from './request/request-access/request-access.component';
import { CreateInviteComponent } from './invites/create-invite/create-invite.component';
import { PieGraphComponent } from './graphs/pie-graph/pie-graph.component';
import { UserStatisticsComponent } from './wallet/user-statistics/user-statistics.component';
import { WalletStatisticsComponent } from './wallet/wallet-statistics/wallet-statistics.component';
import { SingleBarChartComponent } from './graphs/single-bar-chart/single-bar-chart.component';
import { LineChartComponent } from './graphs/line-chart/line-chart.component';
import { BarComparisonComponent } from './graphs/bar-comparison/bar-comparison.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    MainComponent,
    RegisterViewComponent,
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
    BarComparisonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes),
    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
