import { Flight } from "./flight";

export interface Journey {
    origin: string;
    destination: string;
    price: number;
    flights: Flight[];
}