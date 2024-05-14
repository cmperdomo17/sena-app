import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../../models/Teachers';

@Component({
  selector: 'app-form-teacher',
  templateUrl: './form-teacher.component.html',
  styleUrl: './form-teacher.component.css'
})
export class FormTeacherComponent implements OnInit{

  ngOnInit(): void {
    this.listDniTypes();
  }

  onSelectionChangeType(selection: string): void {
    this.teacher.teacher_type = selection;
  }

  onSelectionChangeCType(selection: string):void{
    this.teacher.teacher_contractType = selection;
  }

  dniTypes:any=[];

  teacher: Teacher = {
    teacher_id:0,
    teacher_name:'',
    teacher_lastname:'',
    teacher_dniType:'',
    teacher_dni:'',
    teacher_type:'',
    teacher_contractType:'',
    teacher_area:'',
    user_login:'',
    user_pwd:''
  }

  listDniTypes(){
    this.dniTypes=[{typeName: "RC"}, 
                   {typeName: "TI"},
                   {typeName: "CC"},
                   {typeName: "TE"},
                   {typeName: "CE"},
                   {typeName: "NIT"},
                   {typeName: "PP"},
                   {typeName: "PEP"},
                   {typeName: "DIE"},
                   {typeName: "NUIP"},
                   {typeName: "FOREIGN_NIT"}];
  }

  createTeacher(){
    console.log(this.teacher);
  }
}
