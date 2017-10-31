import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialogueComponent } from './filter-dialogue.component';

describe('FilterDialogueComponent', () => {
  let component: FilterDialogueComponent;
  let fixture: ComponentFixture<FilterDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
