import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'port-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  form: FormGroup;

  private nameLimit = 128;
  private messageLimit = 1024;

  private get nameLength() {
    return this.form.value.name ? this.form.value.name.length : 0;
  }

  private get messageLength() {
    return this.form.value.message ? this.form.value.message.length : 0;
  }

  get errors() {
    const nameError = this.nameLength > this.nameLimit ?
      `${this.nameLength} / ${this.nameLimit}` :
      'Name is missing';

    const emailError = this.form.value.email ?
      'Invalid email' :
      'Email is missing';

    const messageError = this.messageLength > this.messageLimit ?
      `${this.messageLength} / ${this.messageLimit}` :
      'Message is missing';

    return {
      name: nameError,
      email: emailError,
      message: messageError,
    };
  }

  get hints() {
    const nameHint = this.nameLength > this.nameLimit * 0.8 ?
      `${this.nameLength} / ${this.nameLimit}` :
      '';

    const messageHint = this.messageLength > this.messageLimit * 0.8 ?
      `${this.messageLength} / ${this.messageLimit}` :
      '';

    return {
      name: nameHint,
      message: messageHint,
    };
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
      email: ['', [Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(1024)]],
    });
  }

  resetForm() {
    this.form.reset();
  }

  submitForm() {
    console.log('Submitted, well, not really');
    console.log(this.form.value);
  }
}
