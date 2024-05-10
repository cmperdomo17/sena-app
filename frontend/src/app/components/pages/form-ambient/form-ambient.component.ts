import { Component, HostBinding, OnInit } from '@angular/core';
import { Ambient } from '../../../models/Ambient';
import { AmbientsService } from '../../../services/ambients.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-ambient',
  templateUrl: './form-ambient.component.html',
  styleUrl: './form-ambient.component.css'
})

export class FormAmbientComponent implements OnInit {

  // !!!!!!!!!!!! AQUI SE CAMBIA??? HOLA BUENAS TARDES
  @HostBinding('class') classes = 'formulario1';

  ambient: Ambient = {
    ambient_id: '',
    ambient_name: '',
    ambient_location: '',
    ambient_type: '',
    ambient_capacity: 0,
  }

  edit: boolean = false;

  constructor(private ambientsService: AmbientsService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if(params['id']) {
      this.ambientsService.getAmbient(params['id'])
      .subscribe(
        (res: any) => {
          console.log(res);
          this.ambient = res[0];
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewAmbient() {
    if(!this.ambient.ambient_name || !this.ambient.ambient_location || !this.ambient.ambient_type || !this.ambient.ambient_capacity) {
      alert('Por favor ingresa todos los campos');
      return;
    }
    if (isNaN(this.ambient.ambient_capacity)){
      alert('La capacidad del ambiente debe ser un número entero');
      return;
    }

    this.ambientsService.createAmbient(this.ambient)
    .subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/ambient']);
      },
      err => console.log(err)
    )
  }

  updateAmbient() {
    if(!this.ambient.ambient_name || !this.ambient.ambient_location || !this.ambient.ambient_type || !this.ambient.ambient_capacity) {
      alert('Por favor ingresa todos los campos');
      return;
    }
    if (isNaN(this.ambient.ambient_capacity)){
      alert('La capacidad del ambiente debe ser un número entero');
      return;
    }

    this.ambientsService.updateAmbient(this.ambient.ambient_id, this.ambient)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/ambients']);
      },
      err => console.error(err)
    )
  }
}
