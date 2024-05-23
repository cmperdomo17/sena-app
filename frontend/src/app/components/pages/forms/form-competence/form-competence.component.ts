import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CompetenciesService } from '../../../../services/competencies.service';
import { ProgramsService } from '../../../../services/programs.service';
import { Competence } from '../../../../models/Compentence';
import { ActivatedRoute, Router } from '@angular/router';
import { Program } from '../../../../models/Program';

@Component({
  selector: 'app-form-competence',
  templateUrl: './form-competence.component.html',
  styleUrl: './form-competence.component.css'
})
export class FormCompetenceComponent implements OnInit {

  edit: boolean = false;
  warning: string = '';
  success: string = '';

  constructor(private competenciesService: CompetenciesService, private router: Router, private activatedRoute: ActivatedRoute, private programsService: ProgramsService, private cdr: ChangeDetectorRef) { }

  competence: Competence = {
    competence_id: 0,
    program_id: null,
    competence_name: '',
    competence_state: 0
  };

  program: Program = {
    program_id: 0,
    program_name: '',
    program_state: 0
  };

  programsList: any = [];
  defaultType: string = 'Específica';
  competenceType: string = '';

  auxCompetence: Competence = {
    competence_id: 0,
    program_id: null,
    competence_name: '',
    competence_state: 0
  };

  ngOnInit(): void {
    const url = this.activatedRoute.snapshot.url;
    if (url[3]) {
      this.competenciesService.getCompetence(Number(url[3].path), Number(url[2].path))
        .subscribe(
          (res: any) => {
            this.competence = res[0];
            this.edit = true;
            if (Number(url[2].path) == 0) {
              this.defaultType = 'Genérica';
            }
            this.auxCompetence = JSON.parse(JSON.stringify(this.competence));
            this.onSelectionChangeType(this.defaultType);
          },
          err => console.error(err)
        )
    }
    this.listPrograms();
  }

  onSelectionChangeType(selection: string) {
    this.competenceType = selection;
  }

  showSuccessMessage(message: string) {
    this.success = message;
    setTimeout(() => {
      this.success = '';
      this.cdr.detectChanges();
      this.router.navigate(['/competencies']);
    }, 2000);
  }

  saveNewCompetence() {
    if (!this.competence.competence_name || !this.competenceType
    ) {
      this.warning = 'Por favor ingresa todos los campos';
      return;
    }

    if (this.competenceType == 'Específica' && this.competence.program_id == null) {
      this.warning = 'Por favor ingresa el id del programa';
      return;
    }

    if (this.competenceType == 'Genérica') {
      this.competence.program_id = null;
    }

    // Validar que solo se ingrese una opcion que exista en la lista de programas
    if (this.competence.program_id != null && !this.programsList.find((program: any) => program.program_id == this.competence.program_id)) {
      this.warning = 'El identificador del programa ingresado no es valido';
      return;
    }

    this.competenciesService.createCompetence(this.competence).
      subscribe(
        res => {
          console.log(res);
          this.showSuccessMessage('Competencia creada correctamente');
        },
        err => console.log(err)
      )
  }

  updateCompetence() {
    if (!this.competence.competence_name || !this.competenceType
    ) {
      this.warning = 'Por favor ingresa todos los campos';
      return;
    }

    if (this.competenceType == 'Específica' && this.competence.program_id == null) {
      this.warning = 'Por favor ingresa el id del programa';
      return;
    }

    if (this.competenceType == 'Genérica') {
      this.competence.program_id = null;
    }

    // Validar que solo se ingrese una opcion que exista en la lista de programas
    if (this.competence.program_id != null && !this.programsList.find((program: any) => program.program_id == this.competence.program_id)) {
      this.warning = 'El identificador del programa ingresado no es valido';
      return;
    }

    if ((this.auxCompetence.program_id == null && this.competence.program_id != null) || (this.auxCompetence.program_id != null && this.competence.program_id == null)) {
      if (this.auxCompetence.program_id == null) {
        this.auxCompetence.program_id = 0;
      }
      this.competenciesService.deleteCompetence(this.auxCompetence.competence_id, this.auxCompetence.program_id).subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      )

      this.competenciesService.createCompetence(this.competence).
        subscribe(
          res => {
            console.log(res);
            this.showSuccessMessage('Competencia actualizada correctamente');
          },
          err => console.log(err)
        )
    }
    else {
      this.competenciesService.updateCompetence(this.competence.competence_id, this.competence).subscribe(
        res => {
          console.log(res);
          this.showSuccessMessage('Competencia actualizada correctamente');
        },
        err => console.log(err)
      )
    }
  }

  listPrograms(): void {
    this.programsService.listPrograms().subscribe(
      (res: any) => {
        this.programsList = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
