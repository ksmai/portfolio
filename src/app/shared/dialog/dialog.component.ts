import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  title: string;
  content: string;
  negative: string;
  positive: string;
  positiveLink: string;
  negativeLink: string;

  constructor(
    private dialogRef: MdDialogRef<DialogComponent>,
    @Inject(MD_DIALOG_DATA) private data: any,
  ) {
    this.title = data.title || 'Are you sure?';
    this.content = data.content || '';
    this.negative = data.negative || 'NO';
    this.positive = data.positive || 'YES';
    this.positiveLink = data.positiveLink || '';
    this.negativeLink = data.negativeLink || '';
  }

  accept() {
    this.dialogRef.close(true);
  }

  reject() {
    this.dialogRef.close(false);
  }
}
