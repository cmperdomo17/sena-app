import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../../services/teachers.service';

@Component({
  selector: 'app-teachers-management',
  templateUrl: './teachers-management.component.html',
  styleUrl: './teachers-management.component.css'
})

export class TeachersManagementComponent implements OnInit{
  
  listTeachers: any = [];
  
  constructor(private teachersService: TeachersService) {}

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

  changeStateTeacher(id: number, state: number) {
    let message = '';
    if(state == 1) {
      message = '¿Estás seguro de que deseas inactivar el profesor?'
    }
    else {
      message = '¿Estás seguro de que deseas activar el profesor?'
    }
    if(window.confirm(message)){
      this.teachersService.changeStateTeacher(id, state).subscribe(
        res => {
          console.log(res);
          this.getTeachers();
        },
        err => console.log(err)
      )
    }
  }
  

}
