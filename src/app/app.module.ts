import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header.component';
import { MobileNavComponent } from './components/shared/mobile-nav/mobile-nav.component';
import { ChatModule } from './components/chat/chat.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MobileNavComponent],
  imports: [
    BrowserModule,
    FormsModule,
    DashboardModule,
    AppRoutingModule,
    ChatModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
