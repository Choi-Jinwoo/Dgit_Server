import { EntityRepository, Repository } from 'typeorm';

import { TotalTop } from './totalTop.entity';

@EntityRepository(TotalTop)
export class TotalTopRepository extends Repository<TotalTop> {

}