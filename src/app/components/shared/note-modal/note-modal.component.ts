import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss'],
})
export class NoteModalComponent {
  constructor(private matRef: MatDialogRef<NoteModalComponent>) {}

  onClose() {
    this.matRef.close();
  }
}
