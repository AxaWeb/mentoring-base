import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsArraysComponent } from './js-arrays.component';

describe('JsArraysComponent', () => {
  let component: JsArraysComponent;
  let fixture: ComponentFixture<JsArraysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsArraysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JsArraysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
