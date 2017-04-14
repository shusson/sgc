import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualListItemComponent } from './virtual-list-item.component';

describe('VirtualListItemComponent', () => {
  let component: VirtualListItemComponent;
  let fixture: ComponentFixture<VirtualListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
