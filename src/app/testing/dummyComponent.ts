import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

// tslint:disable-next-line: typedef
export function createDummyComponent(name: string) {
    function noop(): void {
        // none
    }

    @Component({
        selector: name,
        template: '',
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: DummySanctionSummaryComponent,
                multi: true
            }
        ]
    })
    class DummySanctionSummaryComponent {
        public writeValue = noop;
        public registerOnChange = noop;
        public registerOnTouched = noop;
    }

    return DummySanctionSummaryComponent;
}
