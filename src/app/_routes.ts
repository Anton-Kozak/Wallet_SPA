import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { RegisterViewComponent } from "./register-view/register-view.component";
import { CheckRequestsComponent } from "./request/check-requests/check-requests.component";
import { CheckInvitesComponent } from "./invites/check-invites/check-invites.component";
import { HomeComponent } from './home/home.component';
import { CreateWalletComponent } from './wallet/create-wallet/create-wallet.component';
import { RequestAccessComponent } from './request/request-access/request-access.component';
import { CreateInviteComponent } from './invites/create-invite/create-invite.component';
import { PieGraphComponent } from './graphs/pie-graph/pie-graph.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { WalletStatisticsComponent } from './wallet/wallet-statistics/wallet-statistics.component';
import { CategoryStatisticsComponent } from './wallet/category-statistics/category-statistics.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'main', component: MainComponent },
  { path: 'register', component: RegisterViewComponent },
  { path: 'requestAccess', component: RequestAccessComponent },
  { path: 'checkRequests', component: CheckRequestsComponent },
  { path: 'checkInvites', component: CheckInvitesComponent },
  { path: 'createInvite', component: CreateInviteComponent },
  { path: 'createExpense', component: CreateExpenseComponent },
  { path: 'getWalletStatistics', component: WalletStatisticsComponent },
  //TODO: вписать в путь сразу :id и как то его получать
  { path: 'catstat', component: CategoryStatisticsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'createNewWallet', component: CreateWalletComponent },
  { path: 'graph', component: PieGraphComponent },
]