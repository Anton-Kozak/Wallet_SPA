import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/wallet/home-wallet', pathMatch: 'full' },
  {
    path: 'main',
    loadChildren: () =>
      import('./initial-pages/main/main.module').then((m) => m.MainModule)
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import('./wallet/wallet.module').then((m) => m.WalletModule)
  },

  { path: '**', component: NotFoundComponent }
];
