import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../models/Teachers';

@Injectable({
  providedIn: 'root'
}) 

export class TeachersService {

  API_URI = 'http://localhost:3000/api';
  
  constructor(private http: HttpClient) { }

  listTeachers() {
    return this.http.get(`${this.API_URI}/teachers`);
  }

  getTeacher(id: number) {
    return this.http.get(`${this.API_URI}/'teachers'/${id}`);
  }

  createTeacher(teacher: Teacher) {
    return this.http.post(`${this.API_URI}/teachers`, teacher);
  }

  updateTeacher(id: number, updatedTeacher: Teacher) {
    return this.http.put(`${this.API_URI}/teachers/${id}`, updatedTeacher);
  }

  changeStateTeacher(id: number, state: number) {
    return this.http.put(`${this.API_URI}/teacher/${id}/${state}`, null);
  }

}
