import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class PWAService {
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe((event) => {
      window.location.reload();
    });
  }
}
