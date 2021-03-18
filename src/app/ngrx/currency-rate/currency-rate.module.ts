import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CurrencyRateEffects } from './currency-rate.effects';
import { currencyRateFeatureKey, reducer } from './currency-rate.reducer';


@NgModule({
    imports: [
        StoreModule.forFeature(currencyRateFeatureKey, reducer),
        EffectsModule.forFeature([CurrencyRateEffects]),
    ],
})
export class CurrencyRateModule {}
