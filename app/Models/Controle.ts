import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Controle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_collecteur: number

  @column()
  public id_client: number

  @column()
  public id_carnet: number

  @column()
  public nom_client: string

  @column()
  public nom_collecteur: string

  @column()
  public nom_carnet: string

  @column()
  public id_mois: number

  @column()
  public nbr_jours: number

  @column()
  public mise: number

  @column()
  public cotisation_total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
