import { NgModule } from '@angular/core';
import { ChartComponent } from './chart.component';
import { ElectionTypeComponent } from './election-type/election-type.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChatModule } from '../../chat/chat.module';

@NgModule({
  declarations: [ChartComponent, ElectionTypeComponent],
  imports: [BrowserModule, ChatModule],
  exports: [ChartComponent, ElectionTypeComponent, ChatModule],
})
export class ElectionChartsModule {}
