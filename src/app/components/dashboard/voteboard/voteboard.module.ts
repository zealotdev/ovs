import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { VoteboardComponent } from './voteboard.component';
import { VerifyCodeComponent } from './verify/verify-code.component';
import { BallotComponent } from './ballot/ballot.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './ballot/profile/profile.component';

@NgModule({
  declarations: [
    VoteboardComponent,
    VerifyCodeComponent,
    ProfileComponent,
    BallotComponent,
  ],
  imports: [BrowserModule, FormsModule, CommonModule],
  exports: [VoteboardComponent],
})
export class VoteboardModule {}
