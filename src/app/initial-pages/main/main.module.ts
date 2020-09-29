import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RegGuard } from 'src/app/_guards/reg.guard';
import { MainComponent } from './main.component';
import { InitialNavbarComponent } from 'src/app/layout/initial-navbar/initial-navbar.component';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { MainGuard } from 'src/app/_guards/main.guard';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NowalletGuard } from 'src/app/_guards/nowallet.guard';
// import { ContactsComponent } from '../contacts/contacts.component';

// import { NoWalletComponent } from '../no-wallet/no-wallet.component';


const routes: Routes = [
    {
        path: '', component: MainComponent, canActivate: [MainGuard], children: [
            { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
            { path: 'about', loadChildren: () => import('../about/about.module').then(m => m.AboutModule) },
            { path: 'reg', loadChildren: () => import('../signup-signin/start-now.module').then(m => m.StartNowModule) },
            { path: 'no-wallet', loadChildren: () => import('../no-wallet/no-wallet.module').then(m => m.NoWalletModule), canActivate: [NowalletGuard] },
        ]
    },
];

@NgModule({
    declarations: [MainComponent, InitialNavbarComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateSharedLazyModule,
        MatDialogModule
    ],
})
export class MainModule { }
