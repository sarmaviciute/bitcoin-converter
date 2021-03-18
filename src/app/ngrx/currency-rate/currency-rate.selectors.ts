import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { CurrencyDetails } from 'src/app/shared/models/models';
import { IRateConverterState } from '../state.interface';
import { currencyRateFeatureKey, CurrencyRateState } from './currency-rate.reducer';

export const selectFeature: MemoizedSelector<
  IRateConverterState,
  CurrencyRateState
> = createFeatureSelector<CurrencyRateState>(currencyRateFeatureKey);

export const selectError: MemoizedSelector<
  IRateConverterState,
  string
> = createSelector(selectFeature, ({ error }) => error);

export const selectRates: MemoizedSelector<
  IRateConverterState,
  Record<string, CurrencyDetails>
> = createSelector(selectFeature, ({ rates }) => rates?.bpi);

export const selectUpdateTimeStamp: MemoizedSelector<
  IRateConverterState,
  string
> = createSelector(selectFeature, ({ rates }) => rates?.time?.updated);
