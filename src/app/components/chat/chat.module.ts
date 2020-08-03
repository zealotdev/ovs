import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { AddRoomComponent } from './add-room/add-room.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';

import { ChatComponent } from './chat.component';
import { LoginComponent } from './login/login.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [
    ChatComponent,
    LoginComponent,
    RoomlistComponent,
    ChatroomComponent,
    AddRoomComponent,
  ],
  imports: [
    ChatRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    AngularFireDatabaseModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressBarModule,
    NgxEmojiPickerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatChipsModule,
  ],
  exports: [ChatComponent, ReactiveFormsModule, FormsModule],
  providers: [DatePipe],
})
export class ChatModule {}
