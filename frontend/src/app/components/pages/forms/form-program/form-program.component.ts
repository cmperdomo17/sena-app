import { Component, OnInit } from '@angular/core';
import { Program } from '../../../../models/Program';
import { ProgramsService } from '../../../../services/programs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-program',
  templateUrl: './form-program.component.html',
  styleUrl: './form-program.component.css'
})
export class FormProgramComponent implements OnInit {

  edit: boolean = false;
  warning: string = '';
  showInactivateMessage: boolean = false;

  program: Program = {
    program_id: 0,
    program_name: '',
    program_state: 0
  }

  constructor(private programsService: ProgramsService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params['id']) {
      this.programsService.getProgram(params['id'])
      .subscribe(
        (res: any) => {
          this.program = res[0];
          console.log("Programa: ", this.program);
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewProgram() {
    if(this.program.program_name=='') {
      this.warning = 'Por favor ingresa el nombre del programa';
      return;
    }
    this.programsService.createProgram(this.program).
    subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/programs']);
      },
      err => console.log(err)
    )
  }
  
  updateProgram() {
    this.programsService.updateProgram(this.program.program_id, this.program)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/programs']);
      },
      err => console.log(err)
    )
  }
}
