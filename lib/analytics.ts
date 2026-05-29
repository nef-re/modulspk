/** ID счётчика Яндекс.Метрики */
export const YM_COUNTER_ID = Number(process.env.NEXT_PUBLIC_YM_ID ?? '109483081')

export function isYmEnabled(): boolean {
  return Number.isFinite(YM_COUNTER_ID) && YM_COUNTER_ID > 0
}
