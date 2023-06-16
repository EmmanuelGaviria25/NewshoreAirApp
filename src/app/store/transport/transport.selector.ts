import { createFeatureSelector } from '@ngrx/store';
import { Transport } from '../../models/transport';
 
export const selectTransports = createFeatureSelector<Transport[]>('transports');
