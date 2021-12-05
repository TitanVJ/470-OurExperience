import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Document', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer('userId').unsigned().notNullable().references('id').inTable('User');
    table.text('filepath').notNullable();
    table.text('mimeType').notNullable();
    table.enum('documentType', ['resume', 'cover-letter', 'transcript', 'sis']).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Document');
}
