import { createAction, props } from "@ngrx/store";
import { Journey } from "src/app/models/journey";

export const saveJourney= createAction(
    '[Journey] Save Journey',
    props<{ journey: Journey }>()
  );