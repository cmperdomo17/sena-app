import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppToken } from '../models/AppToken';
import { Schedule } from '../models/Schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  API_URI = 'http://localhost:3000/api';

  token = AppToken.getInstance();
  auxToken = this.token.getToken();

  constructor(private httpClient: HttpClient) { }
  
  listAllSchedules() {
    return this.httpClient.get(`${this.API_URI}/schedules/`, {headers: {auth: this.auxToken}});
  }

  listSchedulesByPeriodTeacher(period_id: number, teacher_id: number) {
    return this.httpClient.get(`${this.API_URI}/schedules/${teacher_id}/${period_id}`, {headers: {auth: this.auxToken}});
  }

  getSchedule(id: number) {
    return this.httpClient.get(`${this.API_URI}/schedules/${id}`, {headers: {auth: this.auxToken}});
  }

  createSchedule(schedule: Schedule) {
    return this.httpClient.post(`${this.API_URI}/schedules/`, schedule, {headers: {auth: this.auxToken}});
  }

  updateSchedule(id: number, updatedSchedule: Schedule) {
    return this.httpClient.put(`${this.API_URI}/schedules/${id}`, updatedSchedule, {headers: {auth: this.auxToken}});
  }

  deleteSchedule(id: number) {
    return this.httpClient.delete(`${this.API_URI}/schedules/${id}`, {headers: {auth: this.auxToken}});
  }
}
