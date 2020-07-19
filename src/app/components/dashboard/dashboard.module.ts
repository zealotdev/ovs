import { NgModule } from '@angular/core';
import { HighlightsModule } from './highlights/highlights.module';
import { ElectionChartsModule } from './chart/chart.modules';
import { DashboardComponent } from './dashboard.component';
import { VoteboardModule } from './voteboard/voteboard.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [HighlightsModule, ElectionChartsModule, VoteboardModule],
  exports: [
    DashboardComponent,
    HighlightsModule,
    ElectionChartsModule,
    VoteboardModule,
  ],
})
export class DashboardModule {}
