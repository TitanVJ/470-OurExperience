import { Knex } from 'knex';
import tableNames from '../../constants/tableNames';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));

  // Inserts seed entries
  const password = 'password';
  const salt = await bcrypt.genSalt(12);

  const user = {
    username: 'test',
    password: await bcrypt.hash(password, salt)
  };

  await knex(tableNames.user).insert(user);
  console.log('User created:', {
    password
  });
}
