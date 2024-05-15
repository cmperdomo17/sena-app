import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() label: string = '';
  @Input() value: any='';
  @Input() atribute: any='';

  get modelValue(){
    return this.value[this.atribute];
  }

  set modelValue(value: string){
    this.value[this.atribute]=value;
  }
}