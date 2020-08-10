import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { VoteboardComponent } from './voteboard.component';
import { VerifyTokenComponent } from './verify-vote-token/verify-vote-token.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BallotModules } from './ballot/ballot.modules';

@NgModule({
  declarations: [VoteboardComponent, VerifyTokenComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    BallotModules,
    ReactiveFormsModule,
  ],
  exports: [VoteboardComponent],
})
export class VoteboardModule {}
