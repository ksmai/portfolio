import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  resetButton: DebugElement;

  submitSpy: jasmine.Spy;
  resetSpy: jasmine.Spy;

  constructor() {
    this.submitSpy = spyOn(component, 'submitForm');
    this.resetSpy = spyOn(component, 'resetForm').and.callThrough();
  }

  createElements() {
    this.nameInput = fixture.debugElement.query(By.css('[type="text"]'));
    this.emailInput = fixture.debugElement.query(By.css('[type="email"]'));
    this.messageInput = fixture.debugElement.query(By.css('textarea'));
    this.submitButton = fixture.debugElement
      .query(By.css('[type="submit"]'));
    this.resetButton = fixture.debugElement
      .query(By.css('[type="button"]'));
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
    page.createElements();
  });
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

  it('should submit form', () => {
    page.fillForm('abc', 'a@b.c', '123');
    page.submitButton.nativeElement.click();
    expect(page.submitSpy).toHaveBeenCalled();
  });

  it('should reset form', () => {
    page.fillForm('abc', 'a@b.c', '123');
    expect(page.nameInput.nativeElement.value).toBe('abc');
    page.resetButton.nativeElement.click();
    expect(page.resetSpy).toHaveBeenCalled();
    expect(page.nameInput.nativeElement.value).toBeFalsy();
  });

  it('should listen to new messages from ContactService', () => {
    const message = 'xyzzzz';
    TestBed.get(ContactService).setMessage(message);
    fixture.detectChanges();
    expect(page.messageInput.nativeElement.value).toBe(message);
  });
});
