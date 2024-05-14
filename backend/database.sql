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
   USER_ID        int not null,
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
   USER_ID               int not null AUTO_INCREMENT,
   USER_LOGIN            varchar(100) not null,
   USER_PWD              varchar(50) not null,
   USER_STATE            numeric(4,0),
   primary key (USER_ID)
);

alter table TEACHER add constraint FK_USER_TO_PROGRAM foreign key (USER_ID)
      references USER (USER_ID) on delete restrict on update restrict;

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

create procedure updateAmbient(in ambientid varchar(6), 
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

create procedure changeStateAmbient(in ambientid varchar(6), in ambientstate int)
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
                              in teacherarea varchar(100),
                              in userlogin varchar(100),
                              in userpwd varchar(50))
begin

   insert into user (user_login, user_pwd) values (userlogin,userpwd);

   set @userid = last_insert_id();

   insert into teacher (teacher_name,
                        teacher_lastname,
                        teacher_dnitype,
                        teacher_dni,
                        teacher_type,
                        teacher_contracttype,
                        teacher_area, 
                        teacher_state,
                        user_id) 
   values (teachername,teacherlastname,teacherdnitype,teacherdni,teachertype,teachercontracttype,teacherarea,1,@userid);
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
/* Procedures Periods                                           */
/*==============================================================*/
DELIMITER $$
create procedure listPeriods()
begin
   select * from `period`;
end;

create procedure getPeriod(in periodid int)
begin
   select * from `period` where period_id=periodid;
end;

create procedure createPeriod(in periodstartdate varchar(40),
                              in periodenddate varchar(40),
                              in periodname varchar(50))
begin
   insert into `period` (period_start_date,period_end_date,period_name, period_state)
   values (periodstartdate,periodenddate,periodname,1);
end;

create procedure updatePeriod(in periodid int,
                              in periodstartdate varchar(40),
                              in periodenddate varchar(40),
                              in periodname varchar(50))
begin
   update `period` set period_start_date=periodstartdate,
   period_end_date=periodenddate,
   period_name=periodname
   where period_id=periodid;
end;

create procedure changeStatePeriod(in periodid int, in periodstate int)
begin
   update `period` set period_state=periodstate where period_id=periodid;
end;

$$
DELIMITER ;

/*==============================================================*/
/* Procedures Competencies                                      */
/*==============================================================*/
DELIMITER $$
create procedure listCompetencies()
begin
   select
    cs.competencespc_id as competence_id,
    cs.program_id as program_id,
    cs.competencespc_name as competence_name,
    cs.competencespc_state as competence_state
   from competence_specific cs

   union all

   select
      cg.competencegen_id as competence_id,
      null as program_id,
      cg.competencegen_name as competence_name,
      cg.competencegen_state as competence_state
   from competence_generic cg;
end;

create procedure getCompetence(in competenceid int, in competencetype int)
begin
   if competencetype=0 then
      select * from competence_generic where competencegen_id=competenceid;
   else 
      select * from competence_specific where competencespc_id=competenceid;
   end if;
end;

create procedure createCompetence(in competencename varchar(50),
                                 in programid int)
begin
   if programid is null then
      insert into competence_generic (competencegen_name, competencegen_state)
      values (competencename,1);
   else 
      insert into competence_specific (program_id, competencespc_name, competencespc_state)
      values (programid,competencename,1);
   end if;
end;

create procedure updateCompetence(in competenceid int,
                                 in programid int,
                                 in competencename varchar(50))
begin
   if programid is null then
      update competence_generic set competencegen_name=competencename
      where competencegen_id=competenceid;
   else
      update competence_specific set program_id=programid, competencespc_name=competencename
      where competencespc_id=competenceid;
   end if;
end;

create procedure changeStateCompetence(in competenceid int,
                                       in competencetype int,
                                       in competencestate int)
begin
   if competencetype=0 then
      update competence_generic set competencegen_state=competencestate where competencegen_id=competenceid;
   else 
      update competence_specific set competencespc_state=competencestate where competencespc_id=competenceid;
   end if;
end;

$$
DELIMITER ;

/*==============================================================*/
/* Procedures Users                                             */
/*==============================================================*/
DELIMITER $$

create procedure listUsers()
begin
   select * from user;
end;

create procedure getUser(in userid int)
begin
   select * from user where user_id=userid;
end;

create procedure createUser(in userlogin varchar(100), in userpwd varchar(50))
begin
   insert into user (user_login,user_pwd,user_state)
   values (userlogin,userpwd,1);
end;

create procedure updateUser(in userid int,
                           in userlogin varchar(100),
                           in userpwd varchar(50))
begin
   update user set user_login=userlogin, user_pwd=userpwd where user_id=userid;
end;

create procedure changeStateUser(in userid int, in userstate int)
begin
   update user set user_state=userstate where user_id=userid;
end;

$$
DELIMITER ;

/*==============================================================*/
/* Datos de prueba                                              */
/*==============================================================*/

insert into `user` (user_login, user_pwd, user_state) 
values ("coordinador","HolaComoTeLlamas",1);
insert into `user` (user_login, user_pwd, user_state) 
values ("francisco","BienYTu",1);
insert into `user` (user_login, user_pwd, user_state) 
values ("zambrano","ComoEstas",1);

insert into program (program_name, program_state) values ("Sistemas",1);
insert into program (program_name, program_state) values ("Medicina",1);
insert into program (program_name, program_state) values ("Derecho",1);

insert into ambient (ambient_id, ambient_name,ambient_location,ambient_type,ambient_capacity,ambient_state)
values ("1A1A1","Salon 111","Piso 1","Presencial",20,1);
insert into ambient (ambient_id, ambient_name,ambient_location,ambient_type,ambient_capacity,ambient_state)
values ("2B2B2B","Salon 222","Piso 2","Virtual",25,1);

insert into teacher (teacher_name,teacher_lastname,teacher_dnitype,teacher_dni,teacher_type,teacher_contracttype,teacher_area, teacher_state, user_id)
values ("Francisco","Javier","CC","123456789","tecnico","PT","Software",1,2);
insert into teacher (teacher_name,teacher_lastname,teacher_dnitype,teacher_dni,teacher_type,teacher_contracttype,teacher_area, teacher_state, user_id)
values ("Ricardo","Zambrano","CC","987654321","profesional","CNT","Arquitectura de software",1,3);

insert into `period` (period_start_date,period_end_date,period_name, period_state)
values ("20/01/2024","20/06/2024","2024.1",1);
insert into `period` (period_start_date,period_end_date,period_name, period_state)
values ("20/07/2024","20/012/2024","2024.2",1);

insert into competence_generic (competencegen_name, competencegen_state)
values ("Calculo 1",1);

insert into competence_specific (program_id, competencespc_name, competencespc_state)
values (1,"Software 3",1);
insert into competence_specific (program_id, competencespc_name, competencespc_state)
values (2,"Anatomia",1);

