import { Component, OnInit } from '@angular/core';
import { CompetencesService } from '../../../services/competences.service';

@Component({
  selector: 'app-competences-management',
  templateUrl: './competences-management.component.html',
  styleUrl: './competences-management.component.css'
})
export class CompetencesManagementComponent implements OnInit{
  isSidebarVisible: boolean = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  
  listCompetences: any = [];

  constructor(private competencesService: CompetencesService) {}

  ngOnInit() {
    this.getCompetences();
  }

  getCompetences() {
    this.competencesService.listCompetences().subscribe(
      res => {
        this.listCompetences=res;
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
      this.competencesService.changeStateCompetence(id, state).subscribe(
        res => {
          console.log(res);
          this.getCompetences();
        },
        err => console.log(err)
      )
    }
  }



}
