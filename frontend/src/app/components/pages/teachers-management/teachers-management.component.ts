import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../../services/teachers.service';

@Component({
  selector: 'app-teachers-management',
  templateUrl: './teachers-management.component.html',
  styleUrl: './teachers-management.component.css'
})

export class TeachersManagementComponent implements OnInit{
  isSidebarVisible: boolean = true;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  
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

  editAmbient(id: number) {
    console.log('Teacher to be edited: ' + id);
  }

  inactivateAmbient(id: number) {
    console.log('Teacher to be inactivated: ' + id);
  }
  

}
