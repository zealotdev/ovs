import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header.component';
import { MobileNavComponent } from './components/shared/mobile-nav/mobile-nav.component';
import { ChatModule } from './components/chat/chat.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PWAPromptComponent } from './components/pwa-promptcomponent/pwa-prompt-component';
import { PWAService } from './services/pwa-service';
import { MatIconModule } from '@angular/material/icon';

const initializer = (pwaService: PWAService) => () =>
  pwaService.initPwaPrompt();
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MobileNavComponent,
    PWAPromptComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DashboardModule,
    AppRoutingModule,
    ChatModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBottomSheetModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [PWAService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
