import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { ContactService } from '../core/contact.service';
import { EnvelopeComponent } from '../shared/envelope/envelope.component';

@Component({
  selector: 'port-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../shared/subheading.scss', './contact.component.scss'],
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  submitted = false;

  private nameLimit = 128;
  private messageLimit = 1024;
  @ViewChild(EnvelopeComponent) private envelope: EnvelopeComponent;

  private get nameLength() {
    return this.form.value.name ? this.form.value.name.length : 0;
  }

  private get messageLength() {
    return this.form.value.message ? this.form.value.message.length : 0;
  }

  get errors() {
    const nameErrors = this.form.get('name').errors;
    let nameMessage;
    if (!nameErrors) {
      nameMessage = '';
    } else if (nameErrors.required) {
      nameMessage = 'Name is missing';
    } else if (nameErrors.maxlength) {
      nameMessage = `${this.nameLength} / ${this.nameLimit}`;
    }

    const emailErrors = this.form.get('email').errors;
    let emailMessage;
    if (!emailErrors) {
      emailMessage = '';
    } else if (emailErrors.required) {
      emailMessage = 'Email is missing';
    } else if (emailErrors.email) {
      emailMessage = 'Invalid email';
    }

    const messageErrors = this.form.get('message').errors;
    let messageMessage;
    if (!messageErrors) {
      messageMessage = '';
    } else if (messageErrors.required) {
      messageMessage = 'Message is missing';
    } else if (messageErrors.maxlength) {
      messageMessage = `${this.messageLength} / ${this.messageLimit}`;
    }

    return {
      name: nameMessage,
      email: emailMessage,
      message: messageMessage,
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

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackbar: MdSnackBar,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(1024)]],
    });
  }

  resetForm() {
    this.form.reset();
  }

  submitForm() {
    this.submitting = true;
    this.envelope.close().then(() => {
      this.submitted = false;
      this.envelope.reopen();
    });
    this.contactService
      .submitForm(this.form.value)
      .subscribe(
        () => this.submitSuccess(),
        () => this.submitFailure(),
      );
  }

  submitSuccess() {
    this.submitting = false;
    this.submitted = true;
    this.snackbar.open('Thank you for your message', null, {
      duration: 2000,
    });
  }

  submitFailure() {
    this.submitting = false;
    this.snackbar
      .open('Unable to submit', 'RETRY', { duration: 2000 })
      .onAction()
      .subscribe(() => this.submitForm());
  }
}
