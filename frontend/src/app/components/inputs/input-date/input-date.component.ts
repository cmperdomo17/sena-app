import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.css'
})
export class InputDateComponent {

  @Input() label: string = '';
  @Input() value: any='';
  @Input() atribute: any='';
  @Input() startDate: string = '';
  @Input() endDate: string = '';

  get modelValue(){
    return this.value[this.atribute];
  }

  set modelValue(value: string){
    this.value[this.atribute]=value;
  }

  minDate: string = '';
  maxDate: string = '';

  constructor() { 
  }

  ngOnInit(): void {
  }
}