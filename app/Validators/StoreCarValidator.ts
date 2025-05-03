import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreCarValidator {
  constructor(protected ctx: HttpContextContract) { }

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
    marque: schema.string({}, [rules.maxLength(50)]),
    modele: schema.string({}, [rules.maxLength(50)]),
    annee: schema.number([rules.range(1990, new Date().getFullYear())]),
    gamme: schema.enum(['Economique', 'Moyenne gamme', 'Haut de gamme'] as const),
    prix_journalier: schema.number(),

    type_vehicule: schema.enum([
      'Citadine', 'Berline', 'SUV', '4x4', 'Van', 'Minibus', 'Luxe', 'Utilitaire'
    ] as const),

    energie: schema.enum(['Essence', 'Hybride', 'Electrique'] as const),

    chauffeur: schema.boolean(),
    longue_duree: schema.boolean(),
    mariage_event: schema.boolean(),
    marchandises: schema.boolean(),

    boite_auto: schema.boolean(),
    climatisation: schema.boolean(),
    places: schema.number(),
    gps: schema.boolean(),
    wifi: schema.boolean(),
    siege_bebe: schema.boolean(),

    image: schema.file({
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
      size: '2mb'
    }),

    statut: schema.enum(['Disponible', 'Indisponible'] as const),
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
    required: 'Le champ {{ field }} est obligatoire',
    'image.extname': 'Format d’image invalide (jpg, png, jpeg, webp)',
    'image.size': 'Image trop lourde (max 2MB)',
  }
}
