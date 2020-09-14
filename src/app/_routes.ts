import { Routes } from "@angular/router";
import { CheckRequestsComponent } from "./request/check-requests/check-requests.component";
import { CheckInvitesComponent } from "./invites/check-invites/check-invites.component";
import { HomeComponent } from './home/home.component';
import { CreateWalletComponent } from './wallet/create-wallet/create-wallet.component';
import { RequestAccessComponent } from './request/request-access/request-access.component';
import { CreateInviteComponent } from './invites/create-invite/create-invite.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { WalletStatisticsComponent } from './wallet/wallet-statistics/wallet-statistics.component';
import { CategoryStatisticsComponent } from './wallet/category-statistics/category-statistics.component';
import { UserStatisticsComponent } from './wallet/user-statistics/user-statistics.component';
import { EditWalletComponent } from './wallet/edit-wallet/edit-wallet.component';
import { WalletAdminComponent } from './admin/wallet-admin/wallet-admin.component';
import { ShowWalletTableComponent } from './wallet/show-wallet-table/show-wallet-table.component';
import { ShowPreviousExpensesComponent } from './wallet/show-previous-expenses/show-previous-expenses.component';
import { WalletSectionComponent } from './wallet/wallet-section/wallet-section.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavigationGuard } from './_guards/navigation.guard';
import { MainGuard } from './_guards/main.guard';
import { AdminGuard } from './_guards/admin.guard';
import { ManualComparisonComponent } from './wallet/manual-comparison/manual-comparison.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/wallet/home', pathMatch: 'full' },

  { path: 'main', component: MainPageComponent, canActivate: [MainGuard], },
  {
    path: 'wallet', component: WalletSectionComponent, canActivate: [NavigationGuard], canActivateChild: [NavigationGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
      { path: 'requestAccess', component: RequestAccessComponent },
      { path: 'checkRequests', component: CheckRequestsComponent },
      { path: 'checkInvites', component: CheckInvitesComponent },
      { path: 'createInvite', component: CreateInviteComponent },
      { path: 'createExpense', component: CreateExpenseComponent },
      { path: 'compare', component: ManualComparisonComponent },
      { path: 'walletExpenses', component: ShowWalletTableComponent },
      { path: 'previousExpenses', component: ShowPreviousExpensesComponent },
      { path: 'getWalletStatistics', component: WalletStatisticsComponent },
      //TODO: вписать в путь сразу :id и как то его получать
      { path: 'catstat/:id', component: CategoryStatisticsComponent },
      { path: 'userStatistics/:id', component: UserStatisticsComponent },
      { path: 'createNewWallet', component: CreateWalletComponent },
      { path: 'editWallet', component: EditWalletComponent },
      { path: 'walletAdmin', component: WalletAdminComponent, canActivate: [AdminGuard] },
    ]
  },

  { path: '**', component: NotFoundComponent },
]