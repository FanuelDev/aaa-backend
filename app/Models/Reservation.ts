import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  @column()
  public chauffeur: boolean

  @column()
  public gps: boolean

  @column()
  public wifi: boolean

  @column()
  public siegeBebe: boolean

  @column()
  public climatisation: boolean

  @column()
  public boiteAuto: boolean

  @column()
  public statut: StatutReservation

  @column()
  public total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
