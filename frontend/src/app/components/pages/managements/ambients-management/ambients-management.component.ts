import { Component, OnInit } from '@angular/core';
import { AmbientsService } from '../../../../services/ambients.service';

@Component({
  selector: 'app-ambients-management',
  templateUrl: './ambients-management.component.html',
  styleUrl: './ambients-management.component.css'
})

export class AmbientsManagementComponent implements OnInit{

  listAmbients: any = [];
  message: string = '';
  showInactivateMessage: boolean = false;
  currentEvent: {id: number, state: number} = {id: 0, state: 0};

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
  cancelInactivate() {
    this.showInactivateMessage = false;
  }

  prepareChangeStateAmbient (event: {id: number, state: number}) {
    this.currentEvent = event;
    if(event.state === 1) {
      this.message = '¿Estás seguro que deseas activar el ambiente?'
    }
    else if(event.state === 0){
      this.message = '¿Estás seguro que deseas inactivar el ambiente?'
    }
    this.showInactivateMessage = true;
  }

  confirmChangeStateAmbient() {
    this.ambientsService.changeStateAmbient(this.currentEvent.id, this.currentEvent.state).subscribe(
      res => {
        console.log(res);
        this.getAmbients();
        this.showInactivateMessage = false;
      },
      err => console.log(err)
    )
  }

}


