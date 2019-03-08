import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormEndpointComponent } from './input-form-endpoint.component';

describe('InputFormEndpointComponent', () => {
  let component: InputFormEndpointComponent;
  let fixture: ComponentFixture<InputFormEndpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFormEndpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
