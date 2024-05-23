import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TeachersService } from '../../../../services/teachers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teachers-management',
  templateUrl: './teachers-management.component.html',
  styleUrl: './teachers-management.component.css'
})

export class TeachersManagementComponent implements OnInit {
  
  listTeachers: any = [];
  showInactivateMessage: boolean = false;
  message: string = '';
  success: string = '';
  currentEvent: {id: number, state: number} = {id: 0, state: 0};
  
  constructor(private teachersService: TeachersService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers() {
    this.teachersService.listTeachers().subscribe(
      res => {
        this.listTeachers=res;
      },
      err => console.log(err)
    )
  }

  editTeacher(id: number) {
    console.log('Teacher to be edited: ' + id);
  }

  cancelInactivate() {
    this.showInactivateMessage = false;
  }

  showSuccessMessage(message: string) {
    this.success = message;
    setTimeout(() => {
      this.success = '';
      this.cdr.detectChanges();
    }, 2000);
  }

  prepareChangeStateTeacher (event: {id: number, state: number}) {
    this.currentEvent = event;
    if(event.state === 1) {
      this.message = '¿Estás seguro que deseas activar el docente?'
    }
    else if(event.state === 0){
      this.message = '¿Estás seguro que deseas inactivar el docente?'
    }
    this.showInactivateMessage = true;
  }

  confirmChangeStateTeacher() {
    this.teachersService.changeStateTeacher(this.currentEvent.id, this.currentEvent.state).subscribe(
      res => {
        console.log(res);
        this.getTeachers();
        this.showInactivateMessage = false;
        if (this.currentEvent.state === 1) {
          this.showSuccessMessage('Docente activado correctamente');
        } else if (this.currentEvent.state === 0) {
          this.showSuccessMessage('Docente inactivado correctamente');
        }
      },
      err => console.log(err)
    )
  }

}
