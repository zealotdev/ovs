import { NgModule } from '@angular/core';
import { HighlightsComponent } from './hightlights.component';
import { TotalVotesComponent } from './total-votes/total-votes.component';
import { LiveSessionComponent } from './live-sessions/live-sessions.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    HighlightsComponent,
    TotalVotesComponent,
    LiveSessionComponent,
  ],
  imports: [BrowserModule],
  exports: [HighlightsComponent, TotalVotesComponent, LiveSessionComponent],
})
export class HighlightsModule {}
