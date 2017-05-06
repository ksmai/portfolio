/* tslint:disable max-classes-per-file */
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;
let page: Page;

class Page {
  about: DebugElement;
  contact: DebugElement;
  navbar: DebugElement;
  projects: DebugElement;

  createElements(): void {
    this.about = fixture.debugElement.query(By.css('#about'));
    this.projects = fixture.debugElement.query(By.css('#projects'));
    this.contact = fixture.debugElement.query(By.css('#contact'));
    this.navbar = fixture.debugElement.query(By.css('port-navbar'));
  }
}

function createAppComponent(): Promise<any> {
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

@Component({ selector: 'port-about', template: '' })
class MockAboutComponent { }

@Component({ selector: 'port-navbar', template: '' })
class MockNavbarComponent { }

@Component({ selector: 'port-project', template: '' })
class MockProjectComponent { }

@Component({ selector: 'port-contact', template: '' })
class MockContactComponent { }

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AppComponent,
          MockAboutComponent,
          MockNavbarComponent,
          MockContactComponent,
          MockProjectComponent,
        ],
      })
      .compileComponents()
      .then(() => createAppComponent());
  }));

  it('should contain all essential components', () => {
    expect(page.about).toBeDefined();
    expect(page.contact).toBeDefined();
    expect(page.projects).toBeDefined();
    expect(page.navbar).toBeDefined();
  });
});
