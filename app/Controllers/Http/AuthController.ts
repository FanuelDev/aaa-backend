// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import ResponseBody from 'App/Models/ResponseBody'
import User from "App/Models/User"
import UserRegistrationValidator from 'App/Validators/UserRegistrationValidator'

export default class AuthController {
  public async list({ response }) {
    const controle = await User.all()

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = controle
    responseBody.message = 'Liste des controler'
    return response.accepted(responseBody)
  }

  public async login({ auth, request, response }) {
    const email = request.body().email
    const password = request.body().password

    try {
      const user = await User
        .query()
        .where('email', email)
        .firstOrFail()

      // return user

      // Verify password
      if (!(await Hash.verify(user.password, password))) {
        return response.unauthorized('Invalid credentials')
      }

      const token = await auth.use('api').generate(user, {
        expiresIn: '7 days'
      })

      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = true
      responseBody.data = {token: token, infoUser: user}
      responseBody.message = 'Connexion effectuer avec success'
      return response.accepted(responseBody)
    } catch {
      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = false
      responseBody.data = {}
      responseBody.message = 'erreur lors de la connexion, compte inexistant'
      return response.accepted(responseBody)
    }
  }

  public async register({ request, response }) {
    const data = await request.validate(UserRegistrationValidator)

    console.log(data)
    if (data.errors && data.errors?.length != 0) {
      return data
    }

    const user = new User()
    user.name = request.body().name
    user.name_agence = request.body().name_agence
    user.email = request.body().email
    user.password = request.body().password
    user.role = request.body().role

    try {
      await user.save()

      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = true
      responseBody.data = user
      responseBody.message = 'Compte créé avec success'
      return response.accepted(responseBody)
    } catch {
      /// generation de response
      const responseBody = new ResponseBody()
      responseBody.status = false
      responseBody.data = user
      responseBody.message = 'erreur lors de l`\'enregistrement, email existe déjà'
      return response.accepted(responseBody)
    }
  }
}
