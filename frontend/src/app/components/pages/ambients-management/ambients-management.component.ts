import { Component, OnInit } from '@angular/core';
import { AmbientsService } from '../../../services/ambients.service';

@Component({
  selector: 'app-ambients-management',
  templateUrl: './ambients-management.component.html',
  styleUrl: './ambients-management.component.css'
})

export class AmbientsManagementComponent implements OnInit{

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

  editAmbient(id: string) {
    console.log('Ambient to be edited: ' + id);
  }

  changeStateAmbient(id: string, state: number) {
    let message = '';
    if(state == 1) {
      message = '¿Estás seguro de que deseas inactivar el ambiente?'
    }
    else {
      message = '¿Estás seguro de que deseas activar el ambiente?'
    }
    if(window.confirm(message)){
      this.ambientsService.changeStateAmbient(id, state).subscribe(
        res => {
          console.log(res);
          this.getAmbients();
        },
        err => console.log(err)
      )
    }
  }

}


