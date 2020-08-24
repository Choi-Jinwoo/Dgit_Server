import { DayOfWeek } from 'src/enum/day_of_week.enum';

export interface IGithubUser {
  login: string;
  name: string;
  avatar_url: string;
}

export interface IGithubContribution {
  contributionsCollection?: IContributionsCollection;
}

export interface IContributionsCollection {
  contributionCalendar?: IContributionCalendar;
}

export interface IContributionCalendar {
  totalContributions?: number;
  weeks?: IWeeks[];
}

export interface IWeeks {
  contributionDays?: IContributionDays[];
}

export interface IContributionDays {
  contributionCount?: number;
  date?: string;
  weekday?: DayOfWeek;
}
