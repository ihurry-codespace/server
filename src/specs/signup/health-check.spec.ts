import app from '@main/config/app'

it('should return a pong', async () => {
  const response = await app.inject().get('/api/ping')

  expect(response.statusCode).toBe(200)
  expect(response.body).toMatchInlineSnapshot('"{\\"pong\\":true}"')
})
