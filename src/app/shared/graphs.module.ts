import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BarCategoryComparisonComponent } from '../graphs/bar-category-comparison/bar-category-comparison.component';
import { BarComparisonComponent } from '../graphs/bar-comparison/bar-comparison.component';
import { DonutChartCategoriesComponent } from '../graphs/donut-chart-categories/donut-chart-categories.component';
import { DonutChartComponent } from '../graphs/donut-chart/donut-chart.component';
import { LineChartComponent } from '../graphs/line-chart/line-chart.component';
import { PieGraphComponent } from '../graphs/pie-graph/pie-graph.component';
import { SingleBarChartComponent } from '../graphs/single-bar-chart/single-bar-chart.component';





@NgModule({
    imports: [ChartsModule, CommonModule],
    declarations: [PieGraphComponent, DonutChartCategoriesComponent, BarCategoryComparisonComponent, DonutChartComponent, LineChartComponent, SingleBarChartComponent, BarComparisonComponent],
    exports: [PieGraphComponent, DonutChartCategoriesComponent, BarCategoryComparisonComponent, DonutChartComponent, LineChartComponent, SingleBarChartComponent, BarComparisonComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class GraphsModule { }
