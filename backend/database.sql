/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     4/27/2024 5:02:21 PM                         */
/*==============================================================*/

/*ALTER USER 'root'@'localhost' identified with mysql_native_password by 'PASSWORD';*/

drop database if exists sena_db;

create database sena_db;

use sena_db;

/*==============================================================*/
/* Table: ambiente                                              */
/*==============================================================*/
create table ambient
(
   ambient_id          varchar(6) not null,
   ambient_name      varchar(100),
   ambient_location   varchar(100),
   ambient_type        varchar(50),
   ambient_capacity   numeric(8,0),
   ambient_state     numeric(4,0),
   primary key (ambient_id)
);

/*==============================================================*/
/* Table: competenciagen_programa                               */
/*==============================================================*/
create table competencegen_program
(
   program_id          int not null,
   competencegen_id   int not null,
   primary key (program_id, competencegen_id)
);

/*==============================================================*/
/* Table: competencia_especifica                                */
/*==============================================================*/
create table competence_specific
(
   competencespc_id    int not null AUTO_INCREMENT,
   program_id          int not null,
   competencespc_name varchar(50),
   competencespc_state     numeric(4,0),
   primary key (competencespc_id)
);

/*==============================================================*/
/* Table: competencia_generica                                  */
/*==============================================================*/
create table competence_generic
(
   competencegen_id    int not null AUTO_INCREMENT,
   competencegen_name varchar(50),
   competencegen_state     numeric(4,0),
   primary key (competencegen_id)
);
/*==============================================================*/
/* Table: teacher                                               */
/*==============================================================*/
create table teacher
(
   teacher_id           int not null AUTO_INCREMENT,
   teacher_name      varchar(100) not null,
   teacher_lastname    varchar(100),
   teacher_dnitype varchar(30) default '1',
   teacher_dni varchar(10) not null,
   teacher_type         varchar(30),
   teacher_contracttype varchar(30),
   teacher_area         varchar(100) not null,
   teacher_state     numeric(4,0),
   user_id        int not null,
   primary key (teacher_id)
);

/*==============================================================*/
/* Table: schedule                                               */
/*==============================================================*/
create table schedule
(  
   schedule_id          int not null AUTO_INCREMENT,
   ambient_id          varchar(6) not null,
   teacher_id           int not null,
   period_id           int not null,
   competence_id        int not null,
   competence_type      int not null,
   schedule_day          varchar(10),
   schedule_start_hour  numeric(8,0),
   schedule_end_hour     numeric(8,0),
   schedule_duration     numeric(8,0),
   primary key (schedule_id)
);

/*==============================================================*/
/* Table: periodo_academico                                     */
/*==============================================================*/
create table period
(
   period_id           int not null AUTO_INCREMENT,
   period_start_date    varchar(40) not null,
   period_end_date    varchar(40),
   period_name       varchar(50) not null,
   period_state     numeric(4,0),
   primary key (period_id)
);

/*==============================================================*/
/* Table: programa                                              */
/*==============================================================*/
create table program
(
   program_id          int not null AUTO_INCREMENT,
   program_name      varchar(50),
   program_state     numeric(4,0),
   primary key (program_id)
);

/*==============================================================*/
/* Table: usuario                                               */
/*==============================================================*/
create table user
(
   user_id               int not null AUTO_INCREMENT,
   user_login            varchar(100) not null,
   user_pwd              varchar(50) not null,
   user_state            numeric(4,0),
   primary key (user_id)
);

alter table teacher add constraint fk_user_to_program foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

alter table competencegen_program add constraint fk_competencegen_program foreign key (program_id)
      references program (program_id) on delete restrict on update restrict;

alter table competencegen_program add constraint fk_competencegen_program2 foreign key (competencegen_id)
      references competence_generic (competencegen_id) on delete restrict on update restrict;

alter table competence_specific add constraint fk_competencesp_program foreign key (program_id)
      references program (program_id) on delete restrict on update restrict;

alter table schedule add constraint fk_schedule2 foreign key (ambient_id)
      references ambient (ambient_id) on delete restrict on update restrict;

alter table schedule add constraint fk_schedule3 foreign key (teacher_id)
      references teacher (teacher_id) on delete restrict on update restrict;

alter table schedule add constraint fk_schedule4 foreign key (period_id)
      references period (period_id) on delete restrict on update restrict;


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

