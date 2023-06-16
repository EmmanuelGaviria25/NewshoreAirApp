import { createReducer, on } from "@ngrx/store";
import { Flight } from "../../models/flight";
import { flightsFetchAPISuccess } from "./flight.action";

export const initialState: ReadonlyArray<Flight> = [];

export const flightReducer = createReducer(
    initialState,
    on(flightsFetchAPISuccess, (state, { allFlights }) => {
        return allFlights;
    })
);
