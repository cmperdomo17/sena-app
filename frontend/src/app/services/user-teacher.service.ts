import { Injectable } from '@angular/core';
import { AppToken } from '../models/AppToken';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/Teachers';

@Injectable({
  providedIn: 'root'
})
export class UserTeacherService {
  API_URI = 'http://localhost:3000/api';
  token = AppToken.getInstance();
  auxToken = this.token.getToken();

  constructor(private http: HttpClient) { }

  getInfo() {
    return this.http.get(`${this.API_URI}/userTeacher/`, {headers: {auth: this.auxToken}});
  }

  getSchedules(Pid: number, teacher_id: number){
    return this.http.post(`${this.API_URI}/userTeacher/${Pid}`,{teacher_id: teacher_id},{headers: {auth: this.auxToken}});
  }

  listPeriods(){
    return this.http.get(`${this.API_URI}/userTeacher/periods`,{headers: {auth: this.auxToken}});
  }

  listCompetencies() {
    return this.http.get(`${this.API_URI}/userTeacher/competencies`,{headers: {auth: this.auxToken}});
  }

  listAmbients() {
    return this.http.get(`${this.API_URI}/userTeacher/ambients`,{headers: {auth: this.auxToken}});
  }
}
