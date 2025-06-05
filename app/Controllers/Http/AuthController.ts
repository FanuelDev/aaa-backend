import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

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
      await payload.piece_justificative.moveToDisk('pieces')
      piecePath = payload.piece_justificative.fileName ?? ''
    }

    if (payload.preuve_adresse) {
      await payload.preuve_adresse.moveToDisk('preuves')
      preuvePath = payload.preuve_adresse.fileName ?? ''
    }

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
      const user = auth.user!

      return response.ok({
        type: token.type,
        token: token.token,
        expires_at: token.expiresAt,
        info: {
          id: user.id,
          name: user.name,
          email: user.email,
          piece_justificative: user.pieceJustificative,
          preuve_adresse: user.preuveAdresse,
        },
      })
    } catch {
      return response.unauthorized({ error: 'Email ou mot de passe incorrect' })
    }
  }
}
