import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapdPieChartComponent } from './mapd-pie-chart.component';

describe('MapdPieChartComponent', () => {
  let component: MapdPieChartComponent;
  let fixture: ComponentFixture<MapdPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
