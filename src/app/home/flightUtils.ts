import { Flight } from "../models/flight";
import { Route } from "../models/route";

export function calculateFlightRoute(origin: string, destination: string, flights: Flight[]): Flight[] | null {
    const queue: string[] = [];
    const visited: Set<string> = new Set();
    const route: Record<string, Route> = {};

    route[origin] = { flight: null, prev: null };
    queue.push(origin);
    visited.add(origin);

    while (queue.length > 0) {
        const currentOrigin = queue.shift();

        const availableFlights = flights.filter(
            (flight) => flight.departureStation === currentOrigin
        );

        for (const flight of availableFlights) {
            const currentDestination = flight.arrivalStation;

            if (!visited.has(currentDestination)) {
                visited.add(currentDestination);
                route[currentDestination] = { flight, prev: currentOrigin! };

                if (currentDestination === destination) {
                    return buildRoute(route, destination);
                }

                queue.push(currentDestination);
            }
        }
    }

    return null;
}

export function buildRoute(route: Record<string, Route>, destination: string): Flight[] {
    const flightRoute: Flight[] = [];
    let current = destination;

    while (current !== null) {
        const { flight, prev } = route[current];
        
        if (flight) {
            flightRoute.unshift(flight);
        }

        current = prev!;
    }

    return flightRoute;
}