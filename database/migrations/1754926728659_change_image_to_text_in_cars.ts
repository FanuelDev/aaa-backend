import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cars'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('image').alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('image').alter()
    })
  }
}
