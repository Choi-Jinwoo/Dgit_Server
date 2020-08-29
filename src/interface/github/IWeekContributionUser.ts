import { User } from 'src/user/user.entity';

export interface IWeekContributionUser extends User {
  weekContributions: number;
}