create procedure getTeacherByUserId(in userid int)
begin
   select * from teacher where user_id=userid;
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

   insert into user (user_login, user_pwd, user_state) values (userlogin, userpwd, 1);

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
      select cg.competencegen_id as competence_id,
             cg.competencegen_name as competence_name,
             null as program_id,
             cg.competencegen_state as competence_state
      from competence_generic cg where competencegen_id=competenceid;
   else 
      select cs.competencespc_id as competence_id,
             cs.competencespc_name as competence_name,
             cs.program_id as program_id,
             cs.competencespc_state as competence_state
      from competence_specific cs where competencespc_id=competenceid;
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

create procedure deleteCompetence(in competenceid int,
                                 in programid int)
begin
   if programid=0 then
      delete from competence_generic
      where competencegen_id=competenceid;
   else
      delete from competence_specific 
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
/* Procedures Schedule                                          */
/*==============================================================*/
DELIMITER $$

create procedure listSchedulesAll()
begin
   select * from schedule;
end;

create procedure listSchedulesPeriodTeacher(in teacherid int, in periodid int)
begin
   select * from schedule where teacher_id=teacherid AND period_id=periodid;
end;

create procedure getSchedule(in scheduleid int)
begin
   select * from schedule where schedule_id=scheduleid;
end;

create procedure createSchedule(in ambientid varchar(6),
                                 in teacherid int,
                                 in periodid int,
                                 in competenceid int,
                                 in competencetype int,
                                 in scheduleday varchar(10),
                                 in schedulestart_hour int,
                                 in scheduleend_hour int,
                                 in scheduleduration int)
begin
   insert into schedule (ambient_id,teacher_id,period_id,competence_id,competence_type,
                        schedule_day,schedule_start_hour,schedule_end_hour,schedule_duration)
   values (ambientid,teacherid,periodid,competenceid,competencetype,
           scheduleday,schedulestart_hour,scheduleend_hour,scheduleduration);
end;

create procedure updateSchedule(in scheduleid int,
                                 in ambientid varchar(6),
                                 in teacherid int,
                                 in periodid int,
                                 in competenceid int,
                                 in competencetype int,
                                 in scheduleday varchar(10),
                                 in schedulestart_hour numeric(8,0),
                                 in scheduleend_hour numeric(8,0),
                                 in scheduleduration numeric(8,0))
begin
   update schedule set ambient_id=ambientid,
                        teacher_id=teacherid,
                        period_id=periodid,
                        competence_id=competenceid,
                        competence_type=competencetype,
                        schedule_day=scheduleday,
                        schedule_start_hour=schedulestart_hour,
                        schedule_end_hour=scheduleend_hour,
                        schedule_duration=scheduleduration
   where schedule_id=scheduleid;
end;

create procedure deleteSchedule(in scheduleid int)
begin
   delete from schedule where schedule_id=scheduleid;
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
values ("Francisco","Javier","CC","123456789","Tecnico","PT","Software",1,2);
insert into teacher (teacher_name,teacher_lastname,teacher_dnitype,teacher_dni,teacher_type,teacher_contracttype,teacher_area, teacher_state, user_id)
values ("Ricardo","Zambrano","CC","987654321","Profesional","CNT","Arquitectura de software",1,3);

insert into `period` (period_start_date,period_end_date,period_name, period_state)
values ("20/01/2024","20/06/2024","2024.1",1);
insert into `period` (period_start_date,period_end_date,period_name, period_state)
values ("20/07/2024","20/12/2024","2024.2",1);

insert into competence_generic (competencegen_name, competencegen_state)
values ("Calculo 1",1);

insert into competence_specific (program_id, competencespc_name, competencespc_state)
values (1,"Software 3",1);
insert into competence_specific (program_id, competencespc_name, competencespc_state)
values (2,"Anatomia",1);

insert into schedule (ambient_id,teacher_id,period_id,competence_id,competence_type,
                        schedule_day,schedule_start_hour,schedule_end_hour,schedule_duration)
values ("1A1A1", 1, 1, 1, 1, "Lunes", 7, 9, 2);
insert into schedule (ambient_id,teacher_id,period_id,competence_id,competence_type,
                     schedule_day,schedule_start_hour,schedule_end_hour,schedule_duration)
values ("2B2B2B", 1, 2, 1, 0, "Lunes", 7, 9, 2);

insert into schedule (ambient_id,teacher_id,period_id,competence_id,competence_type,
                        schedule_day,schedule_start_hour,schedule_end_hour,schedule_duration)
values ("1A1A1", 2, 1, 2, 1, "Martes", 11, 13, 2);

insert into schedule (ambient_id,teacher_id,period_id,competence_id,competence_type,
                        schedule_day,schedule_start_hour,schedule_end_hour,schedule_duration)
values ("2B2B2B", 2, 1, 1, 1, "Jueves", 15, 19, 4);

alter table `period` AUTO_INCREMENT = 1;