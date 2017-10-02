import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalChartComponent } from './clincal-chart.component';

describe('ClinicalChartComponent', () => {
  let component: ClinicalChartComponent;
  let fixture: ComponentFixture<ClinicalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
