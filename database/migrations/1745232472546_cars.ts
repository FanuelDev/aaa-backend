import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cars'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('marque')
      table.string('modele')
      table.integer('annee')
      table.string('gamme') // économique, moyenne gamme, haut de gamme
      table.integer('prix_journalier') // en XOF

      table.string('type_vehicule') // citadine, SUV, etc.
      table.string('energie') // Essence, hybride, électrique
      table.boolean('chauffeur').defaultTo(false)
      table.boolean('longue_duree').defaultTo(false)
      table.boolean('mariage_event').defaultTo(false)
      table.boolean('marchandises').defaultTo(false)

      table.boolean('boite_auto').defaultTo(false)
      table.boolean('climatisation').defaultTo(false)
      table.integer('places').defaultTo(4)
      table.boolean('gps').defaultTo(false)
      table.boolean('wifi').defaultTo(false)
      table.boolean('siege_bebe').defaultTo(false)

      table.string('image').nullable()
      table.string('statut').defaultTo('Disponible') // ou "Indisponible"

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
