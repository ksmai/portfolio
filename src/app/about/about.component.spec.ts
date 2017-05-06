import { DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MdDialog } from '@angular/material';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { CoreModule } from '../core/core.module';
import { ScrollService } from '../core/scroll.service';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about.component';

let fixture: ComponentFixture<AboutComponent>;
let component: AboutComponent;
let page: Page;

class Page {
  dialogSpy: jasmine.Spy;
  projectSpy: jasmine.Spy;
  contactSpy: jasmine.Spy;

  skipButton: DebugElement;
  projectButton: DebugElement;
  destroyButton: DebugElement;
  githubLink: DebugElement;

  constructor() {
    const scrollService = TestBed.get(ScrollService);
    this.projectSpy = spyOn(scrollService, 'scrollToProjects');
    this.contactSpy = spyOn(scrollService, 'scrollToContact');
    this.dialogSpy = spyOn(TestBed.get(MdDialog), 'open')
      .and.returnValue({ afterClosed() { return Observable.of('abc'); } });
  }

  createElements() {
    this.githubLink = fixture.debugElement
      .query(By.css('[href*="github"]'));
    this.skipButton = fixture.debugElement.query(By.css('.skip-button'));
    this.projectButton = fixture.debugElement
      .query(By.css('.project-button'));
    this.destroyButton = fixture.debugElement
      .query(By.css('.destroy-button'));
  }
}

function createAboutComponent() {
  fixture = TestBed.createComponent(AboutComponent);
  component = fixture.componentInstance;
  page = new Page();
}

describe('AboutComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [SharedModule, CoreModule],
        declarations: [AboutComponent],
      })
      .compileComponents()
      .then(() => createAboutComponent());
  }));

  beforeEach(fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    tick(100000);
    page.createElements();
  }));

  it('should have a skip button', () => {
    expect(page.skipButton).toBeDefined();
    page.skipButton.nativeElement.click();
    expect(page.projectSpy).toHaveBeenCalled();
  });

  it('should have a project button', () => {
    expect(page.projectButton).toBeDefined();
    page.projectButton.nativeElement.click();
    expect(page.projectSpy).toHaveBeenCalled();
  });

  it('should have a destroy button', () => {
    expect(page.destroyButton).toBeDefined();
    page.destroyButton.nativeElement.click();
    expect(page.dialogSpy).toHaveBeenCalled();
    expect(page.contactSpy).toHaveBeenCalled();
  });

  it('should have a link to github', () => {
    expect(page.githubLink).toBeDefined();
  });
});
