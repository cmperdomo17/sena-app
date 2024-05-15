import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../../models/Teachers';
import { TeachersService } from '../../../services/teachers.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-form-teacher',
  templateUrl: './form-teacher.component.html',
  styleUrl: './form-teacher.component.css'
})
export class FormTeacherComponent implements OnInit{
  
  edit: boolean=false;
  dniTypes:any=[];

  teacher: Teacher = {
    TEACHER_ID: 0,
    TEACHER_NAME: '',
    TEACHER_LASTNAME: '',
    TEACHER_DNITYPE: '',
    TEACHER_DNI: '',
    TEACHER_TYPE: '',
    TEACHER_CONTRACTTYPE: '',
    TEACHER_AREA: '',
    USER_LOGIN: '',
    USER_PWD: ''
  }

  constructor(private teacherService: TeachersService, private router: Router, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.listDniTypes();
    const params = this.activatedRoute.snapshot.params;
    if (params['id']){
      this.teacherService.getTeacher(params['id'])
        .subscribe(
          (res: any) => {
            this.teacher = res[0];
            console.log("Profesor: ",this.teacher);
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  onSelectionChangeType(selection: string): void {
    this.teacher.TEACHER_TYPE = selection;
  }

  onSelectionChangeCType(selection: string):void{
    this.teacher.TEACHER_CONTRACTTYPE = selection;
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

  saveNewTeacher(){
    if(this.teacher.TEACHER_NAME=='' ||
       this.teacher.TEACHER_LASTNAME=='' || 
       this.teacher.TEACHER_DNITYPE=='' ||
       this.teacher.TEACHER_DNI=='' ||
       this.teacher.TEACHER_TYPE=='' ||
       this.teacher.TEACHER_CONTRACTTYPE=='' ||
       this.teacher.TEACHER_AREA=='' ||
       this.teacher.USER_LOGIN=='' ||
       this.teacher.USER_PWD==''
    ){
      alert('Por favor ingresa todos los campos');
      return;
    }
    this.teacherService.createTeacher(this.teacher).subscribe(
      res=>{
        console.log(res);
      },
      err=>console.log(err)
    )
  }

  updateTeacher(){
    this.teacherService.updateTeacher(this.teacher.TEACHER_ID,this.teacher).subscribe(
      res=>{
        console.log(res);
      },
      err=>console.log(err)
    )
  }
}
