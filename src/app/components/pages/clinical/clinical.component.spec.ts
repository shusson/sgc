import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalComponent } from './clincal.component';

describe('ClinicalComponent', () => {
  let component: ClinicalComponent;
  let fixture: ComponentFixture<ClinicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
