import { AddCommonUser } from '@domain/usecases/AddCommonUser'
import { AddUser } from './DbAddUser'
import {
  AddUserRepository,
  Encryptor,
  FindUserRepository,
  IdGenerator,
  UserModel
} from './interfaces'

class AddUserTestBuilder {
  private readonly userParams: AddCommonUser.Params
  private readonly addUserRepository: AddUserRepository
  private findUserRepository: FindUserRepository
  private readonly hash: Encryptor
  private readonly idGenerator: IdGenerator

  constructor () {
    this.userParams = {
      avatar: 'http://',
      email: 'test@example.com',
      name: 'test',
      password: 'password'
    }

    class AddUserRepositoryStub implements AddUserRepository {
      async add (userModel: UserModel): Promise<Omit<UserModel, 'password'>> {
        const { password, ...rest } = { ...userModel }

        return await Promise.resolve(rest)
      }
    }

    class FindUserRepositoryStub implements FindUserRepository {
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

    this.addUserRepository = new AddUserRepositoryStub()
    this.findUserRepository = new FindUserRepositoryStub()
    this.hash = new EncryptorStub()
    this.idGenerator = new IdGeneratorStub()
  }

  static init (): AddUserTestBuilder {
    return new AddUserTestBuilder()
  }

  withExistentUser (): AddUserTestBuilder {
    class FindUserRepositoryStub implements FindUserRepository {
      async findByEmail (_email: string): Promise<UserModel | null> {
        return await Promise.resolve({
          id: 'any-uuid',
          password: 'any-password',
          avatar: 'http://',
          email: 'test@example.com',
          name: 'test'
        })
      }
    }

    this.findUserRepository = new FindUserRepositoryStub()

    return this
  }

  async build (): Promise<AddCommonUser.Result> {
    const sut = new AddUser(
      this.addUserRepository,
      this.findUserRepository,
      this.hash,
      this.idGenerator
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
    }
  `)
})

test('should return existent user', async () => {
  const sut = await AddUserTestBuilder.init().withExistentUser().build()

  expect(sut).toMatchInlineSnapshot(`
    Object {
      "avatar": "http://",
      "email": "test@example.com",
      "id": "any-uuid",
      "name": "test",
      "password": "any-password",
    }
  `)
})
