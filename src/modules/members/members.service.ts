import { Injectable } from '@nestjs/common';
import { MembersRepository } from './members.repository';

@Injectable()
export class MembersService {
  constructor(private membersRepository: MembersRepository) {}
}
