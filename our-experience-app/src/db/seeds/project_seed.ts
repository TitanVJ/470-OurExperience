import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('SET FOREIGN_KEY_CHECKS=0;');
  await knex('ApplicationDocument').truncate();
  await knex('Document').truncate();
  await knex('JobApplication').truncate();
  await knex('JobPosting').truncate();
  await knex('Company').truncate();
  await knex('User').truncate();
  await knex.raw('SET FOREIGN_KEY_CHECKS=1;');

  // Inserts seed entries
  const password = 'password';
  const salt = await bcrypt.genSalt(12);
  const user = {
    username: 'test',
    password: await bcrypt.hash(password, salt)
  };
  await knex('User').insert(user);

  await knex('Company').insert([{ name: 'A Thinking Ape' }, { name: 'EA Games' }, { name: 'Microsoft' }]);

  await knex('JobPosting').insert([
    {
      companyId: 1,
      deadline: new Date(),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      title: 'Unity Game Developer Co-op'
    },
    {
      companyId: 2,
      deadline: new Date(),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      title: 'Game Developer Co-op FIFA Team'
    },
    {
      companyId: 3,
      deadline: new Date(),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      title: 'Software Developer Co-op'
    }
  ]);
}
