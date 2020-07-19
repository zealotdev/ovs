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
import { ChatModule } from './components/chat/chat.module';
import { Routes } from '@angular/router';
import { DashboardModule } from './components/dashboard/dashboard.module';

// const appRoute: Routes = [
//   {
//     path: '',
//     component: DashboardComponent',
//   },
// ];
@NgModule({
  declarations: [AppComponent, HeaderComponent, MobileNavComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ChatModule,
    DashboardModule,
    AppRoutingModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
