import {
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdInputDirective, MdSnackBar } from '@angular/material';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { ContactService } from '../core/contact.service';

@Component({
  selector: 'port-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  @HostBinding('class.open') open = false;
  @HostBinding('class.animating') animating = false;
  @ViewChild('backdrop') private backdropEl: ElementRef;
  private prevStyles: { [key: string]: string };

  private nameLimit = 128;
  private messageLimit = 1024;

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
    this.contactService
      .getMessages()
      .subscribe((message: string) => {
        this.form.patchValue({ message });
      });
    this.contactService
      .getPrompts()
      .subscribe(() => this.openForm());
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(1024)]],
    });
  }

  submitForm() {
    this.submitting = true;
    this.contactService
      .submitForm(this.form.value)
      .finally(() => this.submitting = false)
      .subscribe(
        () => this.submitSuccess(),
        () => this.submitFailure(),
      );
  }

  submitSuccess() {
    this.form = null;
    setTimeout(() => this.createForm(), 0);
    this.snackbar.open('Thank you for your message', null, {
      duration: 2000,
    });
  }

  submitFailure() {
    this.snackbar
      .open('Unable to submit', 'RETRY', { duration: 2000 })
      .onAction()
      .subscribe(() => this.submitForm());
  }

  openForm(): void {
    if (!this.open && !this.animating) {
      this.open = true;
      this.animateOpen();
    }
  }

  closeForm(evt: Event): void {
    if (this.open && !this.animating) {
      this.open = false;
      this.animateClose();
    }
    evt.stopPropagation();
  }

  private animateOpen(): void {
    if (this.animating) {
      return;
    }
    // transform el from static position to fixed position
    const el = this.backdropEl.nativeElement;
    const top = el.offsetTop - window.scrollY;
    const left = el.offsetLeft - window.scrollX;
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    el.style.position = 'fixed';
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    // hide children elements
    this.animating = true;
    // save values to be restored in animateClose
    this.prevStyles = {
      top: el.style.top,
      left: el.style.left,
      width: el.style.width,
      height: el.style.height,
    };
    // lock the scrollbar to allow animateClose to work properly
    document.documentElement.style.overflow = 'hidden';

    const shrink = Observable.timer(10).do(() => {
      const diff = width - height;
      const newLeft = left + diff / 2;
      el.style.width = el.style.height;
      el.style.left = `${newLeft}px`;
      el.style.backgroundColor = '#fff';
      el.style.borderWidth = '0';
      el.style.padding = '8px 24px';
      this.prevStyles.shrinkedLeft = el.style.left;
    });
    const expand = Observable.timer(675).do(() => {
      el.style.top = 0;
      el.style.left = 0;
      el.style.width = '100%';
      el.style.height = '100%';
      el.style.borderRadius = '0';
      el.style.backgroundColor = '#303030';
    });
    const timeout = Observable.timer(725);

    shrink
      .concat(expand)
      .concat(timeout)
      .subscribe({
        complete: () => this.animating = false,
      });
  }

  private animateClose(): void {
    if (this.animating) {
      return;
    }
    // transform el from static position to fixed position
    const el = this.backdropEl.nativeElement;
    // hide children elements
    this.animating = true;

    const contract = Observable.timer(10).do(() => {
      el.style.top = this.prevStyles.top;
      el.style.left = this.prevStyles.shrinkedLeft;
      el.style.width = this.prevStyles.height;
      el.style.height = this.prevStyles.height;
      el.style.borderRadius = '99px';
      el.style.backgroundColor = '#fff';
    });
    const grow = Observable.timer(700).do(() => {
      el.style.width = this.prevStyles.width;
      el.style.left = this.prevStyles.left;
      el.style.backgroundColor = 'transparent';
      el.style.borderWidth = '2px';
      el.style.padding = '8px 24px';
    });
    const timeout = Observable.timer(700);

    contract
      .concat(grow)
      .concat(timeout)
      .subscribe({
        complete: () => {
          this.animating = false;
          // remove all styles added with javascript
          document.documentElement.style.overflow = '';
          el.style.position = '';
          el.style.width = '';
          el.style.height = '';
          el.style.top = '';
          el.style.left = '';
          el.style.borderWidth = '';
          el.style.borderRadius = '';
          el.style.backgroundColor = '';
          el.style.padding = '';
          el.style.transition = '';
        },
      });
  }
}
