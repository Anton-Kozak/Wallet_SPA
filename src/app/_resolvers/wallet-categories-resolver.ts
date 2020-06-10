import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryData } from '../_model/categoryData';
import { Injectable } from '@angular/core';
import { WalletService } from '../_services/wallet.service';

@Injectable()
export class WalletCategoriesResolver implements Resolve<CategoryData[]>{

    //it subscribes automatically
    //we use pipe just to get errors
    resolve(): Observable<CategoryData[]> {
        return this.walletService.getWalletsCategories();
    }
    constructor(private walletService: WalletService) {
    }
}