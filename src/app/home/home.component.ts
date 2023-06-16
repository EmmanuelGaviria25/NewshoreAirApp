import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectFlights } from '../store/flight/flight.selector';
import { invokeFlightsAPI } from '../store/flight/flight.action';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Flight } from '../models/flight';
import { Journey } from '../models/journey';
import { saveJourney } from '../store/journey/journey.action';
import { Route } from '../models/route';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	originInput!: string;
	destinationInput!: string;
	showJourney = false;
	calculated = false;
	showError = false;
	journey: Journey | null = null;
	finalPrice: number = 0;

	constructor(private store: Store) { }

	flights$ = this.store.pipe(select(selectFlights))

	ngOnInit(): void {
		this.store.dispatch(invokeFlightsAPI())
	}

	searchFlightRoute() {
		this.showError = false;
		this.showJourney = false;
		this.finalPrice = 0;
		this.journey = {
			origin: "",
			destination: "",
			price: 0,
			flights: []
		};
		this.flights$.pipe().subscribe(flights => {
			let flightsRoute = this.calculateFlightRoute(this.originInput, this.destinationInput, flights);

			if (flightsRoute) {
				this.showJourney = true;
				this.journey = {
					origin: this.originInput,
					destination: this.destinationInput,
					price: this.finalPrice,
					flights: flightsRoute!
				}
				saveJourney({ journey: this.journey });
				console.log('Route founded:');
				for (const flight of flightsRoute) {
					console.log(`${flight.departureStation} -> ${flight.arrivalStation}`);
				}
			} else {
				console.log('Cannot process the search.')
				this.showError = true;
				this.showJourney = false;
			}
		})
	}

	calculateFlightRoute(origin: string, destination: string, flights: Flight[]): Flight[] | null {
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
						return this.buildRoute(route, destination);
					}

					queue.push(currentDestination);
				}
			}
		}

		return null;
	}

	buildRoute(route: Record<string, Route>, destination: string): Flight[] {
		const flightRoute: Flight[] = [];
		let current = destination;

		while (current !== null) {
			const { flight, prev } = route[current];
			
			if (flight) {
				this.finalPrice += flight.price;
				flightRoute.unshift(flight);
			}

			current = prev!;
		}

		return flightRoute;
	}

	assignFlightAndPlusPriceOfjourney(flight: Flight) {
		this.journey!.flights.push({ ...flight });
		this.journey!.price += flight.price;
	}

	searchOrigin: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) => {
				if (term === '') {
					return [];
				} else {
					let originNames: Set<string> = new Set();
					this.flights$.pipe()
						.subscribe((values) => {
							values.forEach((val) => {
								if (val.departureStation.includes(term)) {
									originNames.add(val.departureStation);
								}
							});
						});
					return Array.from(originNames);
				}
			}),
		);

	searchDestination: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) => {
				if (term === '') {
					return [];
				} else {
					let destinationNames: Set<string> = new Set();
					this.flights$.pipe()
						.subscribe((values) => {
							values.forEach((val) => {
								if (val.arrivalStation.includes(term)) {
									destinationNames.add(val.arrivalStation);
								}
							});
						});
					return Array.from(destinationNames);
				}
			}),
		);

}
