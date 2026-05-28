export const company = {
  name: 'ООО «Модуль»',
  shortName: 'Модуль',
  slogan: 'Элемент хорошей жизни',
  city: 'Томск',
  domain: 'modulspk.ru',
  siteUrl: 'https://modulspk.ru',
  tagline: 'Вентиляция и электрика под ключ',
  phone: '+7-913-882-70-03',
  phoneHref: 'tel:+79138827003',
  phone2: '+7-983-233-97-11',
  phone2Href: 'tel:+79832339711',
  email: 'tsk.modul@mail.ru',
  emailHref: 'mailto:tsk.modul@mail.ru',
  address: '634507, г. Томск, п. Предтеченск, ул. Мелиоративная, д. 7',
  addressShort: 'г. Томск, п. Предтеченск, ул. Мелиоративная, 7',
  hours: 'Пн–Пт: 9:00–18:00',
  inn: '7017089218',
  kpp: '701701001',
  ogrn: '1047000094184',
  okpo: '71729609',
  /** Иконка звонка для шапки и контактов */
  phoneIconSrc: '/phone-icon.png',
  /** Координаты для карты 2ГИС (ул. Мелиоративная, 7, п. Предтеченск) */
  mapLat: 56.414629,
  mapLon: 85.043299,
  mapZoom: 15,
  map2gisUrl:
    'https://2gis.ru/tomsk/search/%D0%9C%D0%B5%D0%BB%D0%B8%D0%BE%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B0%D1%8F%207%20%D0%9F%D1%80%D0%B5%D0%B4%D1%82%D0%B5%D1%87%D0%B5%D0%BD%D1%81%D0%BA',
} as const

export type MessengerChannel = {
  id: 'max' | 'telegram'
  label: string
  phone: string
  phoneE164: string
  href: string
  logoSrc: string
}

/** MAX — основной мессенджер для связи на сайте. */
export const maxMessenger: MessengerChannel = {
  id: 'max',
  label: 'MAX',
  phone: '+7 (983) 233-97-11',
  phoneE164: '+79832339711',
  href: 'https://max.ru/u/f9LHodD0cOIILEHFwLEOScglviCE9oQ-xzHFv2LNiXWMBwb_5tK53UsGDcc',
  logoSrc: '/max-messenger.png',
}

/**
 * Telegram — быстрое подключение: поставьте `enabled: true` —
 * логотип снова появится рядом с MAX (нужен `/public/telegram-messenger.svg`).
 */
export const telegramMessenger = {
  enabled: false,
  id: 'telegram' as const,
  label: 'Telegram',
  phone: '+7 (913) 882-70-03',
  phoneE164: '+79138827003',
  href: 'https://t.me/+79138827003',
  logoSrc: '/telegram-messenger.svg',
}

export function getActiveMessengers(): MessengerChannel[] {
  const list: MessengerChannel[] = [maxMessenger]
  if (telegramMessenger.enabled) {
    list.push({
      id: telegramMessenger.id,
      label: telegramMessenger.label,
      phone: telegramMessenger.phone,
      phoneE164: telegramMessenger.phoneE164,
      href: telegramMessenger.href,
      logoSrc: telegramMessenger.logoSrc,
    })
  }
  return list
}

export const estimateCta = {
  href: '/kontakty#zayavka',
  label: 'Рассчитать смету',
} as const

/** Базовая семантика для метаданных Яндекс/Google. */
export const seo = {
  defaultKeywords: [
    'вентиляция Томск',
    'монтаж вентиляции Томск',
    'проектирование вентиляции Томск',
    'пусконаладка вентиляции',
    'электромонтажные работы Томск',
    'проектирование электрики Томск',
    'вентиляционное оборудование производство',
    'СМР ПНР Томск',
    'инженерные системы под ключ',
    'ООО Модуль Томск',
  ],
} as const

export const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/proektirovanie', label: 'Проектирование' },
  { href: '/smr', label: 'СМР' },
  { href: '/proizvodstvo', label: 'Производство' },
  { href: '/o-kompanii', label: 'О компании' },
  { href: '/kontakty', label: 'Контакты' },
] as const

export type CubeFace = {
  id: string
  title: string
  subtitle: string
  gradient: string
  icon: string
  link: string
  rotation: { x: number; y: number }
}

/** Порядок граней куба: проектирование, СМР, ПНР, производство, вентиляция, электрика */
export const cubeFaces: CubeFace[] = [
  {
    id: 'design',
    title: 'Проектирование',
    subtitle: 'ОВ, ЭОМ, ЭС — проектная и рабочая документация',
    gradient: 'linear-gradient(160deg, #0052cc 0%, #2684ff 100%)',
    icon: 'design',
    link: '/proektirovanie',
    rotation: { x: -16, y: 0 },
  },
  {
    id: 'smr',
    title: 'СМР',
    subtitle: 'Монтаж систем вентиляции и электрики на объекте под ключ',
    gradient: 'linear-gradient(160deg, #003d99 0%, #1a6fd4 100%)',
    icon: 'smr',
    link: '/smr',
    rotation: { x: 28, y: 108 },
  },
  {
    id: 'pnr',
    title: 'ПНР',
    subtitle: 'Пусконаладка и ввод в эксплуатацию',
    gradient: 'linear-gradient(160deg, #0047b3 0%, #4c9aff 100%)',
    icon: 'pnr',
    link: '/smr',
    rotation: { x: -58, y: 108 },
  },
  {
    id: 'prod',
    title: 'Производство',
    subtitle: 'Вентиляционное оборудование собственного изготовления',
    gradient: 'linear-gradient(160deg, #002d73 0%, #0065ff 100%)',
    icon: 'production',
    link: '/proizvodstvo',
    rotation: { x: -16, y: 216 },
  },
  {
    id: 'vent',
    title: 'Вентиляция',
    subtitle: 'Приточно-вытяжные системы и кондиционирование',
    gradient: 'linear-gradient(160deg, #0065ff 0%, #69b1ff 100%)',
    icon: 'ventilation',
    link: '/ventilyaciya',
    rotation: { x: -16, y: 72 },
  },
  {
    id: 'elec',
    title: 'Электрика',
    subtitle: 'Электроснабжение, освещение, щитовое оборудование',
    gradient: 'linear-gradient(160deg, #001f4d 0%, #3385ff 100%)',
    icon: 'electrics',
    link: '/elektrika',
    rotation: { x: -16, y: -72 },
  },
]

