import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { ChatComponent } from './chat.component';
import { LoginComponent } from './login/login.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { AddroomComponent } from './addroom/addroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatRoutingModule } from './chat-routing.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [
    ChatComponent,
    LoginComponent,
    RoomlistComponent,
    AddroomComponent,
    ChatroomComponent,
  ],
  imports: [
    ChatRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AngularFireDatabaseModule,
  ],
  exports: [ChatComponent, ReactiveFormsModule, FormsModule],
  providers: [DatePipe],
})
export class ChatModule {}
