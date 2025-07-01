import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Car from './Car'

export enum StatutReservation {
  EN_ATTENTE = 'en_attente',
  VALIDEE = 'validee',
  ANNULEE = 'annulee',
}


export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  
  @column()
  public carId: number

  @column()
  public userId: number

  @column.dateTime()
  public startDate: DateTime

  @column.dateTime()
  public endDate: DateTime

  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Car, { foreignKey: 'carId' }) // Si modèle nommé Vehicle
  public car: BelongsTo<typeof Car>

  @column()
  public statut: StatutReservation

  @column()
  public prix_total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
