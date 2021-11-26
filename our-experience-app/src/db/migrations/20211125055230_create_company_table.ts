import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Company', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('name', 100).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Company');
}
