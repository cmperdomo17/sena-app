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
  auxToken = this.token.getToken();

  constructor(private http: HttpClient) { }

  listPrograms() {
    return this.http.get(`${this.API_URI}/programs/`, {headers: {auth: this.auxToken}});
  }

  getProgram(id: number) {
    return this.http.get(`${this.API_URI}/programs/${id}`, {headers: {auth: this.auxToken}});
  }

  createProgram(program: Program) {
    return this.http.post(`${this.API_URI}/programs`, program, {headers: {auth: this.auxToken}});
  }

  updateProgram(id: number, updatedProgram: Program) {
    return this.http.put(`${this.API_URI}/programs/${id}`, updatedProgram, {headers: {auth: this.auxToken}});
  }

  changeStateProgram(id: number, state: number) {
    return this.http.put(`${this.API_URI}/programs/${id}/${state}`, null, {headers: {auth: this.auxToken}});
  }
}
