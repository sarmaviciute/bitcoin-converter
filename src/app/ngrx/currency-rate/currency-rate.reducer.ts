import { createReducer, on } from '@ngrx/store';
import { ResponseModel } from 'src/app/shared/models/models';
import { loadRates, ratesError, requestRates } from './currency-rate.actions';

export const currencyRateFeatureKey = 'rates';

export interface CurrencyRateState {
  error?: string;
  rates: ResponseModel;
}

export const initialState: CurrencyRateState = {
  rates: undefined
};

export const reducer = createReducer(
  initialState,
  on(requestRates, (state, payload) => {
    return {
      ...state,
      error: undefined
    };
  }),
  on(loadRates, (state, payload) => {
    return {
      rates: payload.rates,
      error: undefined
    };
  }),
  on(ratesError, (state, payload) => {
    return {
      ...state,
      error: payload.error
    };
  })
);
