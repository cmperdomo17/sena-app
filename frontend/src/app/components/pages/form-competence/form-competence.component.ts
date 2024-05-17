import { Component, OnInit } from '@angular/core';
import { CompetenciesService } from '../../../services/competencies.service';
import { ProgramsService } from '../../../services/programs.service';
import { Competence } from '../../../models/Compentence';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-competence',
  templateUrl: './form-competence.component.html',
  styleUrl: './form-competence.component.css'
})
export class FormCompetenceComponent implements OnInit{

  edit: boolean = false;
  warning: string = '';

  constructor(private competenciesService: CompetenciesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  competence: Competence = {
    competence_id: 0,
    program_id: null,
    competence_name: ''
  };

  defaultType: string = 'Específica';
  competenceType: string = '';

  ngOnInit(): void{
    const url = this.activatedRoute.snapshot.url;
    if (url[3]){
      this.competenciesService.getCompetence(Number(url[3].path), Number(url[2].path))
        .subscribe(
          (res: any) => {
            this.competence = res[0];            
            this.edit = true;
            if(Number(url[2].path) == 0) {
              this.defaultType = 'Genérica';
              this.onSelectionChangeType(this.defaultType);
            }
          },
          err => console.error(err)
        )
    }
  }
  
  onSelectionChangeType(selection: string) {
    this.competenceType = selection;
  }

  saveNewCompetence() {
    if(!this.competence.competence_name || !this.competenceType
    ){
      this.warning = 'Por favor ingresa todos los campos';
      return;
    }

    if(this.competenceType == 'Específica' && this.competence.program_id == null) {
      this.warning = 'Por favor ingresa el id del programa';
      return;
    }

    this.competenciesService.createCompetence(this.competence).
    subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/competencies']);
      },
      err=>console.log(err)
    )
  }

  updateCompetence() {
    if(!this.competence.competence_name || !this.competenceType
    ){
      this.warning = 'Por favor ingresa todos los campos';
      return;
    }

    if(this.competenceType == 'Específica' && this.competence.program_id == null) {
      this.warning = 'Por favor ingresa el id del programa';
      return;
    }

    let type: number;

    if(this.competenceType == 'Genérica') {
      type = 0;
    }
    else {
      type = 1;
    }

    console.log('competencia',this.competence)

    this.competenciesService.updateCompetence(this.competence.competence_id, this.competence).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/competencies']);
      },
      err => console.log(err)
    )

  }

  


}
