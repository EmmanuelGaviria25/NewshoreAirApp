import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { calculateFlightRoute } from './flightUtils';

describe('searchFlightRoute', () => {
  const flights = [
    { arrivalStation: "BOG", departureStation: "PEI", price: 200, transport: {flightCarrier: 'CO', flightNumber: '8003'}},
    { arrivalStation: "CTG", departureStation: "BOG", price: 200, transport: {flightCarrier: 'CO', flightNumber: '8010'}},
    { arrivalStation: "CAN", departureStation: "CTG", price: 300, transport: {flightCarrier: 'CO', flightNumber: '8005'}},
  ];

  it('should return the correct flight route when a valid route exists', () => {
    const origin = 'PEI';
    const destination = 'CAN';
    const expectedRoute = [
      { arrivalStation: "BOG", departureStation: "PEI", price: 200, transport: {flightCarrier: 'CO', flightNumber: '8003'}},
      { arrivalStation: "CTG", departureStation: "BOG", price: 200, transport: {flightCarrier: 'CO', flightNumber: '8010'}},
      { arrivalStation: "CAN", departureStation: "CTG", price: 300, transport: {flightCarrier: 'CO', flightNumber: '8005'}},
    ]
    const route = calculateFlightRoute(origin, destination, flights);

    expect(route).toEqual(expectedRoute);
  });

  it('should return null when no route is found', () => {
    const origin = 'PEI';
    const destination = 'CAN';

    const route = calculateFlightRoute(origin, destination, flights);

    expect(route).toBeNull();
  });
});