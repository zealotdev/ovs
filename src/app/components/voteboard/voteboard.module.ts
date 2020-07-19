import { NgModule } from '@angular/core';
import { VoteboardComponent } from './voteboard.component';
import { VerifyCodeComponent } from './verify/verify-code.component';
import { BallotComponent } from './ballot/ballot.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VoteboardComponent, VerifyCodeComponent, BallotComponent],
  imports: [BrowserModule, FormsModule],
  exports: [VoteboardComponent, VerifyCodeComponent, BallotComponent],
})
export class VoteboardModule {}
