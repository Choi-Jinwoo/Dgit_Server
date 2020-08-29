import { DayOfWeek } from 'src/enum/day_of_week.enum';

export const getWeekSunday = (date: Date): Date => {
  // 불변선을 위한 복사
  const copiedDate = new Date(date);
  // 일요일과 date의 요일 차이
  const dayDiffDateAndSun = copiedDate.getDay() - DayOfWeek.SUN;

  copiedDate.setDate(copiedDate.getDate() - dayDiffDateAndSun);
  return copiedDate;
}

export const getWeekSaturday = (date: Date): Date => {
  // 불변선을 위한 복사
  const copiedDate = new Date(date);
  // 토요일과 date의 요일 차이
  const dayDiffDateAndSat = DayOfWeek.SAT - copiedDate.getDay();

  copiedDate.setDate(copiedDate.getDate() + dayDiffDateAndSat);
  return copiedDate;
}