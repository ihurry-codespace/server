/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { AddCommonUser } from '@domain/usecases/AddCommonUser'
import { EmailValidator } from '@infra/interfaces/EmailValidator'
import {
  InvalidParameterError,
  MissingParameterError,
  ServerError
} from '@presentation/errors'
import { HttpRequest, HttpResponse } from '@presentation/interfaces/http'
import { SignupUser, SignupUserController } from '../SignupUserController'

class SignupTestBuilder {
  private readonly addUserServiceStub: AddCommonUser
  private emailValidatorStub: EmailValidator
  private readonly httpRequestMock: HttpRequest<SignupUser.Params>

  constructor () {
    class EmailValidatorStub implements EmailValidator {
      validate (_value?: string): boolean {
        return true
      }
    }

    class AddUserServiceStub implements AddCommonUser {
      async add (user: AddCommonUser.Params): Promise<AddCommonUser.Result> {
        const { password, ...rest } = user
        return await Promise.resolve({
          id: 'any-generated-uuid',
          token: 'any-token',
          ...rest
        })
      }
    }

    this.emailValidatorStub = new EmailValidatorStub()
    this.addUserServiceStub = new AddUserServiceStub()
    this.httpRequestMock = {
      body: {
        avatar: 'http://',
        email: 'test@example.com',
        password: 'password',
        name: 'any name'
      }
    }
  }

  static init (): SignupTestBuilder {
    return new SignupTestBuilder()
  }

  removeParam (value: keyof SignupUser.Params): SignupTestBuilder {
    const obj = this.httpRequestMock?.body ?? {}

    delete obj[value]

    return this
  }

  whenEmailIsInvalid (): SignupTestBuilder {
    class EmailValidatorStub implements EmailValidator {
      validate (_value?: string): boolean {
        return false
      }
    }

    this.emailValidatorStub = new EmailValidatorStub()

    return this
  }

  whenEmailValidatorThrows (): SignupTestBuilder {
    class EmailValidatorStub implements EmailValidator {
      validate (_value?: string): boolean {
        throw new Error('any error')
      }
    }
    this.emailValidatorStub = new EmailValidatorStub()

    return this
  }

  async build (): Promise<HttpResponse> {
    return await new SignupUserController(
      this.addUserServiceStub,
      this.emailValidatorStub
    ).handle(this.httpRequestMock)
  }
}

test('should return 400 if name is not provided', async () => {
  const result = await SignupTestBuilder.init().removeParam('name').build()

  expect(result.statusCode).toBe(400)
  expect(result.body.message).toEqual(new MissingParameterError('name').message)
  expect(result.body.code).toEqual(new MissingParameterError('name').name)
  expect(result.body.stack).toBeTruthy()
})

test('should return 400 if password is not provided', async () => {
  const result = await SignupTestBuilder.init().removeParam('password').build()

  expect(result.statusCode).toBe(400)
  expect(result.body.message).toEqual(new MissingParameterError('password').message)
  expect(result.body.code).toEqual(new MissingParameterError('password').name)
  expect(result.body.stack).toBeTruthy()
})

test('should return 400 if email is not provided', async () => {
  const result = await SignupTestBuilder.init().removeParam('email').build()

  expect(result.statusCode).toBe(400)
  expect(result.body.message).toEqual(new MissingParameterError('email').message)
  expect(result.body.code).toEqual(new MissingParameterError('email').name)
  expect(result.body.stack).toBeTruthy()
})

test('should return 400 if avatar is not provided', async () => {
  const result = await SignupTestBuilder.init().removeParam('avatar').build()

  expect(result.statusCode).toBe(400)
  expect(result.body.message).toEqual(new MissingParameterError('avatar').message)
  expect(result.body.code).toEqual(new MissingParameterError('avatar').name)
  expect(result.body.stack).toBeTruthy()
})

test('should return 400 when email is invalid', async () => {
  const result = await SignupTestBuilder.init().whenEmailIsInvalid().build()

  expect(result.statusCode).toBe(400)
  expect(result.body.message).toEqual(new InvalidParameterError('email').message)
  expect(result.body.code).toEqual(new InvalidParameterError('email').name)
  expect(result.body.stack).toBeTruthy()
})

test('should return 500 when email throw any error', async () => {
  const result = await SignupTestBuilder.init()
    .whenEmailValidatorThrows()
    .build()

  expect(result.statusCode).toBe(500)
  const error = new Error('any message')
  expect(result.body.message).toEqual(new ServerError(error).message)
  expect(result.body.code).toEqual(new ServerError(error).name)
  expect(result.body.stack).toBeTruthy()
})

test('should return success when signup a user with generated ID and without password', async () => {
  const result = await SignupTestBuilder.init().build()

  expect(result.statusCode).toBe(200)
  expect(result.body.id).toBeTruthy()
  expect(result.body.password).toBeUndefined()
  expect(result.body).toMatchInlineSnapshot(`
    Object {
      "avatar": "http://",
      "email": "test@example.com",
      "id": "any-generated-uuid",
      "name": "any name",
      "token": "any-token",
    }
  `)
})