export const services = [
  {
    id: 'design',
    title: 'Проектирование',
    desc: 'Разработка проектной и рабочей документации ОВ, ЭОМ, ЭС с учётом норм и требований заказчика.',
    icon: 'design',
    link: '/proektirovanie',
    accent: 'from-[#0052cc] to-[#4c9aff]',
  },
  {
    id: 'smr',
    title: 'СМР',
    desc: 'Строительно-монтажные работы: воздуховоды, оборудование систем вентиляции, электрооборудование, кабельные линии.',
    icon: 'smr',
    link: '/smr',
    accent: 'from-[#003d99] to-[#2684ff]',
  },
  {
    id: 'pnr',
    title: 'ПНР',
    desc: 'Пусконаладочные работы, подготовка паспортов, протоколов, исполнительной документации. Сдача объекта.',
    icon: 'pnr',
    link: '/smr',
    accent: 'from-[#0047b3] to-[#69b1ff]',
  },
  {
    id: 'prod',
    title: 'Производство',
    desc: 'Изготовление вентиляционного оборудования на собственных мощностях в Томске.',
    icon: 'production',
    link: '/proizvodstvo',
    accent: 'from-[#002d73] to-[#0065ff]',
  },
  {
    id: 'vent',
    title: 'Вентиляция',
    desc: 'Приточно-вытяжные системы, кондиционирование, дымоудаление, автоматика.',
    icon: 'ventilation',
    link: '/ventilyaciya',
    accent: 'from-[#0065ff] to-[#8cc0ff]',
  },
  {
    id: 'elec',
    title: 'Электрика',
    desc: 'Электроснабжение, электроосвещение.',
    icon: 'electrics',
    link: '/elektrika',
    accent: 'from-[#001f4d] to-[#4c9aff]',
  },
] as const

export const stats = [
  { value: 15, suffix: '+', label: 'лет на рынке' },
  { value: 200, suffix: '+', label: 'реализованных объектов' },
  { value: 40, suffix: '+', label: 'специалистов в штате' },
  { value: 100, suffix: '%', label: 'соблюдение сроков' },
] as const

export const advantages = [
  {
    title: 'Полный цикл',
    text: 'Проектирование, СМР, ПНР и производство — одна команда, единая ответственность.',
  },
  {
    title: 'Своё производство',
    text: 'Контроль качества и сроков изготовления вентиляционного оборудования.',
  },
  {
    title: 'Лицензии и СРО',
    text: 'Работаем в соответствии с требованиями нормативной документации.',
  },
  {
    title: 'Региональная экспертиза',
    text: 'Знаем климат Томска и особенности местного строительства.',
  },
] as const

export const projects = [
  { title: 'Бизнес-центр «Север»', type: 'Вентиляция и кондиционирование', area: '4 200 м²' },
  { title: 'Жилой комплекс «Речной»', type: 'Электромонтаж, ЩО', area: '12 000 м²' },
  { title: 'Производственный цех', type: 'Приточно-вытяжная вентиляция', area: '2 800 м²' },
  { title: 'Торговый центр', type: 'Проектирование и монтаж', area: '6 500 м²' },
] as const

export type SroMembership = {
  name: string
  shortName: string
  registryNumber: string
  scope: string
  site: string
  note: string
}

export const sroMemberships: SroMembership[] = [
  {
    name: 'Ассоциация «Томское проектное объединение»',
    shortName: 'Томское проектное объединение',
    registryNumber: 'СРО-П-023-10092009',
    scope: 'Саморегулируемая организация в области проектирования',
    site: 'https://tposro.ru/',
    note: 'Данные взяты с официального сайта объединения.',
  },
  {
    name: 'Саморегулируемая организация Ассоциация «Томские строители»',
    shortName: 'СРО «Томские строители»',
    registryNumber: 'СРО-С-032-31082009',
    scope: 'Саморегулируемая организация в области строительства',
    site: 'https://www.sro-npts.ru/',
    note: 'Данные взяты с официального сайта ассоциации.',
  },
]

export const processSteps = [
  { step: '01', title: 'Заявка и выезд', text: 'Обсуждаем задачу, выезжаем на объект, фиксируем требования.' },
  { step: '02', title: 'Проектирование', text: 'Разрабатываем решение, согласовываем смету и график работ.' },
  { step: '03', title: 'Производство и СМР', text: 'Изготавливаем оборудование, выполняем монтаж на объекте.' },
  { step: '04', title: 'ПНР и сдача', text: 'Пусконаладка, испытания, передача исполнительной документации.' },
] as const
