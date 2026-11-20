/**
 * Прайс на работы для страницы /ceny.
 *
 * Данные — lib/prices.json, выгрузка из справочника EngCalc (цены продажи, с НДС, «от»):
 *   cd C:\folder\EngCalc\backend
 *   .venv\Scripts\python manage.py export_site_prices --out C:\folder\Modulspk\lib\prices.json
 * Руками JSON не править — изменения затрутся следующей выгрузкой.
 */
import data from './prices.json'

export type PriceItem = { name: string; unit: string; price: number }
export type PriceSection = { id: string; title: string; items: PriceItem[] }

export const priceList = data as { updated: string; vatRate: number; sections: PriceSection[] }

export function formatRub(value: number): string {
  return `${new Intl.NumberFormat('ru-RU').format(value).replace(/\u00a0|\s/g, '\u00a0')}\u00a0₽`
}

export function formatUpdated(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}
