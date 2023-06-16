import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { transportReducer } from "./store/transport/transport.reducer";
import { TransportEffect } from './store/transport/transport.effect';
import { FlightService } from './services/flight/flight.service';
import { FlightEffect } from './store/flight/flight.effect';
import { flightReducer } from './store/flight/flight.reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { APIURL } from './tokens/tokens';
import { journeyReducer } from './store/journey/journey.reducer';
import { HeaderComponent } from './components/header/header.component';

interface AppState {
  transports: any;
  flights: any;
  journey: any;
}
export const reducers: ActionReducerMap<AppState> = {
  transports: transportReducer,
  flights: flightReducer,
  journey: journeyReducer
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTypeaheadModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TransportEffect, FlightEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    FlightService,
    { provide: APIURL, useValue: 'https://recruiting-api.newshore.es/api' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
