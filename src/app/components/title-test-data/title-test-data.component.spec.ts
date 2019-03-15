import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleTestDataComponent } from './title-test-data.component';

describe('TitleTestDataComponent', () => {
  let component: TitleTestDataComponent;
  let fixture: ComponentFixture<TitleTestDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleTestDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleTestDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
