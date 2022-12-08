import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtwoComponent } from './searchtwo.component';

describe('SearchtwoComponent', () => {
  let component: SearchtwoComponent;
  let fixture: ComponentFixture<SearchtwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchtwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchtwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
