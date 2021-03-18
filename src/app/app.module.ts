import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from 'src/material.module';
import { AppComponent } from './app.component';
import { BtcConverterComponent } from './btc-converter/btc-converter.component';
import { ConvertedResultComponent } from './converted-result/converted-result.component';
import { NGRXModule } from './ngrx/ngrx.module';
import { RateService } from './shared/services/rate.service';

@NgModule({
  declarations: [AppComponent, BtcConverterComponent, ConvertedResultComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    NGRXModule
  ],
  providers: [RateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
