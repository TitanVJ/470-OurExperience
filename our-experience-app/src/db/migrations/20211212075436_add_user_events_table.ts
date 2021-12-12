import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('UserEvents', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('userId').unsigned().notNullable().references('id').inTable('User');
    table.integer('eventId').unsigned().notNullable().references('id').inTable('Event');
    table.timestamp('registeredAt').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('UserEvents');
}
