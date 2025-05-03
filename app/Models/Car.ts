import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public image: string

  @column()
  public marque: string

  @column()
  public modele: string

  @column()
  public annee: number

  @column()
  public gamme: 'Economique' | 'Moyenne gamme' | 'Haut de gamme'

  @column()
  public prix_journalier: number

  @column()
  public type_vehicule:
    | 'Citadine'
    | 'Berline'
    | 'SUV & 4x4'
    | 'Vans & Minibus'
    | 'Voitures de Luxe'
    | 'Utilitaire'

  @column()
  public energie: 'Essence' | 'Hybride' | 'Electrique'

  @column()
  public boite_auto: boolean

  @column()
  public climatisation: boolean

  @column()
  public gps: boolean

  @column()
  public wifi: boolean

  @column()
  public siege_bebe: boolean

  @column()
  public chauffeur: boolean

  @column()
  public longue_duree: boolean

  @column()
  public mariage_event: boolean

  @column()
  public marchandises: boolean

  @column()
  public places: number

  @column()
  public statut: 'Disponible' | 'Indisponible'

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
