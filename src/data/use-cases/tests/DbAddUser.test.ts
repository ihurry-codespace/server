import { AddCommonUser } from '@domain/usecases/AddCommonUser'
import { AuthToken } from '@domain/usecases/AuthToken'
import { DbAddUser } from '../DbAddUser'
import {
  AddUserRepository,
  Encryptor,
  FindUserByEmailRepository,
  IdGenerator,
  UserModel
} from '../interfaces'

class AddUserTestBuilder {
  private readonly userParams: AddCommonUser.Params
  private readonly addUserRepository: AddUserRepository
  private findUserRepository: FindUserByEmailRepository
  private readonly hash: Encryptor
  private readonly idGenerator: IdGenerator
  private readonly tokenGenerator: AuthToken

  constructor () {
    this.userParams = {
      avatar: 'http://',
      email: 'test@example.com',
      name: 'test',
      password: 'password'
    }

    class AddUserRepositoryStub implements AddUserRepository {
      async add (userModel: AddUserRepository.Params): AddUserRepository.Result {
        const { password, ...rest } = { ...userModel }

        return await Promise.resolve(rest)
      }
    }

    class FindUserRepositoryStub implements FindUserByEmailRepository {
      async findByEmail (_email: string): Promise<UserModel | null> {
        return null
      }
    }

    class EncryptorStub implements Encryptor {
      async encrypt (value: string): Promise<string> {
        return `${value}-encrypted`
      }
    }

    class IdGeneratorStub implements IdGenerator {
      uuid (): string {
        return 'any-uuid-value'
      }
    }
    class TokenGeneratorStub implements AuthToken {
      async generate (_user: AuthToken.Params): Promise<AuthToken.Result> {
        const token = await Promise.resolve('any-token')
        return { token }
      }
    }
    this.tokenGenerator = new TokenGeneratorStub()
    this.addUserRepository = new AddUserRepositoryStub()
    this.findUserRepository = new FindUserRepositoryStub()
    this.hash = new EncryptorStub()
    this.idGenerator = new IdGeneratorStub()
  }

  static init (): AddUserTestBuilder {
    return new AddUserTestBuilder()
  }

  withExistentUser (): AddUserTestBuilder {
    class FindUserRepositoryStub implements FindUserByEmailRepository {
      async findByEmail (_email: string): Promise<UserModel | null> {
        return await Promise.resolve({
          id: 'any-uuid',
          password: 'any-password',
          avatar: 'http://',
          email: 'test@example.com',
          name: 'test',
          created_at: new Date(),
          updated_at: new Date()
        })
      }
    }

    this.findUserRepository = new FindUserRepositoryStub()

    return this
  }

  async build (): Promise<AddCommonUser.Result> {
    const sut = new DbAddUser(
      this.addUserRepository,
      this.findUserRepository,
      this.hash,
      this.idGenerator,
      this.tokenGenerator
    )

    return await sut.add(this.userParams)
  }
}

test('should save a user on repository', async () => {
  const sut = await AddUserTestBuilder.init().build()

  expect(sut).toMatchInlineSnapshot(`
    Object {
      "avatar": "http://",
      "email": "test@example.com",
      "id": "any-uuid-value",
      "name": "test",
      "token": "any-token",
    }
  `)
})

test('should return existent user', async () => {
  await expect(
    AddUserTestBuilder.init().withExistentUser().build()
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '"There is already a user registered with this email"'
  )
})
