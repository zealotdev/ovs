import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header.component';
import { HighlightsComponent } from './components/highlights/hightlights.component';
import { GraphComponent } from './components/graph/graph.component';
import { VoteboardComponent } from './components/voteboard/voteboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HighlightsComponent,
    GraphComponent,
    VoteboardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
