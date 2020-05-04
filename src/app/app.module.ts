import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainComponent } from './main/main.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { CreateWalletComponent } from './wallet/create-wallet/create-wallet.component';
import { ExpenseTableComponent } from './expenses/expense-table/expense-table.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const appRoutes: Routes = [
  { path: 'main', component: MainComponent},
  { path: 'register', component: RegisterViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    MainComponent,
    RegisterViewComponent,
    CreateWalletComponent,
    ExpenseTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
