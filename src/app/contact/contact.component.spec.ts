import { DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ContactService } from '../core/contact.service';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact.component';

let fixture: ComponentFixture<ContactComponent>;
let component: ContactComponent;
let page: Page;

class Page {
  nameInput: DebugElement;
  emailInput: DebugElement;
  messageInput: DebugElement;
  submitButton: DebugElement;

  submitSpy: jasmine.Spy;

  constructor() {
    this.submitSpy = spyOn(component, 'submitForm');
  }

  createElements() {
    this.nameInput = fixture.debugElement.query(By.css('[type="text"]'));
    this.emailInput = fixture.debugElement.query(By.css('[type="email"]'));
    this.messageInput = fixture.debugElement.query(By.css('textarea'));
    this.submitButton = fixture.debugElement
      .query(By.css('[type="submit"]'));
  }

  fillForm(name: string, email: string, message: string) {
    this.nameInput.nativeElement.value = name;
    this.emailInput.nativeElement.value = email;
    this.messageInput.nativeElement.value = message;

    this.nameInput.triggerEventHandler('input', {
      target: this.nameInput.nativeElement,
    });
    this.emailInput.triggerEventHandler('input', {
      target: this.emailInput.nativeElement,
    });
    this.messageInput.triggerEventHandler('input', {
      target: this.messageInput.nativeElement,
    });

    fixture.detectChanges();
  }
}

function createContactComponent() {
  fixture = TestBed.createComponent(ContactComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
  });
}

function openContactForm() {
  component.openForm();
  fixture.detectChanges();
  tick(10000);
  fixture.detectChanges();
  page.createElements();
}

describe('ContactComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          SharedModule,
          CoreModule,
          ReactiveFormsModule,
          NoopAnimationsModule,
        ],
        declarations: [ContactComponent],
      })
      .compileComponents()
      .then(() => createContactComponent());
  }));

  it('should submit form', fakeAsync(() => {
    openContactForm();
    page.fillForm('abc', 'a@b.c', '123');
    page.submitButton.nativeElement.click();
    expect(page.submitSpy).toHaveBeenCalled();
  }));

  it('should listen to new messages from ContactService', fakeAsync(() => {
    openContactForm();
    const message = 'xyzzzz';
    TestBed.get(ContactService).setMessage(message);
    fixture.detectChanges();
    expect(page.messageInput.nativeElement.value).toBe(message);
  }));

  it('should listen to open prompts from ContactService', () => {
    expect(component.open).toBe(false);
    TestBed.get(ContactService).triggerPrompt();
    fixture.detectChanges();
    expect(component.open).toBe(true);
  });
});
