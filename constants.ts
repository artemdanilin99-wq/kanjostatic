
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ХУДИ KANJO RACER',
    category: 'Верхняя одежда',
    price: 85,
    image: 'https://picsum.photos/seed/hoodie1/800/1000',
    hoverImage: 'https://picsum.photos/seed/hoodie2/800/1000',
    description: 'Создано для ночных заездов. Плотный хлопок с рефлективными вставками, вдохновленными гонщиками Osaka Loop.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Полночный черный', 'Неоновый циан'],
    tags: ['Oversized', 'Рефлектив']
  },
  {
    id: '2',
    name: 'ФУТБОЛКА STATIC LOGO',
    category: 'Футболки',
    price: 45,
    image: 'https://picsum.photos/seed/tee1/800/1000',
    hoverImage: 'https://picsum.photos/seed/tee2/800/1000',
    description: 'Базовая экипировка. Фирменный глитч-логотип KANJO STATIC на груди.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Угольный', 'Белый'],
    tags: ['Basic', 'High-Density Print']
  },
  {
    id: '3',
    name: 'ДЖОГГЕРЫ CIRCUIT',
    category: 'Брюки',
    price: 75,
    image: 'https://picsum.photos/seed/pants1/800/1000',
    hoverImage: 'https://picsum.photos/seed/pants2/800/1000',
    description: 'Технологичные джоггеры для полной свободы движений. Зауженный крой и усиленные швы.',
    sizes: ['30', '32', '34', '36'],
    colors: ['Обсидиан'],
    tags: ['Techwear', 'Cargo']
  },
  {
    id: '4',
    name: 'КУРТКА NEON DRIFT',
    category: 'Верхняя одежда',
    price: 120,
    image: 'https://picsum.photos/seed/jacket1/800/1000',
    hoverImage: 'https://picsum.photos/seed/jacket2/800/1000',
    description: 'Ультимативная оболочка гонщика. Влагозащитная и ветронепроницаемая, с неоновым кантом, светящимся в огнях города.',
    sizes: ['M', 'L', 'XL'],
    colors: ['Глитч пинк', 'Кибер блю'],
    tags: ['Weatherproof', 'Neon']
  },
  {
    id: '5',
    name: 'КЕПКА NIGHT RUN',
    category: 'Аксессуары',
    price: 30,
    image: 'https://picsum.photos/seed/cap1/800/1000',
    hoverImage: 'https://picsum.photos/seed/cap2/800/1000',
    description: 'Низкопрофильная кепка с вышивкой кандзи. Сохраняй анонимность во время скоростных заездов.',
    sizes: ['One Size'],
    colors: ['Черный'],
    tags: ['Headwear']
  },
  {
    id: '6',
    name: 'ЛОНГСЛИВ OSAKA LOOP',
    category: 'Футболки',
    price: 55,
    image: 'https://picsum.photos/seed/ls1/800/1000',
    hoverImage: 'https://picsum.photos/seed/ls2/800/1000',
    description: 'Джерси с длинным рукавом, отдающее дань уважения легендам уличных гонок 2000-х.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Матовый черный'],
    tags: ['Graphic', 'Retro']
  }
];
