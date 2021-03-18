import { currencyRateFeatureKey, CurrencyRateState } from './currency-rate/currency-rate.reducer';

export interface IRateConverterState {
    [currencyRateFeatureKey]: CurrencyRateState;
}
