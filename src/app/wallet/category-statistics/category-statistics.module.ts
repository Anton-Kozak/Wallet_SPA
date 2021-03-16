import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateSharedLazyModule } from 'src/app/shared/translate-shared-lazy/translate-shared-lazy.module';
import { RouterModule } from '@angular/router';
import { GraphsModule } from 'src/app/shared/graphs.module';
import { CategoryStatisticsComponent } from './category-statistics.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [CategoryStatisticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CategoryStatisticsComponent }
    ]),
    TranslateSharedLazyModule,
    GraphsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CategoryStatisticsModule {}
