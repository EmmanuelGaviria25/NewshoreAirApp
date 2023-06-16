
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { flightsFetchAPISuccess, invokeFlightsAPI } from './flight.action';
import { selectFlights } from './flight.selector';
import { FlightService } from '../../services/flight/flight.service';
import { Flight } from '../../models/flight';

@Injectable()
export class FlightEffect {
  constructor(
    private actions$: Actions,
    private flightService: FlightService,
    private store: Store
  ) { }

  loadAllFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeFlightsAPI),
      withLatestFrom(this.store.pipe(select(selectFlights))),
      mergeMap(([, flightformStore]) => {
        if (flightformStore.length > 0) {
          return EMPTY;
        }
        return this.flightService
          .get()
          .pipe(map((data) => {
            const res: Flight[] = data.map(val => ({
                departureStation: val.departureStation,
                arrivalStation: val.arrivalStation,
                transport: {
                  flightCarrier: val.flightCarrier,
                  flightNumber: val.flightNumber,
                },
                price: val.price,
              })
            );
            return flightsFetchAPISuccess({ allFlights: res });
          }));
      })
    )
  );
}