import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapdAvgAfChartComponent } from './mapd-avg-af-chart.component';

describe('MapdAvgAfChartComponent', () => {
  let component: MapdAvgAfChartComponent;
  let fixture: ComponentFixture<MapdAvgAfChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdAvgAfChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdAvgAfChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
