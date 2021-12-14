import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('SET FOREIGN_KEY_CHECKS=0;');
  await knex('UserEvent').truncate();
  await knex('Event').truncate();
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
  const student = {
    username: 'test',
    password: await bcrypt.hash(password, salt),
    role: 'Student'
  };
  const password2 = 'secret';
  const student2 = {
    username: 'newUser',
    password: await bcrypt.hash(password2, salt),
    role: 'Student'
  };
  await knex('User').insert([student, student2]);

  await knex('Company').insert([{ name: 'A Thinking Ape' }, { name: 'EA Games' }, { name: 'Microsoft' }]);

  await knex('JobPosting').insert([
    {
      companyId: 1,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      title: 'Unity Game Developer Co-op'
    },
    {
      companyId: 2,
      deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
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

  await knex('JobApplication').insert([
    { postingId: 1, userId: 1, status: 'submitted' },
    { postingId: 1, userId: 2, status: 'submitted' },
    { postingId: 2, userId: 1, status: 'submitted', submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 - 86400000) }
  ]);

  await knex('Event').insert([
    {
      title: 'Co-op Resume Workshop',
      location: '8888 University Dr, Burnaby, BC V5A 1S6',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 - 86400000),
      capacity: 1,
      description: 'Mandatory Resume workshop for prospective Co-op students'
    },
    {
      title: 'Co-op Cover Letter Workshop',
      location: '8888 University Dr, Burnaby, BC V5A 1S6',
      date: new Date(),
      capacity: 25,
      description: 'Mandatory Cover Letter workshop for prospective Co-op students'
    }
  ]);
}
