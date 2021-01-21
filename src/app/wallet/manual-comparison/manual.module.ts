import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { RouterModule } from '@angular/router';
import { GraphsModule } from 'src/app/shared/graphs.module';
import { ManualComparisonComponent } from './manual-comparison.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { CardModule } from 'src/app/shared/card/card.module';


@NgModule({
    declarations: [ManualComparisonComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: ManualComparisonComponent }]),
        TranslateSharedLazyModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatTableModule,
        MatPaginatorModule,
        MatMomentDateModule,
        GraphsModule,
        CardModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ManualModule { }