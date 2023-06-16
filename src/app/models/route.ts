import { Flight } from "./flight";

export interface Route {
	flight: Flight | null;
	prev: string | null;
}
