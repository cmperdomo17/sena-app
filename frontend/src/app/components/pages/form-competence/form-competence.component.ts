import { Component, OnInit } from '@angular/core';
import { CompetenciesService } from '../../../services/competencies.service';
import { ProgramsService } from '../../../services/programs.service';
import { Competence } from '../../../models/Compentence';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-competence',
  templateUrl: './form-competence.component.html',
  styleUrl: './form-competence.component.css'
})
export class FormCompetenceComponent implements OnInit{

  constructor(private competenciesService: CompetenciesService, private router: Router, private programsService: ProgramsService) { }

  ngOnInit(): void{
    this.listPrograms();
  }

  competence: Competence = {
    competence_id: 0,
    program_id: 0,
    competence_name: '',
    competence_state: 0
  };

  ProgramsList: any = [];

  listPrograms(): void {
    this.programsService.listPrograms().subscribe(
      res => {
        this.ProgramsList = res;
        console.log(res);
        
      },
      err => {
        console.log(err);
      }
    );
  }

  createCompetence(): void {
    this.competenciesService.createCompetence(this.competence).subscribe(
      res => {
        this.router.navigate(['/competencies']);
        console.log(res);
        
      },
      err => {
        console.log(err);
      }
    );
  }

}
