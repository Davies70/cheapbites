interface Category {
  name: string;
  image: string;
  subcategories?: { name: string }[];
}

export const categories: Category[] = [
  {
    name: 'Bagel Shop',
    image: '/bagel.jpeg',
  },
  {
    name: 'Bakery',
    image: '/bakery.jpg',
  },
  {
    name: 'Bar',
    image: '/bar.jpg',
  },
  { name: 'Breakfast Spot', image: '/breakfast.jpeg' },
  { name: 'Brewery', image: '/brewery.jpeg' },
  {
    name: 'Cafe, Coffee, and Tea House',
    image: '/coffee.jpg',
  },
  { name: 'Cafeteria', image: '/cafeteria.jpg' },
  { name: 'Cidery', image: '/cidery.jpg' },
  { name: 'Creperie', image: '/crepery.png' },
  {
    name: 'Dessert Shop',
    image: '/dessert.jpg',
    subcategories: [
      { name: 'Cupcake Shop' },
      { name: 'Frozen Yogurt Shop' },
      { name: 'Gelato Shop' },
      { name: 'Ice Cream Parlor' },
      { name: 'Pastry Shop' },
      { name: 'Pie Shop' },
      { name: 'Waffle Shop' },
    ],
  },
  { name: 'Distillery', image: '/distillery.jfif' },
  { name: 'Donut Shop', image: '/donut.jpg' },
  { name: 'Food Court', image: '/food-court.jpg' },
  { name: 'Food Stand', image: '/food-stand.jpg' },
  { name: 'Food Truck', image: '/food-truck.jpg' },
  { name: 'Juice Bar', image: '/juice-bar.jpg' },
  { name: 'Meadery', image: '/meadery.jpg' },
  { name: 'Night Market', image: '/night-market.jpg' },
  {
    name: 'Restaurant',
    image: '/restaurant.jpg',
  },
];
