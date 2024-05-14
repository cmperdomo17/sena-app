import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../models/Teachers';
import { AppToken } from '../models/AppToken';

@Injectable({
  providedIn: 'root'
}) 

export class TeachersService {

  API_URI = 'http://localhost:3000/api';
  token = AppToken.getInstance();
  auxToken = this.token.getToken();
  
  constructor(private http: HttpClient) { }

  listTeachers() {
    return this.http.get(`${this.API_URI}/teachers/`, {headers: {auth: this.auxToken}});
  }

  getTeacher(id: number) {
    return this.http.get(`${this.API_URI}/teachers/${id}`, {headers: {auth: this.auxToken}});
  }

  createTeacher(teacher: Teacher) {
    return this.http.post(`${this.API_URI}/teachers/`, teacher, {headers: {auth: this.auxToken}});
  }

  updateTeacher(id: number, updatedTeacher: Teacher) {
    return this.http.put(`${this.API_URI}/teachers/${id}`, updatedTeacher, {headers: {auth: this.auxToken}});
  }

  changeStateTeacher(id: number, state: number) {
    return this.http.put(`${this.API_URI}/teachers/${id}/${state}`, null, {headers: {auth: this.auxToken}});
  }

}
