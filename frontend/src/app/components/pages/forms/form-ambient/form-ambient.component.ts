import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ambient } from '../../../../models/Ambient';
import { AmbientsService } from '../../../../services/ambients.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-ambient',
  templateUrl: './form-ambient.component.html',
  styleUrl: './form-ambient.component.css'
})

export class FormAmbientComponent implements OnInit {

  ambient: Ambient = {
    ambient_id: '',
    ambient_name: '',
    ambient_location: '',
    ambient_type: '',
    ambient_capacity: 0,
  }

  edit: boolean = false;
  warning: string = '';
  success: string = '';

  constructor(private ambientsService: AmbientsService, private router: Router, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if(params['id']) {
      this.ambientsService.getAmbient(params['id'])
      .subscribe(
        (res: any) => {
          this.ambient = res[0];
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  onSelectionChangeType(selection: string): void{
    this.ambient.ambient_type=selection;
  }

  showSuccessMessage(message: string) {
    this.success = message;
    setTimeout(() => {
      this.success = '';
      this.cdr.detectChanges();
      this.router.navigate(['/ambients']);
    }, 2000);
  }

  saveNewAmbient() {
    if(!this.ambient.ambient_id || !this.ambient.ambient_name || !this.ambient.ambient_location || !this.ambient.ambient_type || !this.ambient.ambient_capacity) {
      this.warning = 'Por favor ingresa todos los campos';
      return;
    }
    if (isNaN(this.ambient.ambient_capacity)){
      this.warning = 'La capacidad del ambiente debe ser un número entero';
      return;
    }
    
    this.ambientsService.createAmbient(this.ambient)
    .subscribe(
      res => {
        console.log(res)
        this.showSuccessMessage('Ambiente creado correctamente');
      },
      err => console.log(err)
    )
  }

  updateAmbient() {
    if(!this.ambient.ambient_id || !this.ambient.ambient_name || !this.ambient.ambient_location || !this.ambient.ambient_type || !this.ambient.ambient_capacity) {
      this.warning = 'Por favor ingresa todos los campos';
      return;
    }
    if (isNaN(this.ambient.ambient_capacity)){
      this.warning = 'La capacidad del ambiente debe ser un número entero';
      return;
    }

    this.ambientsService.updateAmbient(this.ambient.ambient_id, this.ambient)
    .subscribe(
      res => {
        console.log(res);
        this.showSuccessMessage('Ambiente actualizado correctamente');
      },
      err => console.error(err)
    )
  }
}
