import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { RouterModule } from '@angular/router';
import { GraphsModule } from 'src/app/shared/graphs.module';
import { UserStatisticsComponent } from './user-statistics.component';




@NgModule({
    declarations: [UserStatisticsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: UserStatisticsComponent }]),
        TranslateSharedLazyModule,
        GraphsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserStatisticsModule { }