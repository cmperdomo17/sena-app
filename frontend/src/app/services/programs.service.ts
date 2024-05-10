import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Program } from '../models/Program';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  
  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  listPrograms() {
    return this.http.get(`${this.API_URI}/programs`);
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
    return this.http.put(`${this.API_URI}/programs/${id}/${state}`, );
  }
}
