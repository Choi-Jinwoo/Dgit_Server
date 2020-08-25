import { DayOfWeek } from 'src/enum/day_of_week.enum';

export interface IGithubUser {
  login: string;
  name: string;
  avatar_url: string;
}


export interface IGithubContribution {
  user: {
    // userImage
    avatarUrl: string;
    // userID
    login: string;
    contributionsCollection: IContributionsCollection;
  }
}

interface IContributionsCollection {
  contributionCalendar: IContributionCalendar;
}

interface IContributionCalendar {
  totalContributions: number;
  weeks: IWeeks[];
}

interface IWeeks {
  contributionDays: IContributionDays[];
}

interface IContributionDays {
  contributionCount: number;
  date: string;
  weekday: DayOfWeek;
}
