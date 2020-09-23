import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { WalletAdminComponent } from '../admin/wallet-admin/wallet-admin.component';
// import { CreateExpenseComponent } from '../expenses/create-expense/create-expense.component';
// import { HomeWalletComponent } from '../home-wallet/home-wallet.component';
// import { CheckInvitesComponent } from '../invites/check-invites/check-invites.component';
// import { CreateInviteComponent } from '../invites/create-invite/create-invite.component';
// import { CheckRequestsComponent } from '../request/check-requests/check-requests.component';
// import { RequestAccessComponent } from '../request/request-access/request-access.component';
// import { TipsComponent } from '../tips/tips.component';
// import { AdminGuard } from '../_guards/admin.guard';
// import { CategoryStatisticsComponent } from './category-statistics/category-statistics.component';
// import { CreateWalletComponent } from './create-wallet/create-wallet.component';
// import { EditWalletComponent } from './edit-wallet/edit-wallet.component';
// import { ManualComparisonComponent } from './manual-comparison/manual-comparison.component';
// import { ShowPreviousExpensesComponent } from './show-previous-expenses/show-previous-expenses.component';
// import { ShowWalletTableComponent } from './show-wallet-table/show-wallet-table.component';
// import { UserStatisticsComponent } from './user-statistics/user-statistics.component';
import { WalletSectionComponent } from './wallet-section/wallet-section.component';
import { NavigationGuard } from '../_guards/navigation.guard';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateSharedLazyModule } from '../shared/translate-shared-lazy/translate-shared-lazy.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { WalletStatisticsComponent } from './wallet-statistics/wallet-statistics.component';

const routes: Routes = [
    {
        path: '', component: WalletSectionComponent, canActivate: [NavigationGuard], canActivateChild: [NavigationGuard], children: [
            { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) },
            { path: 'walletExpenses', loadChildren: () => import('./show-wallet-table/wallet-expenses.module').then(m => m.WalletExpensesModule) },
            { path: 'previousExpenses',  loadChildren: () => import('./show-previous-expenses/previous-expenses.module').then(m => m.PreviousExpensesModule)},
            { path: 'getWalletStatistics', loadChildren: () => import('./wallet-statistics/wallet-statistics.module').then(m => m.WalletStatisticsModule) },
            { path: 'userStatistics/:id', loadChildren: () => import('./user-statistics/user-statistics.module').then(m => m.UserStatisticsModule)  },
            { path: 'catstat/:id', loadChildren: () => import('./category-statistics/category-statistics.module').then(m => m.CategoryStatisticsModule) },
            { path: 'compare', loadChildren: () => import('./manual-comparison/manual.module').then(m => m.ManualModule) },
            // { path: 'requestAccess', component: RequestAccessComponent },
            // { path: 'home-wallet', component: HomeWalletComponent },
            // { path: 'tips', component: TipsComponent },
            // { path: 'checkRequests', component: CheckRequestsComponent },
            // { path: 'checkInvites', component: CheckInvitesComponent },
            // { path: 'createInvite', component: CreateInviteComponent },
            // { path: 'createNewWallet', component: CreateWalletComponent },
            // { path: 'editWallet', component: EditWalletComponent },
            // { path: 'walletAdmin', component: WalletAdminComponent, canActivate: [AdminGuard] },
        ]
    },
];


@NgModule({
  declarations: [WalletSectionComponent, NavbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    TranslateSharedLazyModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class WalletModule { }
