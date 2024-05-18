import { Component, OnInit } from '@angular/core';
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
  currentEvent: {id: number, state: number} = {id: 0, state: 0};
  
  constructor(private teachersService: TeachersService, private activatedRoute: ActivatedRoute) {}

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
      },
      err => console.log(err)
    )
  }

}
