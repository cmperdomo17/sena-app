import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';

@Component({
  selector: 'app-programs-management',
  templateUrl: './programs-management.component.html',
  styleUrl: './programs-management.component.css'
})
export class ProgramsManagementComponent implements OnInit{
  isSidebarVisible: boolean = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  
  listPrograms: any = [];

  constructor(private programsService: ProgramsService) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.programsService.listPrograms().subscribe(
      res => {
        this.listPrograms=res;
      },
      err => console.log(err)
    )
  }

  editProgram (id: number) {
    console.log('Program  to be edited: ' + id);
  }

  inactivateProgram (id: number) {
    console.log('Program  to be inactivated ' + id);
  }
}
