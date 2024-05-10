import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ambient } from '../models/Ambient';

@Injectable({
  providedIn: 'root'
})

export class AmbientsService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  listAmbients() {
    return this.http.get(`${this.API_URI}/ambients`);
  }

  getAmbient(id: number) {
    return this.http.get(`${this.API_URI}/ambients/${id}`);
  }

  createAmbient(ambient: Ambient) {
    return this.http.post(`${this.API_URI}/ambients`, ambient);
  }

  updateAmbient(id: number, updatedAmbient: Ambient) {
    return this.http.put(`${this.API_URI}/ambients/${id}`, updatedAmbient);
  }

  changeStateAmbient(id: number, state: number) {
    return this.http.put(`${this.API_URI}/ambients/${id}`, state);
  }
}
