import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('UserEvent', (table: Knex.AlterTableBuilder) => {
    table.unique(['userId', 'eventId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('UserEvent', (table: Knex.AlterTableBuilder) => {
    table.dropUnique(['userId', 'eventId']);
  });
}
