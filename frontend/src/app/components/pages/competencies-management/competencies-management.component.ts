import { Component, OnInit } from '@angular/core';
import { CompetenciesService } from '../../../services/competencies.service';

@Component({
  selector: 'app-competencies-management',
  templateUrl: './competencies-management.component.html',
  styleUrl: './competencies-management.component.css'
})

export class CompetenciesManagementComponent implements OnInit{

  listCompetencies: any = [];
  listSpecificCompetencies: any = [];
  listGenericCompetencies: any = [];
  type: number = 0;

  message: string = '';
  showInactivateMessage: boolean = false;
  currentEvent: {id: number, state: number} = {id: 0, state: 0};

  constructor(private competenciesService: CompetenciesService) {}

  ngOnInit() {
    this.getCompetencies();
  }

  getCompetencies() {
    this.competenciesService.listCompetencies().subscribe(
      res => {
        this.listCompetencies = res;
        console.log(this.listCompetencies);
        this.listSpecificCompetencies = this.listCompetencies.filter((competence: any) => competence.program_id);
        this.listGenericCompetencies = this.listCompetencies.filter((competence: any) => !competence.program_id);
      },
      err => console.log(err)
    )
  }

  editCompetence(id: number) {
    console.log('Competence to be edited: ' + id);
  }
  cancelInactivate() {
    this.showInactivateMessage = false;
  }

  prepareChangeStateCompetenceGen (event: {id: number, state: number}) {
    this.type = 0;
    this.currentEvent = event;
    if(event.state === 1) {
      this.message = '¿Estás seguro que deseas activar la competencia?'
    }
    else if(event.state === 0){
      this.message = '¿Estás seguro que deseas inactivar la competencia?'
    }
    this.showInactivateMessage = true;
  }

  prepareChangeStateCompetenceSpc (event: {id: number, state: number}) {
    this.type = 1;
    this.currentEvent = event;
    if(event.state === 1) {
      this.message = '¿Estás seguro que deseas activar la competencia?'
    }
    else if(event.state === 0){
      this.message = '¿Estás seguro que deseas inactivar la competencia?'
    }
    this.showInactivateMessage = true;
  }

  confirmChangeStateCompetence() {
    const auxType = {competence_type: this.type};
    console.log('auxtype',auxType);
    this.competenciesService.changeStateCompetence(this.currentEvent.id, this.currentEvent.state, auxType).subscribe(
      res => {
        console.log(res);
        this.getCompetencies();
        this.showInactivateMessage = false;
      },
      err => console.log(err)
    )

  }




}
