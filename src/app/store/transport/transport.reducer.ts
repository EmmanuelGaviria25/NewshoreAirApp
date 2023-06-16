import { createReducer } from "@ngrx/store";
import { Transport } from "../../models/transport";
 
export const initialState: ReadonlyArray<Transport> = [];
 
export const transportReducer = createReducer(
    initialState
);
