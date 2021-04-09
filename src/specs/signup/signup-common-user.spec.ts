import { validate as uuidValidate } from 'uuid'

import app from '@main/config/app'
import { DatabaseTestUtils } from '../DatabaseTestUtils'

jest.setTimeout(20000)

beforeAll(async () => {
  await DatabaseTestUtils.connect()
})

afterAll(async () => {
  await DatabaseTestUtils.close()
})

afterEach(async () => {
  await DatabaseTestUtils.dropDatabase()
})

it('should return a correct payload', async () => {
  const response = await app.inject().post('/api/signup').body({
    name: 'Any name',
    email: 'any@email.com',
    password: 'any-password',
    avatar: 'http://any-url'
  })

  const { body } = JSON.parse(response.body)

  expect(response.statusCode).toBe(200)
  expect(uuidValidate(body.id)).toBe(true)
  expect(body.name).toBe('Any name')
  expect(body.email).toBe('any@email.com')
  expect(body.password).toBeUndefined()
})
