import { EntityRepository, Repository } from 'typeorm';

import { Contribution } from './contribution.entity';

@EntityRepository(Contribution)
export class ContributionRepository extends Repository<Contribution> { }