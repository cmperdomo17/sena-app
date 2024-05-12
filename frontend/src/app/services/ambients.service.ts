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

  constructor(private http: HttpClient) { }

  listAmbients() {
    return this.http.get(`${this.API_URI}/ambients`);
  }

  getAmbient(id: string) {
    return this.http.get(`${this.API_URI}/ambients/${id}`);
  }

  createAmbient(ambient: Ambient) {
    return this.http.post(`${this.API_URI}/ambients`, ambient);
  }

  updateAmbient(id: string, updatedAmbient: Ambient) {
    return this.http.put(`${this.API_URI}/ambients/${id}`, updatedAmbient);
  }

  changeStateAmbient(id: string, state: number) {
    return this.http.put(`${this.API_URI}/ambients/${id}/${state}`, null);
  }
}
