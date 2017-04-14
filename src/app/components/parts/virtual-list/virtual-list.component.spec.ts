import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualListComponent } from './virtual-list.component';

describe('VirtualListComponent', () => {
  let component: VirtualListComponent;
  let fixture: ComponentFixture<VirtualListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
