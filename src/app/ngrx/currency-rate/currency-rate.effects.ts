import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { RateService } from 'src/app/shared/services/rate.service';
import { loadRates, ratesError, requestRates } from './currency-rate.actions';

@Injectable()
export class CurrencyRateEffects {
    public get = createEffect(() =>
        this.actions.pipe(
            ofType(requestRates),
            switchMap((payload) =>
                this.rateService.getAll().pipe(
                    map((rates) => loadRates({ rates })),
                    catchError((error) => [
                        ratesError({
                            error,
                        }),
                    ])
                )
            ),
            tap((action) =>
                this.showNotification(
                    action.type === loadRates.type
                        ? 'Rates updated.'
                        : 'Failed to update currency rates.'
                )
            )
        )
    );

    private showNotification(message: string): void {
        this.snackBar.open(message, null, {
            duration: 2000,
        });
    }

    constructor(private rateService: RateService, private actions: Actions, private snackBar: MatSnackBar) {}
}
