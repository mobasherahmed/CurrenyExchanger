import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertResultCardComponent } from './convert-result-card.component';

describe('ConvertResultCardComponent', () => {
  let component: ConvertResultCardComponent;
  let fixture: ComponentFixture<ConvertResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertResultCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
