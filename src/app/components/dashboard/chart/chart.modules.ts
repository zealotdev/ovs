import { NgModule } from '@angular/core';
import { ChartComponent } from './chart.component';
import { ElectionTypeComponent } from './election-type/election-type.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { ChatModule } from '../../chat/chat.module';

@NgModule({
  declarations: [ChartComponent, ElectionTypeComponent],
  imports: [ChartsModule, BrowserModule, ChatModule],
  exports: [ChartComponent, ElectionTypeComponent, ChartsModule, ChatModule],
})
export class ElectionChartsModule {}
