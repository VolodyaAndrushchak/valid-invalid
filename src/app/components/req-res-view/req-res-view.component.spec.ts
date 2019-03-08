import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqResViewComponent } from './req-res-view.component';

describe('ReqResViewComponent', () => {
  let component: ReqResViewComponent;
  let fixture: ComponentFixture<ReqResViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqResViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqResViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
