import { createAction, props } from '@ngrx/store';
import { ResponseModel } from 'src/app/shared/models/models';

export const requestRates = createAction(
    '[Rates] Request rates'
);

export const loadRates = createAction(
    '[Rates] Load rates',
    props<{ rates: ResponseModel }>()
);

export const ratesError = createAction(
    '[Rates] Rates error',
    props<{ error: string }>()
);
