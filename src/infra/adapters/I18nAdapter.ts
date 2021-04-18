import { FastifyRequest } from 'fastify'
import * as I18n from 'i18n'
import path from 'path'

const localePath = path.join(__dirname, '../', 'locales')

I18n.configure({
  locales: ['en', 'el'],
  defaultLocale: 'en',
  queryParameter: 'lang',
  directory: localePath
})

export class I18nAdapter {
  private static instance: I18nAdapter

  private readonly i18nProvider = I18n

  private constructor () { }

  public static i18n (): I18nAdapter {
    if (!I18nAdapter.instance) {
      I18nAdapter.instance = new I18nAdapter()
    }

    return I18nAdapter.instance
  }

  getCurrentLocale (): string {
    return this.i18nProvider.getLocale()
  }

  getLocales (): string[] {
    return this.i18nProvider.getLocales()
  }

  findAndSetLocale (request: FastifyRequest): I18nAdapter {
    const lang = (request.query as { lang: string })?.lang
    const locale = lang || request.headers['accept-language']

    locale && this.setLocale(locale)

    return this
  }

  setLocale (locale: string): I18nAdapter {
    if (this.getLocales().includes(locale)) {
      this.i18nProvider.setLocale(locale)
    }

    return this
  }

  translate (phrase: string, ...replace: string[]): string {
    return this.i18nProvider.__(phrase, ...replace)
  }

  translatePlurals (phrase: string, count: number): string {
    return this.i18nProvider.__n(phrase, count)
  }
}
