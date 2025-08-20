import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddIsDeleteToCars extends BaseSchema {
  public async up () {
    this.schema.alterTable('cars', (table) => {
      table.boolean('is_delete').defaultTo(false)
    })
  }

  public async down () {
    this.schema.alterTable('cars', (table) => {
      table.dropColumn('is_delete')
    })
  }
}
