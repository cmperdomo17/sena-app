/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     4/27/2024 5:02:21 PM                         */
/*==============================================================*/

/*ALTER USER 'root'@'localhost' identified with mysql_native_password by 'PASSWORD';*/

drop database if exists sena_db;

create database sena_db;

use sena_db;

drop table if exists AMBIENT;

drop table if exists COMPETENCEGEN_PROGRAM;

drop table if exists COMPETENCE_SPECIFIC;

drop table if exists COMPETENCE_GENERIC;

drop table if exists TEACHER;

drop table if exists `SCHEDULE`;

drop table if exists ACADEMIC_PERIOD;

drop table if exists PROGRAM;

drop table if exists `USER`;

drop procedure if exists listPrograms;
drop procedure if exists getProgram;
drop procedure if exists createProgram;
drop procedure if exists updateProgram;
drop procedure if exists changeStateProgram;

drop procedure if exists listAmbients;
drop procedure if exists getAmbient;
drop procedure if exists createAmbient;
drop procedure if exists updateAmbient;
drop procedure if exists changeStateAmbient;

drop procedure if exists listTeachers;
drop procedure if exists getTeacher;
drop procedure if exists createTeacher;
drop procedure if exists updateTeacher;
drop procedure if exists changeStateTeacher;

/*==============================================================*/
/* Table: AMBIENTE                                              */
/*==============================================================*/
create table AMBIENT
(
   AMBIENT_ID          varchar(6) not null,
   AMBIENT_NAME      varchar(100),
   AMBIENT_LOCATION   varchar(100),
   AMBIENT_TYPE        varchar(50),
   AMBIENT_CAPACITY   numeric(8,0),
   AMBIENT_STATE     numeric(4,0),
   primary key (AMBIENT_ID)
);

/*==============================================================*/
/* Table: COMPETENCIAGEN_PROGRAMA                               */
/*==============================================================*/
create table COMPETENCEGEN_PROGRAM
(
   PROGRAM_ID          int not null,
   COMPETENCEGEN_ID   int not null,
   primary key (PROGRAM_ID, COMPETENCEGEN_ID)
);

/*==============================================================*/
/* Table: COMPETENCIA_ESPECIFICA                                */
/*==============================================================*/
create table COMPETENCE_SPECIFIC
(
   COMPETENCESPC_ID    int not null AUTO_INCREMENT,
   PROGRAM_ID          int not null,
   COMPETENCESPC_NAME varchar(50),
   COMPETENCESPC_STATE     numeric(4,0),
   primary key (COMPETENCESPC_ID)
);

/*==============================================================*/
/* Table: COMPETENCIA_GENERICA                                  */
/*==============================================================*/
create table COMPETENCE_GENERIC
(
   COMPETENCEGEN_ID    int not null AUTO_INCREMENT,
   COMPETENCEGEN_NAME varchar(50),
   COMPETENCEGEN_STATE     numeric(4,0),
   primary key (COMPETENCEGEN_ID)
);

/*==============================================================*/
/* Table: DOCENTE                                               */
/*==============================================================*/
create table TEACHER
(
   TEACHER_ID           int not null AUTO_INCREMENT,
   TEACHER_NAME      varchar(100) not null,
   TEACHER_LASTNAME    varchar(100),
   TEACHER_DNITYPE varchar(30) default '1',
   TEACHER_DNI varchar(10) not null,
   TEACHER_TYPE         varchar(30),
   TEACHER_CONTRACTTYPE varchar(30),
   TEACHER_AREA         varchar(100) not null,
   TEACHER_STATE     numeric(4,0),
   primary key (TEACHER_ID)
);

