import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/material.module';
import * as fromCurrencyRates from '../ngrx/currency-rate';
import { CalculatedCurrencies, CurrencyDetails } from '../shared/models/models';
import { createDummyComponent } from '../testing/dummyComponent';
import { BtcConverterComponent } from './btc-converter.component';

describe('BtcConverterComponent', () => {
  let component: BtcConverterComponent;
  let fixture: ComponentFixture<BtcConverterComponent>;

  const initialState = {
    rates: {},
};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule, StoreModule.forRoot({})],
      declarations: [ BtcConverterComponent, createDummyComponent('app-converted-result') ],
      providers: [provideMockStore({initialState, selectors: [
        {
            selector: fromCurrencyRates.selectRates,
            value: {}
        },
    ]})],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtcConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should support USD, GBP, EUR currencies', () => {
    expect(component.supportedCurrencies).toEqual(['USD', 'EUR', 'GBP']);
  });

  it('should convert given currencies', () => {
    const btc = 13;
    const currencies: Record<string, CurrencyDetails> = {
      USD: {
        rate_float: 54866.3198
      } as CurrencyDetails,
      EUR: {
        rate_float: 46062.3604
      } as CurrencyDetails,
      GBP: {
        rate_float: 39434.5638
      } as CurrencyDetails,
    };

    const expectedResult: Record<string, CalculatedCurrencies> = calculateCurrencyRates(btc, currencies);

    expect(component.calculateCurrencyRates(btc, currencies)).toEqual(expectedResult);
  });

  function calculateCurrencyRates(btc, rates: Record<string, CurrencyDetails>): Record<string, CalculatedCurrencies> {
    const calculatedRates = Object.entries(rates).map(([currency, rate]) => {
      const calculatedRate: CalculatedCurrencies = {
        code: rate.code,
        symbol: rate.symbol,
        calculatedRate: Math.floor(btc * rate.rate_float),
      };
      return [currency, calculatedRate];
    });

    return Object.fromEntries(calculatedRates);
  }
});
