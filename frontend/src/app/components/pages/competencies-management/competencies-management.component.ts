import { Component, OnInit } from '@angular/core';
import { CompetenciesService } from '../../../services/competencies.service';

@Component({
  selector: 'app-competencies-management',
  templateUrl: './competencies-management.component.html',
  styleUrl: './competencies-management.component.css'
})

export class CompetenciesManagementComponent implements OnInit{

  listCompetencies: any = [];

  constructor(private competenciesService: CompetenciesService) {}

  ngOnInit() {
    this.getCompetencies();
  }

  getCompetencies() {
    this.competenciesService.listCompetencies().subscribe(
      res => {
        this.listCompetencies=res;
        console.log('Lista de competencias:',this.listCompetencies);
      },
      err => console.log(err)
    )
  }

  editCompetence(id: number) {
    console.log('Competence to be edited: ' + id);
  }

  changeStateCompetence(id: number, state: number) {
    let message = '';
    if(state == 1) {
      message = '¿Estás seguro de que deseas inactivar la competencia?'
    }
    else {
      message = '¿Estás seguro de que deseas activar la competencia?'
    }
    if(window.confirm(message)){
      this.competenciesService.changeStateCompetence(id, state).subscribe(
        res => {
          console.log(res);
          this.getCompetencies();
        },
        err => console.log(err)
      )
    }
  }



}
