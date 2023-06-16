import { Transport } from "./transport";

export interface Flight {
    transport: Transport;
    departureStation: string;
    arrivalStation: string;
    price: number;
}