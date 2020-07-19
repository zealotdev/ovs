import { NgModule } from '@angular/core';
import { ChartComponent } from './chart.component';
import { ElectionTypeComponent } from './election-type/election-type.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ChartComponent, ElectionTypeComponent],
  imports: [ChartsModule, BrowserModule],
  exports: [ChartComponent, ElectionTypeComponent, ChartsModule],
})
export class ElectionChartsModule {}
