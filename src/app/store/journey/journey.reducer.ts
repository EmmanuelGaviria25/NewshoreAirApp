import { createReducer } from "@ngrx/store";
import { Journey } from "../../models/journey";
 
export const initialState: ReadonlyArray<Journey> = [];
 
export const journeyReducer = createReducer(
    initialState
);
