import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WalletSectionComponent } from './wallet-section/wallet-section.component';
import { NavigationGuard } from '../_guards/navigation.guard';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateSharedLazyModule } from '../shared/translate-shared-lazy/translate-shared-lazy.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminGuard } from '../_guards/admin.guard';
import { HasRoleDirective } from '../_directives/hasRole.directive';
import { MatBadgeModule } from '@angular/material/badge';
const routes: Routes = [
  {
    path: '', component: WalletSectionComponent, canActivate: [NavigationGuard], canActivateChild: [NavigationGuard], children: [
      { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) },
      { path: 'walletExpenses', loadChildren: () => import('./show-wallet-table/wallet-expenses.module').then(m => m.WalletExpensesModule) },
      { path: 'previousExpenses', loadChildren: () => import('./show-previous-expenses/previous-expenses.module').then(m => m.PreviousExpensesModule) },
      { path: 'getWalletStatistics', loadChildren: () => import('./wallet-statistics/wallet-statistics.module').then(m => m.WalletStatisticsModule) },
      { path: 'userStatistics/:id', loadChildren: () => import('./user-statistics/user-statistics.module').then(m => m.UserStatisticsModule) },
      { path: 'catstat/:id', loadChildren: () => import('./category-statistics/category-statistics.module').then(m => m.CategoryStatisticsModule) },
      { path: 'compare', loadChildren: () => import('./manual-comparison/manual.module').then(m => m.ManualModule) },
      { path: 'home-wallet', loadChildren: () => import('./home-wallet/home-wallet.module').then(m => m.HomeWalletModule) },
      { path: 'walletAdmin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
      { path: 'tips', loadChildren: () => import('../tips/tips.module').then(m => m.TipsModule) },
    ]
  },
];


@NgModule({
  declarations: [WalletSectionComponent, NavbarComponent, SidebarComponent, HasRoleDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    TranslateSharedLazyModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatBadgeModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class WalletModule { }
