import { AxiosResponse } from 'axios';
import { ProducerI } from '../@types';
import api from './api';

export function getProducers(
  params?: URLSearchParams
): Promise<AxiosResponse<ProducerI[]>> {
  return api.get('/producer', {
    params,
  });
}

export function createProducer(data: any): Promise<AxiosResponse<ProducerI[]>> {
  return api.post('/producer', data);
}

export function modifyProducer(
  producerId: number,
  data: any
): Promise<AxiosResponse<ProducerI[]>> {
  return api.put(`/producer/${producerId}`, data);
}

export function removeProducer(
  producerId: number
): Promise<AxiosResponse<ProducerI[]>> {
  return api.delete(`/producer/${producerId}`);
}
