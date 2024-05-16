import { Injectable } from '@angular/core';
import { AppToken } from '../models/AppToken';
import { HttpClient } from '@angular/common/http';
import { Period } from '../models/Period';

@Injectable({
  providedIn: 'root'
})

export class PeriodsService {

  API_URI = 'http://localhost:3000/api';

  token = AppToken.getInstance();
  auxToken = this.token.getToken();

  constructor(private http: HttpClient) { }

  listPeriods() {
    return this.http.get(`${this.API_URI}/periods/`, {headers: {auth: this.auxToken}});
  }

  getPeriod(id: number) {
    return this.http.get(`${this.API_URI}/periods/${id}`, {headers: {auth: this.auxToken}});
  }

  createPeriod(period: Period) {
    return this.http.post(`${this.API_URI}/periods`, period, {headers: {auth: this.auxToken}});
  }

  updatePeriod(id: number, updatedPeriod: Period) {
    return this.http.put(`${this.API_URI}/periods/${id}`, updatedPeriod, {headers: {auth: this.auxToken}});
  }

  changeStatePeriod(id: number, state: number) {
    return this.http.put(`${this.API_URI}/periods/${id}/${state}`, null, {headers: {auth: this.auxToken}});
  }
}
