import { Logger } from '@nestjs/common';
import { Prisma, UserStatusEnum } from '@prisma/client';
import { HashHelper } from '../../../src/shared/helpers/hash.helper';
import { DbConnection } from '../../../src/shared/db/db.connection';

const $hash = new HashHelper();
const $prisma = new DbConnection();
const $logger = new Logger();

const seedUser = async () => {
  $logger.log(`\x1b[1m+ Creating products\x1b[0m`);

  const password = await $hash.hashPassword('123');
  const usersObj: Prisma.UserCreateManyInput[] = [
    {
      id: '8abe7568-61ef-4835-863b-f4453512527d',
      name: 'User Active',
      email: 'user1@email.com',
      status: UserStatusEnum.ACTIVE,
      cpf: '00000000001',
      password,
      photoUrl:
        'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png',
    },
    {
      id: '3c284aba-380c-418e-8005-5e5da0b3b191',
      name: 'User Inactive',
      email: 'user2@email.com',
      status: UserStatusEnum.INACTIVE,
      cpf: '00000000002',
      password,
      photoUrl:
        'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png',
    },
    {
      id: '925928be-1176-46f1-b131-ab932bd56fcd',
      name: 'User Banned',
      email: 'user3@email.com',
      status: UserStatusEnum.BANNED,
      cpf: '000.000000-03',
      password,
      photoUrl:
        'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png',
    },
    {
      id: '325a1a14-e283-4482-95c5-5c5bbe0d73c1',
      name: 'User Soft Deleted',
      email: 'user4@email.com',
      status: UserStatusEnum.ACTIVE,
      cpf: '00000000000',
      password,
      photoUrl:
        'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png',
      deletedAt: new Date(),
    },
  ];

  await $prisma.user.createMany({
    data: usersObj,
  });
};

export { seedUser };
