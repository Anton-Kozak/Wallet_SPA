import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { RegisterViewComponent } from "./register-view/register-view.component";
import { RequestInviteComponent } from "./request/request-invite/request-invite.component";
import { CheckRequestsComponent } from "./request/check-requests/check-requests.component";
import { CheckInvitesComponent } from "./invites/check-invites/check-invites.component";
import { HomeComponent } from './home/home.component';
import { CreateWalletComponent } from './wallet/create-wallet/create-wallet.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'main', component: MainComponent },
  { path: 'register', component: RegisterViewComponent },
  { path: 'invite', component: RequestInviteComponent },
  { path: 'getrequests', component: CheckRequestsComponent },
  { path: 'checkInvites', component: CheckInvitesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'createNewWallet', component: CreateWalletComponent },
]