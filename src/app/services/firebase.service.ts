import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class firebaseDataService {
  data;
  constructor(private _angularFireDatabase: AngularFireDatabase) {}

  getAllData(): AngularFireObject<any> {
    // this.data = this._angularFireDatabase.object('/electionData/electionList');
    console.log(this.data);
    return this.data;
  }
}
