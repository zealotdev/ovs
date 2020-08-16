import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-votes',
  templateUrl: './total-votes.component.html',
  styleUrls: ['./total-votes.component.scss'],
})
export class TotalVotesComponent implements OnInit {
  elections = [];
  selectedEl;
  sum: number = 0;

  constructor() {}
  ngOnInit() {}

  onSelect(id: number) {}
}
