// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Mois from "App/Models/Mois"
import ResponseBody from "App/Models/ResponseBody"

export default class MoisController {
  public async list({ response }) {
    const controle = await Mois.all()

    /// generation de response
    const responseBody = new ResponseBody
    responseBody.status = true
    responseBody.data = controle
    responseBody.message = 'Liste des mois'
    return response.accepted(responseBody)
  }

  public async listById({ request, response }) {
      try {
          const controle = await Mois.findOrFail(request.params().id)
          return response.accepted({ status: true, data: controle, message: 'controle par id' })
      } catch {
          return response.accepted({ status: false, message: 'erreur! id nom trouvez' })
      }
  }
}
