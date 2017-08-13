import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project.component';

let fixture: ComponentFixture<ProjectComponent>;
let component: ProjectComponent;
let page: Page;

class Page {
  firstTile: DebugElement;

  createElements(): void {
    this.firstTile = fixture.debugElement.query(By.css('md-grid-tile'));
  }
}

function createProjectComponent() {
  fixture = TestBed.createComponent(ProjectComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('ProjectComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [SharedModule, CoreModule],
        declarations: [ProjectComponent],
      })
      .compileComponents()
      .then(() => createProjectComponent());
  }));
});
