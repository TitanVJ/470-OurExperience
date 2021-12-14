import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('Document', (table: Knex.AlterTableBuilder) => {
    table.boolean('isDeleted').defaultTo(false);
    table.text('filename').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('Document', (table: Knex.AlterTableBuilder) => {
    table.dropColumn('isDeleted');
    table.dropColumn('filename');
  });
}
