import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ApplicationDocument', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('applicationId').unsigned().notNullable().references('id').inTable('JobApplication');
    table.integer('documentId').unsigned().notNullable().references('id').inTable('Document');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ApplicationDocument');
}
