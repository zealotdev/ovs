import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

import { HighlightsModule } from './highlights/highlights.module';

import { ElectionChartsModule } from './chart/chart.modules';
import { DashboardComponent } from './dashboard.component';
import { VoteboardModule } from './voteboard/voteboard.module';
import { IssueReportComponent } from './issue-report/issue-report.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [DashboardComponent, IssueReportComponent],
  imports: [
    HighlightsModule,
    ElectionChartsModule,
    VoteboardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [
    DashboardComponent,
    HighlightsModule,
    ElectionChartsModule,
    VoteboardModule,
  ],
})
export class DashboardModule {}
