import { createFeatureSelector } from '@ngrx/store';
import { Flight } from '../../models/flight';
 
export const selectFlights = createFeatureSelector<Flight[]>('flights');
export const selectFlightsByOrigin = createFeatureSelector<Flight[]>('flightsByOrigin');
