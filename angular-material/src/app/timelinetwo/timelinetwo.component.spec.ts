import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinetwoComponent } from './timelinetwo.component';

describe('TimelinetwoComponent', () => {
  let component: TimelinetwoComponent;
  let fixture: ComponentFixture<TimelinetwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinetwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelinetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
