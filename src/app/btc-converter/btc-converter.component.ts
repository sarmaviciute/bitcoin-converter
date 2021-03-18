import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { interval, Observable } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import * as fromRates from '../ngrx/currency-rate';
import { requestRates } from '../ngrx/currency-rate';
import { IRateConverterState } from '../ngrx/state.interface';
import { BaseComponent } from '../shared/base.comonent';
import { CalculatedCurrencies, CurrencyDetails } from '../shared/models/models';

@Component({
  selector: 'app-btc-converter',
  templateUrl: './btc-converter.component.html',
  styleUrls: ['./btc-converter.component.scss'],
})
export class BtcConverterComponent extends BaseComponent implements OnInit {
  public readonly supportedCurrencies = ['USD', 'EUR', 'GBP'];

  public form: FormGroup;
  public calculatedCurrencies: Record<string, CalculatedCurrencies> = {};

  public currencyRates: Record<string, CurrencyDetails> = {};
  public lastTimeUpdated: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<IRateConverterState>
  ) {
    super();
  }

  public ngOnInit(): void {
    this.form = this.createForm();
    this.watchRates();

    this.store
      .pipe(select(fromRates.selectRates), takeUntil(this.ngUnsubscribe))
      .subscribe((rates) => {
        this.currencyRates = rates;
      });

    this.lastTimeUpdated = this.store.pipe(
      select(fromRates.selectUpdateTimeStamp)
    );
  }

  private watchRates(): void {
    interval(60000)
      .pipe(startWith(0), takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.store.dispatch(requestRates()));
  }

  public calculateCurrencyRates(
    btc: number,
    rates: Record<string, CurrencyDetails>
  ): Record<string, CalculatedCurrencies> {
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

  public convert(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const btc: number = this.form.value?.btc;
    this.calculatedCurrencies = this.calculateCurrencyRates(btc, this.currencyRates);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      btc: [1, [Validators.required, Validators.min(1)]],
    });
  }
}