/*==============================================================*/
/* Table: HORARIO                                               */
/*==============================================================*/
create table `SCHEDULE`
(
   AMBIENT_ID          varchar(6) not null,
   TEACHER_ID           int not null,
   PERIOD_ID           int not null,
   PROGRAM_ID          int not null,
   SCHEDULE_DAY          varchar(10),
   SCHEDULE_START_HOUR  numeric(8,0),
   SCHEDULE_END_HOUR     numeric(8,0),
   SCHEDULE_DURATION     numeric(8,0),
   primary key (AMBIENT_ID, TEACHER_ID, PERIOD_ID, PROGRAM_ID)
);

/*==============================================================*/
/* Table: PERIODO_ACADEMICO                                     */
/*==============================================================*/
create table PERIOD
(
   PERIOD_ID           int not null AUTO_INCREMENT,
   PERIOD_START_DATE    varchar(40) not null,
   PERIOD_END_DATE    varchar(40),
   PERIOD_NAME       varchar(50) not null,
   PERIOD_STATE     numeric(4,0),
   primary key (PERIOD_ID)
);

/*==============================================================*/
/* Table: PROGRAMA                                              */
/*==============================================================*/
create table PROGRAM
(
   PROGRAM_ID          int not null AUTO_INCREMENT,
   PROGRAM_NAME      varchar(50),
   PROGRAM_STATE     numeric(4,0),
   primary key (PROGRAM_ID)
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table `USER`
(
   USER_ID               numeric(8,0) not null,
   USER_LOGIN            varchar(100) not null,
   USER_PWD              varchar(50) not null,
   primary key (USER_ID)
);

alter table COMPETENCEGEN_PROGRAM add constraint FK_COMPETENCEGEN_PROGRAM foreign key (PROGRAM_ID)
      references PROGRAM (PROGRAM_ID) on delete restrict on update restrict;

alter table COMPETENCEGEN_PROGRAM add constraint FK_COMPETENCEGEN_PROGRAM2 foreign key (COMPETENCEGEN_ID)
      references COMPETENCE_GENERIC (COMPETENCEGEN_ID) on delete restrict on update restrict;

alter table COMPETENCE_SPECIFIC add constraint FK_COMPETENCESP_PROGRAM foreign key (PROGRAM_ID)
      references PROGRAM (PROGRAM_ID) on delete restrict on update restrict;

alter table `SCHEDULE` add constraint FK_SCHEDULE foreign key (PROGRAM_ID)
      references PROGRAM (PROGRAM_ID) on delete restrict on update restrict;

alter table `SCHEDULE` add constraint FK_SCHEDULE2 foreign key (AMBIENT_ID)
      references AMBIENT (AMBIENT_ID) on delete restrict on update restrict;

alter table `SCHEDULE` add constraint FK_SCHEDULE3 foreign key (TEACHER_ID)
      references TEACHER (TEACHER_ID) on delete restrict on update restrict;

alter table `SCHEDULE` add constraint FK_SCHEDULE4 foreign key (PERIOD_ID)
      references PERIOD (PERIOD_ID) on delete restrict on update restrict;

/*==============================================================*/
/* Procedures Programs                                          */
/*==============================================================*/
DELIMITER $$ 
create procedure listPrograms()
begin
	select * from program;
end;

create procedure getProgram(in programid int)
begin
   select * from program where program_id=programid;
end;

create procedure createProgram(in programname varchar(50))
begin
   insert into program (program_name, program_state) values (programname, 1);
end;

create procedure updateProgram(in programid int, in programname varchar(50))
begin
   update program set program_name=programname where program_id=programid;
end;

create procedure changeStateProgram(in programid int, in programstate int)
begin
   update program set program_state = programstate where program_id=programid;
end; 

$$
DELIMITER ;

/*==============================================================*/
/* Procedures Ambients                                          */
/*==============================================================*/
DELIMITER $$ 
create procedure listAmbients()
begin
	select * from ambient;
end;

create procedure getAmbient(in ambientid varchar(6))
begin
   select * from ambient where ambient_id=ambientid;
end;

create procedure createAmbient(in ambientid varchar(6),
                              in ambientname varchar(100), 
                              in ambientlocation varchar(100), 
                              in ambienttype varchar(50),
                              in ambientcapacity int)
begin
   insert into ambient (ambient_id,ambient_name, ambient_location, ambient_type, ambient_capacity, ambient_state) 
   values (ambientid,ambientname,ambientlocation,ambienttype,ambientcapacity, 1);
end;

create procedure updateAmbient(in ambientid int, 
                              in ambientname varchar(100), 
                              in ambientlocation varchar(100), 
                              in ambienttype varchar(50),
                              in ambientcapacity int)
begin
   update ambient 
   set ambient_name=ambientname, 
      ambient_location=ambientlocation,
      ambient_type=ambienttype,
      ambient_capacity=ambientcapacity
   where ambient_id=ambientid;
end;

create procedure changeStateAmbient(in ambientid int, in ambientstate int)
begin
   update ambient set ambient_state = ambientstate where ambient_id=ambientid;
end;  

$$
DELIMITER ;

/*==============================================================*/
/* Procedures Teachers                                          */
/*==============================================================*/

DELIMITER $$ 
create procedure listTeachers()
begin
	select * from teacher;
end;

create procedure getTeacher(in teacherid int)
begin
	select * from teacher where teacher_id=teacherid;
end;

create procedure createTeacher(in teachername varchar(100), 
                              in teacherlastname varchar(100), 
                              in teacherdnitype varchar(10),
                              in teacherdni varchar(10),
                              in teachertype varchar(30),
                              in teachercontracttype varchar(30),
                              in teacherarea varchar(100))
begin
   insert into teacher (teacher_name,teacher_lastname,teacher_dnitype,teacher_dni,teacher_type,teacher_contracttype,teacher_area, teacher_state) 
   values (teachername,teacherlastname,teacherdnitype,teacherdni,teachertype,teachercontracttype,teacherarea,1);
end;

create procedure updateTeacher(in teacherid int, 
                              in teachername varchar(100), 
                              in teacherlastname varchar(100), 
                              in teacherdnitype varchar(10),
                              in teacherdni varchar(10),
                              in teachertype varchar(30),
                              in teachercontracttype varchar(30),
                              in teacherarea varchar(100))
begin
   update teacher set teacher_name=teachername,
      teacher_lastname=teacherlastname,
      teacher_dnitype=teacherdnitype,
      teacher_dni=teacherdni,
      teacher_type=teachertype,
      teacher_contracttype=teachercontracttype,
      teacher_area=teacherarea
   where teacher_id=teacherid;
end;

create procedure changeStateTeacher(in teacherid int, in teacherstate int)
begin
   update teacher set teacher_state = teacherstate where teacher_id=teacherid;
end;  

$$
DELIMITER ;

/*==============================================================*/
/* Datos de prueba                                              */
/*==============================================================*/

insert into program (program_name, program_state) values ('Hola',1);
insert into program (program_name, program_state) values ('Como',1);
insert into program (program_name, program_state) values ('Estas?',1);

insert into ambient (ambient_id, ambient_name,ambient_location,ambient_type,ambient_capacity,ambient_state)
values ("1A1A1","Salon 111","Piso 1","Presencial",20,1);
insert into ambient (ambient_id, ambient_name,ambient_location,ambient_type,ambient_capacity,ambient_state)
values ("2B2B2B","Salon 222","Piso 2","Virtual",25,1);

insert into teacher (teacher_name,teacher_lastname,teacher_dnitype,teacher_dni,teacher_type,teacher_contracttype,teacher_area, teacher_state)
values ("Francisco","Javier","CC","123456789","tecnico","PT","Software",1);
insert into teacher (teacher_name,teacher_lastname,teacher_dnitype,teacher_dni,teacher_type,teacher_contracttype,teacher_area, teacher_state)
values ("Ricardo","Zambrano","CC","987654321","profesional","CNT","Arquitectura de software",1);