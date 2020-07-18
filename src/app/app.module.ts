import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header.component';
import { HighlightsComponent } from './components/highlights/hightlights.component';
import { ChartComponent } from './components/chart/chart.component';
import { VoteboardComponent } from './components/voteboard/voteboard.component';
import { VerifyCodeComponent } from './components/voteboard/verify/verify-code.component';
import { BallotComponent } from './components/voteboard/ballot/ballot.component';
import { TotalVotesComponent } from './components/highlights/total-votes/total-votes.component';
import { LiveSessionComponent } from './components/highlights/live-sessions/live-sessions.component';
import { ElectionTypeComponent } from './components/election-type/election-type.component';
import { MobileNavComponent } from './components/shared/mobile-nav/mobile-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HighlightsComponent,
    ChartComponent,
    VoteboardComponent,
    VerifyCodeComponent,
    BallotComponent,
    TotalVotesComponent,
    LiveSessionComponent,
    ElectionTypeComponent,
    MobileNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
