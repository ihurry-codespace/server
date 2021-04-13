export interface I18nType {
  translate: (phrase: string, args?: any) => string
  translatePlurals: (phrase: string, count: number) => string
}
