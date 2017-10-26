import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapdRowChartComponent } from './mapd-row-chart.component';

describe('MapdRowChartComponent', () => {
  let component: MapdRowChartComponent;
  let fixture: ComponentFixture<MapdRowChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapdRowChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdRowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
