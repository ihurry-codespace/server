import { AuthUser } from '@domain/usecases/AuthUser'
import { HttpRequest, HttpResponse } from '@presentation/interfaces/http'
import { Login, LoginController } from './LoginController'

class LoginTestBuilder {
  private readonly authServiceStub: AuthUser
  private readonly httpRequestMock: HttpRequest<Login.Params>

  constructor () {
    class AuthServiceStub implements AuthUser {
      async login (): Promise<AuthUser.Result> {
        return await Promise.resolve({
          token: 'any-token-name'
        })
      }
    }
    this.authServiceStub = new AuthServiceStub()

    this.httpRequestMock = {
      body: {
        email: 'any-email@email.com',
        password: 'any-password'
      }
    }
  }

  static init (): LoginTestBuilder {
    return new LoginTestBuilder()
  }

  async build (): Promise<HttpResponse> {
    return await new LoginController(
      this.authServiceStub
    ).handle(this.httpRequestMock)
  }
}

test('should return 200 when user found', async () => {
  const sut = await LoginTestBuilder.init().build()

  expect(sut.statusCode).toBe(200)
  expect(sut.body).toEqual({ token: 'any-token-name' })
})
