import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CalculateTotalValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    carId: schema.number([rules.exists({ table: 'cars', column: 'id' })]),
    startDate: schema.date(),
    endDate: schema.date(),

    chauffeur: schema.boolean.optional(),
    gps: schema.boolean.optional(),
    wifi: schema.boolean.optional(),
    siegeBebe: schema.boolean.optional(),
    climatisation: schema.boolean.optional(),
    boiteAuto: schema.boolean.optional(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'carId.required': 'Le véhicule est requis',
    'carId.number': 'L\'ID du véhicule doit être un nombre',
    'carId.exists': 'Le véhicule sélectionné est introuvable',
    'startDate.required': 'La date de début est requise',
    'endDate.required': 'La date de fin est requise',
    'startDate.date': 'La date de début doit être valide',
    'endDate.date': 'La date de fin doit être valide',
  }
}
