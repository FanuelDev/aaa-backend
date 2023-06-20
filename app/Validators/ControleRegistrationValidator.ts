import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ControleRegistrationValidator {
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
    id_collecteur: schema.number([rules.required()]),
    id_client: schema.number([rules.required()]),
    id_carnet: schema.number([rules.required()]),
    nom_collecteur: schema.string({}, [rules.required()]),
    nom_client: schema.string({}, [rules.required()]),
    nom_carnet: schema.string({}, [rules.required()]),
    id_mois: schema.number([rules.required()]),
    nbr_jours: schema.number([rules.required()]),
    mise: schema.number([rules.required()]),
    cotisation_total: schema.number([rules.required()]),
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
    'id_collecteur.required': 'The id_collecteur is required',
    'id_client.required': 'The id_client is required',
    'nom_collecteur.required': 'The nom_collecteur is required',
    'nom_client.required': 'The nom_client is required',
    'id_mois.required': 'The id_mois is required',
    'nbr_jours.required': 'The nbr_jours is required',
    'mise.required': 'The mise is required',
    'cotisation_total.required': 'The cotisation_total is required',
  }
}
