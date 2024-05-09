import { Component, OnInit } from '@angular/core';
import { AmbientsService } from '../../../services/ambients.service';

@Component({
  selector: 'app-environment-management',
  templateUrl: './environment-management.component.html',
  styleUrl: './environment-management.component.css'
})

export class EnvironmentManagementComponent implements OnInit{
  listAmbients: any = [];

  constructor(private ambientsService: AmbientsService) {}

  ngOnInit() {
    this.getAmbients();
  }

  getAmbients() {
    this.ambientsService.listAmbients().subscribe(
      res => {
        this.listAmbients=res;
      },
      err => console.log(err)
    )
  }

  editAmbient(id: number) {
    console.log('Ambient to be edited: ' + id);
  }

  inactivateAmbient(id: number) {
    console.log('Ambient to be inactivated ' + id);
  }

}
