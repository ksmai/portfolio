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
  requireInput: boolean;
  input: string = '';
  placeholder: string;

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
    this.requireInput = !!data.requireInput;
    this.placeholder = data.placeholder;
  }

  accept() {
    this.dialogRef.close(this.requireInput ? this.input : true);
  }

  reject() {
    this.dialogRef.close(false);
  }
}
