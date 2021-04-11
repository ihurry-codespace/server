import { addAliases } from 'module-alias'
import { resolve } from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const BASE_URL = process.env.NODE_ENV === 'production' ? './dist/src' : './src'

addAliases({
  '@domain': resolve(`${BASE_URL}/domain`),
  '@presentation': resolve(`${BASE_URL}/presentation`),
  '@infra': resolve(`${BASE_URL}/infra`),
  '@data': resolve(`${BASE_URL}/data`),
  '@main': resolve(`${BASE_URL}/main`),
  '@utils': resolve(`${BASE_URL}/utils`)
})
