import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import RegisterValidator from 'App/Validators/RegisterValidator'
import Application from '@ioc:Adonis/Core/Application'

export default class AuthController {

  public async index() {
    const user = await User.all()
    return user
  }


  public async register({ request, auth, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const { name, email, password } = payload

    let piecePath = ''
    let preuvePath = ''

    if (payload.piece_justificative) {
      const fileName = `${cuid()}.${payload.piece_justificative.extname}`
      await payload.piece_justificative.move(Application.tmpPath('uploads/piece'), {
        name: fileName,
        overwrite: true,
      })
      piecePath = `uploads/piece/${fileName}`;
    }

    if (payload.preuve_adresse) {
      const fileName = `${cuid()}.${payload.preuve_adresse.extname}`
      await payload.preuve_adresse.move(Application.tmpPath('uploads/adresse'), {
        name: fileName,
        overwrite: true,
      })
      preuvePath = `uploads/adresse/${fileName}`
    }

    console.log(piecePath)
    console.log(preuvePath)
    const user = await User.create({
      name,
      email,
      password,
      pieceJustificative: piecePath,
      preuveAdresse: preuvePath,
    })

    const token = await auth.use('api').login(user)

    return response.created({
      message: 'Inscription réussie',
      user,
      token,
    })
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      console.log(token)
      const user = auth.user!

      console.log(user)

      return response.ok({
        type: token.type,
        token: token.token,
        expires_at: token.expiresAt,
        info: {
          id: user.id,
          nom: user.name,
          email: user.email,
          piece_identite: user.pieceIdentite,
          justificatif_adresse: user.justificatifAdresse,
        },
      })
    } catch {
      return response.unauthorized({ error: 'Email ou mot de passe incorrect' })
    }
  }
}
