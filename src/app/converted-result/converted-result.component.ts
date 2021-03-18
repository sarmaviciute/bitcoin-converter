import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { CalculatedCurrencies } from '../shared/models/models';

@Component({
  selector: 'app-converted-result',
  templateUrl: './converted-result.component.html',
  styleUrls: ['./converted-result.component.scss'],
})
export class ConvertedResultComponent implements OnInit, OnChanges {
  @Input() rates: Record<string, CalculatedCurrencies>;
  @Input() supportedCurrencies: string[];

  public selectedCurrencies: Array<string> = [];
  public availableCurrencies: Array<string> = [];

  public displayedColumns: string[] = ['currency', 'rate', 'control'];
  public dataSource: CalculatedCurrencies[] = [];

  constructor() {}

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.supportedCurrencies) {
      this.selectedCurrencies = changes?.supportedCurrencies?.currentValue;
    }

    this.updateDataSource();
  }

  public addCurrency(selectedCurrency: string, index: number): void {
    if (!this.selectedCurrencies.includes(selectedCurrency)) {
      this.selectedCurrencies.push(selectedCurrency);
      this.availableCurrencies.splice(index, 1);

      this.updateDataSource();
    }
  }

  public removeCurrency(currency: string, index: number): void {
    this.selectedCurrencies.splice(index, 1);
    this.availableCurrencies.push(currency);

    this.updateDataSource();
  }

  private updateDataSource(): void {
    this.dataSource = Object.keys(this.rates)?.length
      ? this.selectedCurrencies.map((currency) => {
          return this.rates[currency];
        })
      : [];
  }
}
