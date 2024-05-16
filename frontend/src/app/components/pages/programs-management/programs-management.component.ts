import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';

@Component({
  selector: 'app-programs-management',
  templateUrl: './programs-management.component.html',
  styleUrl: './programs-management.component.css'
})
export class ProgramsManagementComponent implements OnInit{

  listPrograms: any = [];
  showInactivateMessage: boolean = false;
  message: string = '';
  currentEvent: {id: number, state: number} = {id: 0, state: 0};

  constructor(private programsService: ProgramsService) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.programsService.listPrograms().subscribe(
      res => {
        this.listPrograms = res;
      },
      err => console.log(err)
    )
  }

  editProgram (id: number) {
    console.log('Program to be edited:',id);
  }

  cancelInactivate() {
    this.showInactivateMessage = false;
  }

  prepareChangeStateProgram (event: {id: number, state: number}) {
    this.currentEvent = event;
    if(event.state === 1) {
      this.message = '¿Estás seguro que deseas activar el programa?'
    }
    else if(event.state === 0){
      this.message = '¿Estás seguro que deseas inactivar el programa?'
    }
    this.showInactivateMessage = true;
  }

  confirmChangeStateProgram() {
    this.programsService.changeStateProgram(this.currentEvent.id, this.currentEvent.state).subscribe(
      res => {
        console.log(res);
        this.getPrograms();
        this.showInactivateMessage = false;
      },
      err => console.log(err)
    )
  }
}
