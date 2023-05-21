import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDeatilsComponent } from './currency-deatils.component';

describe('CurrencyDeatilsComponent', () => {
  let component: CurrencyDeatilsComponent;
  let fixture: ComponentFixture<CurrencyDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyDeatilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
