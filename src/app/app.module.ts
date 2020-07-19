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
import { MobileNavComponent } from './components/shared/mobile-nav/mobile-nav.component';
import { VoteboardModule } from './components/voteboard/voteboard.module';
import { HighlightsModule } from './components/highlights/highlights.module';
import { ElectionChartsModule } from './components/chart/chart.modules';
import { ChatModule } from './components/chat/chat.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MobileNavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    VoteboardModule,
    HighlightsModule,
    ElectionChartsModule,
    ChatModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
