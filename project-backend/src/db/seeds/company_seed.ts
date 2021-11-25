import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  knex.raw('SET foreign_key_checks = 0;');
  await knex('Company').del();
  knex.raw('SET foreign_key_checks = 1;');

  // Inserts seed entries
  await knex('Company').insert([
    { id: 1, name: 'A Thinking Ape' },
    { id: 2, name: 'EA Games' },
    { id: 3, name: 'Microsoft' }
  ]);
}
