import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competence } from '../models/Compentence';

@Injectable({
  providedIn: 'root'
})

export class CompetencesService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  listCompetences() {
    return this.http.get(`${this.API_URI}/competences`);
  }

  getCompetence(id: number) {
    return this.http.get(`${this.API_URI}/competences/${id}`);
  }

  createCompetence(competence: Competence) {
    return this.http.post(`${this.API_URI}/competences`, competence);
  }

  updateCompetence(id: number, updatedCompetence: Competence) {
    return this.http.put(`${this.API_URI}/competences/${id}`, updatedCompetence);
  }

  changeStateCompetence(id: number, state: number) {
    return this.http.put(`${this.API_URI}/competences/${id}`, state);
  }

}
