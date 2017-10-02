import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClincalFilteringComponent } from './clincal-filtering.component';

describe('ClincalFilteringComponent', () => {
  let component: ClincalFilteringComponent;
  let fixture: ComponentFixture<ClincalFilteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClincalFilteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClincalFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
