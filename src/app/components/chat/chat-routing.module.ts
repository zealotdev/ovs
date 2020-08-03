import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'roomlist',
        component: RoomlistComponent,
      },

      {
        path: 'chatroom/:roomname',
        component: ChatroomComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
