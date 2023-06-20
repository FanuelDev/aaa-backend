import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ResponseBody extends BaseModel {
  @column()
  public status: boolean

  @column()
  public data: any

  @column()
  public message: string

  // public async generateResponse(responseBody: ResponseBody) {
  //   return responseBody
  // }
}
