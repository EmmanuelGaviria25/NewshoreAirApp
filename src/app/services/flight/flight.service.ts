import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightResponse } from './flight-response';
import { APIURL } from 'src/app/tokens/tokens';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient, @Inject(APIURL) private ApiUrl: string) { }

  get() {
    return this.http.get<FlightResponse[]>(this.ApiUrl+'/flights/2');
  }
}
