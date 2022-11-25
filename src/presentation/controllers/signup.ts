import { AddAccount } from '../../domain/use-case/add-account'
import { badRequest, created } from '../helpers/http-helpers'
import { Validation } from '../helpers/validators/validation'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  private readonly validation: Validation
  private readonly addAccount: AddAccount

  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) return badRequest(error)

    const { name, email, password } = httpRequest.body

    const newAccount = await this.addAccount.add({ name, email, password })
    return created(newAccount)
  }
}
