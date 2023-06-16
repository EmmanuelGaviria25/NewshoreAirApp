import { createFeatureSelector } from "@ngrx/store";
import { Journey } from "src/app/models/journey";

export const selectFlight = createFeatureSelector<Journey>('journey');