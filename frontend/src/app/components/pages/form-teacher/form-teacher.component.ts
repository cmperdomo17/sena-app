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
    teacher_id:0,
    teacher_name:'',
    teacher_lastname:'',
    teacher_dnitype:'',
    teacher_dni:'',
    teacher_type:'',
    teacher_contracttype:'',
    teacher_area:'',
    user_login:'',
    user_pwd:''
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
    this.teacher.teacher_type = selection;
  }

  onSelectionChangeCType(selection: string):void{
    this.teacher.teacher_contracttype = selection;
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
    if(this.teacher.teacher_name=='' ||
       this.teacher.teacher_lastname=='' || 
       this.teacher.teacher_dnitype=='' ||
       this.teacher.teacher_dni=='' ||
       this.teacher.teacher_type=='' ||
       this.teacher.teacher_contracttype=='' ||
       this.teacher.teacher_area=='' ||
       this.teacher.user_login=='' ||
       this.teacher.user_pwd==''
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
    this.teacherService.updateTeacher(this.teacher.teacher_id,this.teacher).subscribe(
      res=>{
        console.log(res);
      },
      err=>console.log(err)
    )
  }
}
