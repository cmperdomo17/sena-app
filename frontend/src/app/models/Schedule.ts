export interface Schedule {
    schedule_id: number;
    ambient_id: string;
    teacher_id: number;
    period_id: number;
    competence_id: number;
    competence_type: number;
    schedule_day: string;
    schedule_start_hour: number;
    schedule_end_hour: number;
    schedule_duration: number;
}