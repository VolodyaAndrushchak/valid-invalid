import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqResItemComponent } from './req-res-item.component';

describe('ReqResItemComponent', () => {
  let component: ReqResItemComponent;
  let fixture: ComponentFixture<ReqResItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqResItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqResItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
