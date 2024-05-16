import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ambient } from '../models/Ambient';
import { AppToken } from '../models/AppToken';

@Injectable({
  providedIn: 'root'
})

export class AmbientsService {

  API_URI = 'http://localhost:3000/api';

  token = AppToken.getInstance();
  auxToken = this.token.getToken();

  constructor(private http: HttpClient) { }

  listAmbients() {
    return this.http.get(`${this.API_URI}/ambients`, {headers: {auth: this.auxToken}});
  }

  getAmbient(id: number) {
    return this.http.get(`${this.API_URI}/ambients/${id}`, {headers: {auth: this.auxToken}});
  }

  createAmbient(ambient: Ambient) {
    return this.http.post(`${this.API_URI}/ambients`, ambient, {headers: {auth: this.auxToken}});
  }

  updateAmbient(id: number, updatedAmbient: Ambient) {
    return this.http.put(`${this.API_URI}/ambients/${id}`, updatedAmbient, {headers: {auth: this.auxToken}});
  }

  changeStateAmbient(id: number, state: number) {
    return this.http.put(`${this.API_URI}/ambients/${id}/${state}`, null, {headers: {auth: this.auxToken}});
  }
}
