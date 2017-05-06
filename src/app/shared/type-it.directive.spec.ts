import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TypeItDirective } from './type-it.directive';

@Component({ template: '<span portTypeIt></span>' })
class DummyComponent { }

let fixture: ComponentFixture<DummyComponent>;

function createDummyComponent() {
  fixture = TestBed.createComponent(DummyComponent);
}

describe('TypeItDirective', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [CommonModule],
        declarations: [DummyComponent, TypeItDirective],
      })
      .compileComponents()
      .then(() => createDummyComponent());
  }));

  it('should automatically start TypeIt', () => {
    const typeItDirective = fixture
      .debugElement
      .query(By.directive(TypeItDirective))
      .injector
      .get(TypeItDirective);
    const spy = spyOn(typeItDirective, 'startTypeIt');
    typeItDirective.ngAfterViewInit();
    expect(spy).toHaveBeenCalled();
  });
});
