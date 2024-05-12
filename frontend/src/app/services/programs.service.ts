import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Program } from '../models/Program';
import { AppToken } from '../models/AppToken';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  
  API_URI = 'http://localhost:3000/api';

  token = AppToken.getInstance();

  constructor(private http: HttpClient) { }

  listPrograms() {
    const auxToken = this.token.getToken();

    return this.http.get(`${this.API_URI}/programs/`, {headers: {auth: auxToken}});
  }

  getProgram(id: number) {
    return this.http.get(`${this.API_URI}/programs/${id}`);
  }

  createProgram(program: Program) {
    return this.http.post(`${this.API_URI}/programs`, program);
  }

  updateProgram(id: number, updatedProgram: Program) {
    return this.http.put(`${this.API_URI}/programs/${id}`, updatedProgram);
  }

  changeStateAmbient(id: number, state: number) {
    return this.http.put(`${this.API_URI}/programs/${id}/${state}`, null);
  }
}
