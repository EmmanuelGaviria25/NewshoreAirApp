export class FlightAction {
}

import { createAction, props } from '@ngrx/store';
import { Flight } from '../../models/flight';
 
export const invokeFlightsAPI = createAction(
  '[Flights API] Invoke Flights Fetch API'
);

export const flightsFetchAPISuccess = createAction(
  '[Flights API] Fetch API Success',
  props<{ allFlights: Flight[] }>()
);
