import { FoursquareSearchResponse, PlacesResponse } from '@/types/places';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const data: FoursquareSearchResponse = {
    results: [
      {
        fsq_id: '4b9a3c32f964a52047a635e3',
        categories: [
          {
            id: 13383,
            name: 'Steakhouse',
            short_name: 'Steakhouse',
            plural_name: 'Steakhouses',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/steakhouse_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 773,
        geocodes: {
          drop_off: {
            latitude: 54.321859,
            longitude: 10.134842,
          },
          main: {
            latitude: 54.321737,
            longitude: 10.135006,
          },
          roof: {
            latitude: 54.321737,
            longitude: 10.135006,
          },
        },
        link: '/v3/places/4b9a3c32f964a52047a635e3',
        location: {
          address: 'Willestr. 4-6',
          country: 'DE',
          formatted_address: 'Willestr. 4-6, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Block House Kiel',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4b4a39e5f964a5209d7f26e3',
        categories: [
          {
            id: 13034,
            name: 'Café',
            short_name: 'Café',
            plural_name: 'Cafés',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/cafe_',
              suffix: '.png',
            },
          },
          {
            id: 13046,
            name: 'Ice Cream Parlor',
            short_name: 'Ice Cream',
            plural_name: 'Ice Cream Parlors',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/icecream_',
              suffix: '.png',
            },
          },
          {
            id: 13065,
            name: 'Restaurant',
            short_name: 'Restaurant',
            plural_name: 'Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'Unsure',
        distance: 316,
        geocodes: {
          main: {
            latitude: 54.317921,
            longitude: 10.132082,
          },
          roof: {
            latitude: 54.317921,
            longitude: 10.132082,
          },
        },
        link: '/v3/places/4b4a39e5f964a5209d7f26e3',
        location: {
          address: 'Sophienblatt 2',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Sophienblatt 2, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Giovanni L.',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4bd2c2ec77b29c749a548f82',
        categories: [
          {
            id: 13053,
            name: 'Food Stand',
            short_name: 'Food Stand',
            plural_name: 'Food Stands',
            icon: {
              prefix:
                'https://ss3.4sqi.net/img/categories_v2/travel/movingtarget_',
              suffix: '.png',
            },
          },
          {
            id: 17065,
            name: 'Farmers Market',
            short_name: 'Farmers Market',
            plural_name: 'Farmers Markets',
            icon: {
              prefix:
                'https://ss3.4sqi.net/img/categories_v2/shops/food_farmersmarket_',
              suffix: '.png',
            },
          },
          {
            id: 17069,
            name: 'Grocery Store',
            short_name: 'Grocery Store',
            plural_name: 'Grocery Stores',
            icon: {
              prefix:
                'https://ss3.4sqi.net/img/categories_v2/shops/food_grocery_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 737,
        geocodes: {
          drop_off: {
            latitude: 54.321297,
            longitude: 10.129187,
          },
          main: {
            latitude: 54.321404,
            longitude: 10.129035,
          },
        },
        link: '/v3/places/4bd2c2ec77b29c749a548f82',
        location: {
          country: 'DE',
          cross_street: 'Knooper Weg',
          formatted_address: 'Knooper Weg, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Wochenmarkt Auf Dem Exer',
        related_places: {
          children: [],
        },
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '613344255bb4517acd6b7cb3',
        categories: [
          {
            id: 13003,
            name: 'Bar',
            short_name: 'Bar',
            plural_name: 'Bars',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 897,
        geocodes: {
          main: {
            latitude: 54.322646,
            longitude: 10.136469,
          },
          roof: {
            latitude: 54.322646,
            longitude: 10.136469,
          },
        },
        link: '/v3/places/613344255bb4517acd6b7cb3',
        location: {
          address: 'Holstenbrücke 1',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Holstenbrücke 1, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Jan & Hein & Klaas & Pit',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4c3dc18015cb1b8d03547cdc',
        categories: [
          {
            id: 13003,
            name: 'Bar',
            short_name: 'Bar',
            plural_name: 'Bars',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 143,
        geocodes: {
          drop_off: {
            latitude: 54.315797,
            longitude: 10.133266,
          },
          main: {
            latitude: 54.316034,
            longitude: 10.133334,
          },
          roof: {
            latitude: 54.316034,
            longitude: 10.133334,
          },
        },
        link: '/v3/places/4c3dc18015cb1b8d03547cdc',
        location: {
          address: 'Raiffeisenstr. 2',
          country: 'DE',
          cross_street: 'Kaistr.',
          formatted_address: 'Raiffeisenstr. 2 (Kaistr.), 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Deck 8',
        related_places: {
          parent: {
            fsq_id: '4c1fdc8ab4e62d7f7848e093',
            categories: [
              {
                id: 19014,
                name: 'Hotel',
                short_name: 'Hotel',
                plural_name: 'Hotels',
                icon: {
                  prefix:
                    'https://ss3.4sqi.net/img/categories_v2/travel/hotel_',
                  suffix: '.png',
                },
              },
            ],
            name: 'ATLANTIC Hotel Kiel',
          },
        },
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '55e1c7d8498ed1bd5d139d27',
        categories: [
          {
            id: 13034,
            name: 'Café',
            short_name: 'Café',
            plural_name: 'Cafés',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/cafe_',
              suffix: '.png',
            },
          },
          {
            id: 13035,
            name: 'Coffee Shop',
            short_name: 'Coffee Shop',
            plural_name: 'Coffee Shops',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_',
              suffix: '.png',
            },
          },
          {
            id: 13065,
            name: 'Restaurant',
            short_name: 'Restaurant',
            plural_name: 'Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 962,
        geocodes: {
          drop_off: {
            latitude: 54.322866,
            longitude: 10.124906,
          },
          main: {
            latitude: 54.322691,
            longitude: 10.124855,
          },
          roof: {
            latitude: 54.322691,
            longitude: 10.124855,
          },
        },
        link: '/v3/places/55e1c7d8498ed1bd5d139d27',
        location: {
          address: 'Möllingstr. 11',
          country: 'DE',
          cross_street: 'Stiftstr',
          formatted_address: 'Möllingstr. 11 (Stiftstr), 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Bakeliet Kaffee',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4c1b2014eac020a1256844c2',
        categories: [
          {
            id: 13002,
            name: 'Bakery',
            short_name: 'Bakery',
            plural_name: 'Bakeries',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/bakery_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'LikelyOpen',
        distance: 2019,
        geocodes: {
          main: {
            latitude: 54.333082,
            longitude: 10.12886,
          },
          roof: {
            latitude: 54.333082,
            longitude: 10.12886,
          },
        },
        link: '/v3/places/4c1b2014eac020a1256844c2',
        location: {
          address: 'Knooper Weg 132',
          country: 'DE',
          cross_street: 'Schauenburgerstr.',
          formatted_address: 'Knooper Weg 132 (Schauenburgerstr.), 24105 Kiel',
          locality: 'Kiel',
          postcode: '24105',
          region: 'Schleswig-Holstein',
        },
        name: 'Bäckerei Lyck',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '5704178d498e65474f17b8b5',
        categories: [
          {
            id: 13064,
            name: 'Pizzeria',
            short_name: 'Pizza',
            plural_name: 'Pizzerias',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/pizza_',
              suffix: '.png',
            },
          },
          {
            id: 13236,
            name: 'Italian Restaurant',
            short_name: 'Italian',
            plural_name: 'Italian Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/italian_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 2138,
        geocodes: {
          drop_off: {
            latitude: 54.333402,
            longitude: 10.123207,
          },
          main: {
            latitude: 54.333565,
            longitude: 10.123307,
          },
          roof: {
            latitude: 54.333565,
            longitude: 10.123307,
          },
        },
        link: '/v3/places/5704178d498e65474f17b8b5',
        location: {
          address: 'Ahlmannstr. 24',
          country: 'DE',
          cross_street: 'Westring',
          formatted_address: 'Ahlmannstr. 24 (Westring), 24118 Kiel',
          locality: 'Kiel',
          postcode: '24118',
          region: 'Schleswig-Holstein',
        },
        name: 'Poi',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4b48f404f964a520285f26e3',
        categories: [
          {
            id: 13007,
            name: 'Beer Garden',
            short_name: 'Beer Garden',
            plural_name: 'Beer Gardens',
            icon: {
              prefix:
                'https://ss3.4sqi.net/img/categories_v2/nightlife/beergarden_',
              suffix: '.png',
            },
          },
          {
            id: 13165,
            name: 'German Restaurant',
            short_name: 'German',
            plural_name: 'German Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/german_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 3663,
        geocodes: {
          main: {
            latitude: 54.347644,
            longitude: 10.139861,
          },
        },
        link: '/v3/places/4b48f404f964a520285f26e3',
        location: {
          address: 'Düvelsbeker Weg 46',
          country: 'DE',
          formatted_address: 'Düvelsbeker Weg 46, 24105 Kiel',
          locality: 'Kiel',
          postcode: '24105',
          region: 'Schleswig-Holstein',
        },
        name: 'Forstbaumschule',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4bb8c80098c7ef3bf6643102',
        categories: [
          {
            id: 13065,
            name: 'Restaurant',
            short_name: 'Restaurant',
            plural_name: 'Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 11375,
        geocodes: {
          main: {
            latitude: 54.404077,
            longitude: 10.218559,
          },
          roof: {
            latitude: 54.404077,
            longitude: 10.218559,
          },
        },
        link: '/v3/places/4bb8c80098c7ef3bf6643102',
        location: {
          address: 'Hafenplatz 11',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Hafenplatz 11, 24235 Laboe',
          locality: 'Laboe',
          postcode: '24235',
          region: 'Schleswig-Holstein',
        },
        name: 'Ocean Eleven',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4c5a86036407d13a0fd2b428',
        categories: [
          {
            id: 13145,
            name: 'Fast Food Restaurant',
            short_name: 'Fast Food',
            plural_name: 'Fast Food Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/fastfood_',
              suffix: '.png',
            },
          },
          {
            id: 13302,
            name: 'Mediterranean Restaurant',
            short_name: 'Mediterranean',
            plural_name: 'Mediterranean Restaurants',
            icon: {
              prefix:
                'https://ss3.4sqi.net/img/categories_v2/food/mediterranean_',
              suffix: '.png',
            },
          },
          {
            id: 13309,
            name: 'Middle Eastern Restaurant',
            short_name: 'Middle Eastern',
            plural_name: 'Middle Eastern Restaurants',
            icon: {
              prefix:
                'https://ss3.4sqi.net/img/categories_v2/food/middleeastern_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 716,
        geocodes: {
          drop_off: {
            latitude: 54.316399,
            longitude: 10.121361,
          },
          main: {
            latitude: 54.316577,
            longitude: 10.121287,
          },
          roof: {
            latitude: 54.316577,
            longitude: 10.121287,
          },
        },
        link: '/v3/places/4c5a86036407d13a0fd2b428',
        location: {
          address: 'Kirchhofallee 54',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Kirchhofallee 54, 24114 Kiel',
          locality: 'Kiel',
          postcode: '24114',
          region: 'Schleswig-Holstein',
        },
        name: "Garip's Döner",
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4b4a3b80f964a520e37f26e3',
        categories: [
          {
            id: 13027,
            name: 'Bistro',
            short_name: 'Bistro',
            plural_name: 'Bistros',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
              suffix: '.png',
            },
          },
          {
            id: 13034,
            name: 'Café',
            short_name: 'Café',
            plural_name: 'Cafés',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/cafe_',
              suffix: '.png',
            },
          },
          {
            id: 13035,
            name: 'Coffee Shop',
            short_name: 'Coffee Shop',
            plural_name: 'Coffee Shops',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 604,
        geocodes: {
          drop_off: {
            latitude: 54.320203,
            longitude: 10.132807,
          },
          main: {
            latitude: 54.320431,
            longitude: 10.13291,
          },
          roof: {
            latitude: 54.320431,
            longitude: 10.13291,
          },
        },
        link: '/v3/places/4b4a3b80f964a520e37f26e3',
        location: {
          address: 'Europaplatz 3',
          country: 'DE',
          formatted_address: 'Europaplatz 3, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Campus Suite',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '55da2fe8498ea74703ed6f6d',
        categories: [
          {
            id: 13003,
            name: 'Bar',
            short_name: 'Bar',
            plural_name: 'Bars',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
              suffix: '.png',
            },
          },
          {
            id: 13352,
            name: 'Thai Restaurant',
            short_name: 'Thai',
            plural_name: 'Thai Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/thai_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 1592,
        geocodes: {
          drop_off: {
            latitude: 54.328391,
            longitude: 10.139566,
          },
          main: {
            latitude: 54.328626,
            longitude: 10.139634,
          },
          roof: {
            latitude: 54.328626,
            longitude: 10.139634,
          },
        },
        link: '/v3/places/55da2fe8498ea74703ed6f6d',
        location: {
          address: 'Brunswiker Str. 24',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Brunswiker Str. 24, 24105 Kiel',
          locality: 'Kiel',
          postcode: '24105',
          region: 'Schleswig-Holstein',
        },
        name: 'banmaai - Thai Kitchen & Bar',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4b48fde3f964a520126126e3',
        categories: [
          {
            id: 13068,
            name: 'American Restaurant',
            short_name: 'American',
            plural_name: 'American Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
              suffix: '.png',
            },
          },
          {
            id: 13303,
            name: 'Mexican Restaurant',
            short_name: 'Mexican',
            plural_name: 'Mexican Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/mexican_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 2333,
        geocodes: {
          drop_off: {
            latitude: 54.335968,
            longitude: 10.133413,
          },
          main: {
            latitude: 54.335991,
            longitude: 10.133118,
          },
          roof: {
            latitude: 54.335991,
            longitude: 10.133118,
          },
        },
        link: '/v3/places/4b48fde3f964a520126126e3',
        location: {
          address: 'Holtenauer Str. 93',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Holtenauer Str. 93, 24105 Kiel',
          locality: 'Kiel',
          postcode: '24105',
          region: 'Schleswig-Holstein',
        },
        name: 'Santa Fe',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4ff0787de4b02f36dbcec3be',
        categories: [
          {
            id: 13034,
            name: 'Café',
            short_name: 'Café',
            plural_name: 'Cafés',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/cafe_',
              suffix: '.png',
            },
          },
          {
            id: 13046,
            name: 'Ice Cream Parlor',
            short_name: 'Ice Cream',
            plural_name: 'Ice Cream Parlors',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/icecream_',
              suffix: '.png',
            },
          },
          {
            id: 13065,
            name: 'Restaurant',
            short_name: 'Restaurant',
            plural_name: 'Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 559,
        geocodes: {
          drop_off: {
            latitude: 54.319591,
            longitude: 10.128604,
          },
          main: {
            latitude: 54.319677,
            longitude: 10.128789,
          },
          roof: {
            latitude: 54.319677,
            longitude: 10.128789,
          },
        },
        link: '/v3/places/4ff0787de4b02f36dbcec3be',
        location: {
          address: 'Schülperbaum 7',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Schülperbaum 7, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Eiscafe La Dolce Vita',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4be5f61d910020a138c6d314',
        categories: [
          {
            id: 13009,
            name: 'Cocktail Bar',
            short_name: 'Cocktail',
            plural_name: 'Cocktail Bars',
            icon: {
              prefix:
                'https://ss3.4sqi.net/img/categories_v2/nightlife/cocktails_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 1464,
        geocodes: {
          drop_off: {
            latitude: 54.328199,
            longitude: 10.13415,
          },
          main: {
            latitude: 54.328128,
            longitude: 10.134001,
          },
          roof: {
            latitude: 54.328128,
            longitude: 10.134001,
          },
        },
        link: '/v3/places/4be5f61d910020a138c6d314',
        location: {
          address: 'Bergstr. 19',
          country: 'DE',
          formatted_address: 'Bergstr. 19, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'SubZero Cocktailbar Cocktailbar',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4c66e0e69cedd13a89f276a1',
        categories: [
          {
            id: 13165,
            name: 'German Restaurant',
            short_name: 'German',
            plural_name: 'German Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/german_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 615,
        geocodes: {
          main: {
            latitude: 54.320408,
            longitude: 10.133757,
          },
          roof: {
            latitude: 54.320408,
            longitude: 10.133757,
          },
        },
        link: '/v3/places/4c66e0e69cedd13a89f276a1',
        location: {
          address: 'Holstenstr. 88',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Holstenstr. 88, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Das Wirtshaus',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4b8541abf964a520255331e3',
        categories: [
          {
            id: 13018,
            name: 'Pub',
            short_name: 'Pub',
            plural_name: 'Pubs',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
              suffix: '.png',
            },
          },
          {
            id: 13057,
            name: 'Gastropub',
            short_name: 'Gastropub',
            plural_name: 'Gastropubs',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/gastropub_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 1991,
        geocodes: {
          main: {
            latitude: 54.332906,
            longitude: 10.13073,
          },
          roof: {
            latitude: 54.332906,
            longitude: 10.13073,
          },
        },
        link: '/v3/places/4b8541abf964a520255331e3',
        location: {
          address: 'Schauenburgerstr. 39',
          country: 'DE',
          formatted_address: 'Schauenburgerstr. 39, 24105 Kiel',
          locality: 'Kiel',
          postcode: '24105',
          region: 'Schleswig-Holstein',
        },
        name: 'Strongbows Pub',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '5218edc911d2195b4f0bc4b1',
        categories: [
          {
            id: 13003,
            name: 'Bar',
            short_name: 'Bar',
            plural_name: 'Bars',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
              suffix: '.png',
            },
          },
          {
            id: 13034,
            name: 'Café',
            short_name: 'Café',
            plural_name: 'Cafés',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/cafe_',
              suffix: '.png',
            },
          },
          {
            id: 13165,
            name: 'German Restaurant',
            short_name: 'German',
            plural_name: 'German Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/german_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 25567,
        geocodes: {
          main: {
            latitude: 54.158227,
            longitude: 10.420137,
          },
          roof: {
            latitude: 54.158227,
            longitude: 10.420137,
          },
        },
        link: '/v3/places/5218edc911d2195b4f0bc4b1',
        location: {
          address: 'Str.andweg 1',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Str.andweg 1, 24306 Plön',
          locality: 'Plön',
          postcode: '24306',
          region: 'Schleswig-Holstein',
        },
        name: 'Seeprinz',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '56acf392498ee6c0b861aaa0',
        categories: [
          {
            id: 13003,
            name: 'Bar',
            short_name: 'Bar',
            plural_name: 'Bars',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
              suffix: '.png',
            },
          },
          {
            id: 13064,
            name: 'Pizzeria',
            short_name: 'Pizza',
            plural_name: 'Pizzerias',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/pizza_',
              suffix: '.png',
            },
          },
          {
            id: 13236,
            name: 'Italian Restaurant',
            short_name: 'Italian',
            plural_name: 'Italian Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/italian_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 160,
        geocodes: {
          main: {
            latitude: 54.316433,
            longitude: 10.132332,
          },
          roof: {
            latitude: 54.316433,
            longitude: 10.132332,
          },
        },
        link: '/v3/places/56acf392498ee6c0b861aaa0',
        location: {
          address: 'Raiffeisenstr. 1',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Raiffeisenstr. 1, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: "L'Osteria Kiel",
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4c4889440f5aa593c5938176',
        categories: [
          {
            id: 13356,
            name: 'Turkish Restaurant',
            short_name: 'Turkish',
            plural_name: 'Turkish Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/turkish_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 28,
        geocodes: {
          main: {
            latitude: 54.315212,
            longitude: 10.131755,
          },
          roof: {
            latitude: 54.315212,
            longitude: 10.131755,
          },
        },
        link: '/v3/places/4c4889440f5aa593c5938176',
        location: {
          address: 'Sophienblatt 25',
          country: 'DE',
          formatted_address: 'Sophienblatt 25, 24114 Kiel',
          locality: 'Kiel',
          postcode: '24114',
          region: 'Schleswig-Holstein',
        },
        name: "Sultan's Restaurant",
        related_places: {
          parent: {
            fsq_id: '4b47e6ddf964a5205c4326e3',
            categories: [
              {
                id: 19047,
                name: 'Rail Station',
                short_name: 'Rail Station',
                plural_name: 'Rail Stations',
                icon: {
                  prefix:
                    'https://ss3.4sqi.net/img/categories_v2/travel/trainstation_',
                  suffix: '.png',
                },
              },
            ],
            name: 'Kiel Hauptbahnhof',
          },
        },
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '56f66fe9498ec6c7e1ecb583',
        categories: [
          {
            id: 13035,
            name: 'Coffee Shop',
            short_name: 'Coffee Shop',
            plural_name: 'Coffee Shops',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 1051,
        geocodes: {
          drop_off: {
            latitude: 54.323874,
            longitude: 10.137496,
          },
          main: {
            latitude: 54.323754,
            longitude: 10.13743,
          },
          roof: {
            latitude: 54.323754,
            longitude: 10.13743,
          },
        },
        link: '/v3/places/56f66fe9498ec6c7e1ecb583',
        location: {
          address: 'Küterstr. 7-9',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Küterstr. 7-9, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Impuls Kaffeemanufaktur Kiel Kaffee',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4e33da09ae60795fcfda67aa',
        categories: [
          {
            id: 13099,
            name: 'Chinese Restaurant',
            short_name: 'Chinese',
            plural_name: 'Chinese Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/asian_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 6752,
        geocodes: {
          main: {
            latitude: 54.286737,
            longitude: 10.22418,
          },
          roof: {
            latitude: 54.286737,
            longitude: 10.22418,
          },
        },
        link: '/v3/places/4e33da09ae60795fcfda67aa',
        location: {
          address: 'Dieselstr. 2',
          country: 'DE',
          formatted_address: 'Dieselstr. 2, 24223 Schwentinental',
          locality: 'Schwentinental',
          postcode: '24223',
          region: 'Schleswig-Holstein',
        },
        name: 'China Restaurant Phönix',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4d985676a2c65481c6d9ee53',
        categories: [
          {
            id: 13065,
            name: 'Restaurant',
            short_name: 'Restaurant',
            plural_name: 'Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 5753,
        geocodes: {
          main: {
            latitude: 54.274709,
            longitude: 10.076278,
          },
          roof: {
            latitude: 54.274709,
            longitude: 10.076278,
          },
        },
        link: '/v3/places/4d985676a2c65481c6d9ee53',
        location: {
          address: 'Hamburger Landstr. 99',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Hamburger Landstr. 99, 24113 Molfsee',
          locality: 'Molfsee',
          postcode: '24113',
          region: 'Schleswig-Holstein',
        },
        name: 'Restaurant Drahtenhof',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '52230e8a11d28fe3a4a334cb',
        categories: [
          {
            id: 13035,
            name: 'Coffee Shop',
            short_name: 'Coffee Shop',
            plural_name: 'Coffee Shops',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_',
              suffix: '.png',
            },
          },
        ],
        chains: [
          {
            id: 'ab4c54c0-d68a-012e-5619-003048cad9da',
            name: 'Starbucks',
          },
        ],
        closed_bucket: 'VeryLikelyOpen',
        distance: 660,
        geocodes: {
          main: {
            latitude: 54.320796,
            longitude: 10.134286,
          },
          roof: {
            latitude: 54.320796,
            longitude: 10.134286,
          },
        },
        link: '/v3/places/52230e8a11d28fe3a4a334cb',
        location: {
          address: 'Holstenstr. 80-82',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Holstenstr. 80-82, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Starbucks',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '52ce8927498e4adb0e260bce',
        categories: [
          {
            id: 13031,
            name: 'Burger Joint',
            short_name: 'Burgers',
            plural_name: 'Burger Joints',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/burger_',
              suffix: '.png',
            },
          },
          {
            id: 13145,
            name: 'Fast Food Restaurant',
            short_name: 'Fast Food',
            plural_name: 'Fast Food Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/fastfood_',
              suffix: '.png',
            },
          },
        ],
        chains: [
          {
            id: 'ab4a3530-d68a-012e-5619-003048cad9da',
            name: "McDonald's",
          },
        ],
        closed_bucket: 'VeryLikelyOpen',
        distance: 19241,
        geocodes: {
          main: {
            latitude: 54.180933,
            longitude: 9.94445,
          },
          roof: {
            latitude: 54.180933,
            longitude: 9.94445,
          },
        },
        link: '/v3/places/52ce8927498e4adb0e260bce',
        location: {
          address: 'Autohof Bordesholm',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Autohof Bordesholm, 24589 Dätgen',
          locality: 'Dätgen',
          postcode: '24589',
          region: 'Schleswig-Holstein',
        },
        name: "McDonald's",
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4df4e4d814954f21cf3311fa',
        categories: [
          {
            id: 13034,
            name: 'Café',
            short_name: 'Café',
            plural_name: 'Cafés',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/cafe_',
              suffix: '.png',
            },
          },
          {
            id: 13165,
            name: 'German Restaurant',
            short_name: 'German',
            plural_name: 'German Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/german_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 28441,
        geocodes: {
          main: {
            latitude: 54.170255,
            longitude: 10.493216,
          },
          roof: {
            latitude: 54.170255,
            longitude: 10.493216,
          },
        },
        link: '/v3/places/4df4e4d814954f21cf3311fa',
        location: {
          address: 'Dorfstr. 60',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Dorfstr. 60, 23714 Malente',
          locality: 'Malente',
          postcode: '23714',
          region: 'Schleswig-Holstein',
        },
        name: 'Landgasthof Kasch',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4b9652f0f964a5200cc634e3',
        categories: [
          {
            id: 13031,
            name: 'Burger Joint',
            short_name: 'Burgers',
            plural_name: 'Burger Joints',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/burger_',
              suffix: '.png',
            },
          },
          {
            id: 13145,
            name: 'Fast Food Restaurant',
            short_name: 'Fast Food',
            plural_name: 'Fast Food Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/fastfood_',
              suffix: '.png',
            },
          },
        ],
        chains: [
          {
            id: 'ab4a3530-d68a-012e-5619-003048cad9da',
            name: "McDonald's",
          },
        ],
        closed_bucket: 'VeryLikelyOpen',
        distance: 6680,
        geocodes: {
          main: {
            latitude: 54.286829,
            longitude: 10.223007,
          },
          roof: {
            latitude: 54.286829,
            longitude: 10.223007,
          },
        },
        link: '/v3/places/4b9652f0f964a5200cc634e3',
        location: {
          address: 'Dieselstr. 4',
          country: 'DE',
          formatted_address: 'Dieselstr. 4, 24223 Schwentinental',
          locality: 'Schwentinental',
          postcode: '24223',
          region: 'Schleswig-Holstein',
        },
        name: "McDonald's",
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4bbf68b1ba9776b03f12ffc8',
        categories: [
          {
            id: 13189,
            name: 'Taverna',
            short_name: 'Tavernas',
            plural_name: 'Tavernas',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/greek_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 25290,
        geocodes: {
          drop_off: {
            latitude: 54.466464,
            longitude: 9.840002,
          },
          main: {
            latitude: 54.46654,
            longitude: 9.840372,
          },
          roof: {
            latitude: 54.46654,
            longitude: 9.840372,
          },
        },
        link: '/v3/places/4bbf68b1ba9776b03f12ffc8',
        location: {
          address: 'Am Exer 5',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Am Exer 5, 24340 Eckernförde',
          locality: 'Eckernförde',
          postcode: '24340',
          region: 'Schleswig-Holstein',
        },
        name: 'Taverna Kreta',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4c2280ba99282d7fd93a67b0',
        categories: [
          {
            id: 13065,
            name: 'Restaurant',
            short_name: 'Restaurant',
            plural_name: 'Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 1059,
        geocodes: {
          drop_off: {
            latitude: 54.32344,
            longitude: 10.139079,
          },
          main: {
            latitude: 54.323603,
            longitude: 10.139033,
          },
          roof: {
            latitude: 54.323603,
            longitude: 10.139033,
          },
        },
        link: '/v3/places/4c2280ba99282d7fd93a67b0',
        location: {
          address: 'Alter Markt 9',
          country: 'DE',
          formatted_address: 'Alter Markt 9, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Kieler Brauerei',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4b2a9922f964a5200dac24e3',
        categories: [
          {
            id: 13018,
            name: 'Pub',
            short_name: 'Pub',
            plural_name: 'Pubs',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 28582,
        geocodes: {
          drop_off: {
            latitude: 54.071996,
            longitude: 9.986679,
          },
          main: {
            latitude: 54.072189,
            longitude: 9.986957,
          },
          roof: {
            latitude: 54.072189,
            longitude: 9.986957,
          },
        },
        link: '/v3/places/4b2a9922f964a5200dac24e3',
        location: {
          address: 'Großflecken 29',
          country: 'DE',
          formatted_address: 'Großflecken 29, 24534 Neumünster',
          locality: 'Neumünster',
          postcode: '24534',
          region: 'Schleswig-Holstein',
        },
        name: 'Postkeller',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4c4da7d0d667d13a8142339f',
        categories: [
          {
            id: 13031,
            name: 'Burger Joint',
            short_name: 'Burgers',
            plural_name: 'Burger Joints',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/burger_',
              suffix: '.png',
            },
          },
          {
            id: 13145,
            name: 'Fast Food Restaurant',
            short_name: 'Fast Food',
            plural_name: 'Fast Food Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/fastfood_',
              suffix: '.png',
            },
          },
        ],
        chains: [
          {
            id: 'ab4a9b10-d68a-012e-5619-003048cad9da',
            name: 'Burger King',
          },
        ],
        closed_bucket: 'VeryLikelyOpen',
        distance: 4114,
        geocodes: {
          main: {
            latitude: 54.3459,
            longitude: 10.097023,
          },
          roof: {
            latitude: 54.3459,
            longitude: 10.097023,
          },
        },
        link: '/v3/places/4c4da7d0d667d13a8142339f',
        location: {
          address: 'Eckernförder Str. 284',
          country: 'DE',
          formatted_address: 'Eckernförder Str. 284, 24119 Kronshagen',
          locality: 'Kronshagen',
          postcode: '24119',
          region: 'Schleswig-Holstein',
        },
        name: 'Burger King',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4c4f2389ea24c9b6591fd916',
        categories: [
          {
            id: 13003,
            name: 'Bar',
            short_name: 'Bar',
            plural_name: 'Bars',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
              suffix: '.png',
            },
          },
          {
            id: 13165,
            name: 'German Restaurant',
            short_name: 'German',
            plural_name: 'German Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/german_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 29969,
        geocodes: {
          drop_off: {
            latitude: 54.060118,
            longitude: 9.98206,
          },
          main: {
            latitude: 54.05993,
            longitude: 9.982294,
          },
          roof: {
            latitude: 54.05993,
            longitude: 9.982294,
          },
        },
        link: '/v3/places/4c4f2389ea24c9b6591fd916',
        location: {
          address: 'Altonaer Str. 131',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Altonaer Str. 131, 24539 Neumünster',
          locality: 'Neumünster',
          postcode: '24539',
          region: 'Schleswig-Holstein',
        },
        name: 'Südbahnhof',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4c9e52392fb1a143a863e940',
        categories: [
          {
            id: 13068,
            name: 'American Restaurant',
            short_name: 'American',
            plural_name: 'American Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
              suffix: '.png',
            },
          },
          {
            id: 13303,
            name: 'Mexican Restaurant',
            short_name: 'Mexican',
            plural_name: 'Mexican Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/mexican_',
              suffix: '.png',
            },
          },
          {
            id: 13383,
            name: 'Steakhouse',
            short_name: 'Steakhouse',
            plural_name: 'Steakhouses',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/steakhouse_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 28514,
        geocodes: {
          main: {
            latitude: 54.070747,
            longitude: 9.997602,
          },
        },
        link: '/v3/places/4c9e52392fb1a143a863e940',
        location: {
          address: 'Plöner Str. 69',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Plöner Str. 69, 24534 Neumünster',
          locality: 'Neumünster',
          postcode: '24534',
          region: 'Schleswig-Holstein',
        },
        name: 'El Paso',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4b48f8b7f964a520156026e3',
        categories: [
          {
            id: 13031,
            name: 'Burger Joint',
            short_name: 'Burgers',
            plural_name: 'Burger Joints',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/burger_',
              suffix: '.png',
            },
          },
          {
            id: 13145,
            name: 'Fast Food Restaurant',
            short_name: 'Fast Food',
            plural_name: 'Fast Food Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/fastfood_',
              suffix: '.png',
            },
          },
        ],
        chains: [
          {
            id: 'ab4a3530-d68a-012e-5619-003048cad9da',
            name: "McDonald's",
          },
        ],
        closed_bucket: 'VeryLikelyOpen',
        distance: 881,
        geocodes: {
          main: {
            latitude: 54.322428,
            longitude: 10.136761,
          },
          roof: {
            latitude: 54.322428,
            longitude: 10.136761,
          },
        },
        link: '/v3/places/4b48f8b7f964a520156026e3',
        location: {
          address: 'Holstenbrücke 3',
          country: 'DE',
          formatted_address: 'Holstenbrücke 3, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: "McDonald's",
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '502f6c27e4b0b5d01d1f994b',
        categories: [
          {
            id: 13002,
            name: 'Bakery',
            short_name: 'Bakery',
            plural_name: 'Bakeries',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/bakery_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 400,
        geocodes: {
          main: {
            latitude: 54.313157,
            longitude: 10.126699,
          },
          roof: {
            latitude: 54.313157,
            longitude: 10.126699,
          },
        },
        link: '/v3/places/502f6c27e4b0b5d01d1f994b',
        location: {
          address: 'Hopfenstr. 1 D',
          country: 'DE',
          formatted_address: 'Hopfenstr. 1 D, 24114 Kiel',
          locality: 'Kiel',
          postcode: '24114',
          region: 'Schleswig-Holstein',
        },
        name: 'Bäckerei Günther GmbH',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4e8f37acdab46521c0939d04',
        categories: [
          {
            id: 13145,
            name: 'Fast Food Restaurant',
            short_name: 'Fast Food',
            plural_name: 'Fast Food Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/fastfood_',
              suffix: '.png',
            },
          },
          {
            id: 13334,
            name: 'Sandwich Spot',
            short_name: 'Sandwich Spot',
            plural_name: 'Sandwich Spots',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/deli_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 645,
        geocodes: {
          drop_off: {
            latitude: 54.317384,
            longitude: 10.122984,
          },
          main: {
            latitude: 54.317197,
            longitude: 10.122787,
          },
          roof: {
            latitude: 54.317197,
            longitude: 10.122787,
          },
        },
        link: '/v3/places/4e8f37acdab46521c0939d04',
        location: {
          address: 'Boninstr. 1',
          country: 'DE',
          cross_street: 'Kirchhofallee',
          formatted_address: 'Boninstr. 1 (Kirchhofallee), 24114 Kiel',
          locality: 'Kiel',
          postcode: '24114',
          region: 'Schleswig-Holstein',
        },
        name: 'Croque Paris',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4bba271ccf2fc9b67e36a102',
        categories: [
          {
            id: 13031,
            name: 'Burger Joint',
            short_name: 'Burgers',
            plural_name: 'Burger Joints',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/burger_',
              suffix: '.png',
            },
          },
          {
            id: 13145,
            name: 'Fast Food Restaurant',
            short_name: 'Fast Food',
            plural_name: 'Fast Food Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/fastfood_',
              suffix: '.png',
            },
          },
        ],
        chains: [
          {
            id: 'ab4a3530-d68a-012e-5619-003048cad9da',
            name: "McDonald's",
          },
        ],
        closed_bucket: 'VeryLikelyOpen',
        distance: 1548,
        geocodes: {
          main: {
            latitude: 54.301659,
            longitude: 10.138876,
          },
          roof: {
            latitude: 54.301659,
            longitude: 10.138876,
          },
        },
        link: '/v3/places/4bba271ccf2fc9b67e36a102',
        location: {
          address: 'Theodor-Heuss-Ring 118',
          country: 'DE',
          formatted_address: 'Theodor-Heuss-Ring 118, 24143 Kiel',
          locality: 'Kiel',
          postcode: '24143',
          region: 'Schleswig-Holstein',
        },
        name: "McDonald's",
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '620cf56964806439ea146863',
        categories: [
          {
            id: 13199,
            name: 'Indian Restaurant',
            short_name: 'Indian',
            plural_name: 'Indian Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/indian_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'LikelyOpen',
        distance: 693,
        geocodes: {
          drop_off: {
            latitude: 54.32116,
            longitude: 10.1315,
          },
          main: {
            latitude: 54.321284,
            longitude: 10.131531,
          },
          roof: {
            latitude: 54.321284,
            longitude: 10.131531,
          },
        },
        link: '/v3/places/620cf56964806439ea146863',
        location: {
          address: 'Kleiner Kuhberg 12A',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Kleiner Kuhberg 12A, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Sadhu',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '603f5c09b80ab26e9dd3b678',
        categories: [
          {
            id: 13072,
            name: 'Asian Restaurant',
            short_name: 'Asian',
            plural_name: 'Asian Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/asian_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 743,
        geocodes: {
          drop_off: {
            latitude: 54.321394,
            longitude: 10.130338,
          },
          main: {
            latitude: 54.32162,
            longitude: 10.130379,
          },
          roof: {
            latitude: 54.32162,
            longitude: 10.130379,
          },
        },
        link: '/v3/places/603f5c09b80ab26e9dd3b678',
        location: {
          address: 'Kleiner Kuhberg 32-34',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Kleiner Kuhberg 32-34, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Kimchi',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '5e25a0afab0b9b00082fd076',
        categories: [
          {
            id: 13031,
            name: 'Burger Joint',
            short_name: 'Burgers',
            plural_name: 'Burger Joints',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/burger_',
              suffix: '.png',
            },
          },
          {
            id: 13009,
            name: 'Cocktail Bar',
            short_name: 'Cocktail',
            plural_name: 'Cocktail Bars',
            icon: {
              prefix:
                'https://ss3.4sqi.net/img/categories_v2/nightlife/cocktails_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 800,
        geocodes: {
          main: {
            latitude: 54.321682,
            longitude: 10.136596,
          },
          roof: {
            latitude: 54.321682,
            longitude: 10.136596,
          },
        },
        link: '/v3/places/5e25a0afab0b9b00082fd076',
        location: {
          address: 'Berliner Platz 1',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Berliner Platz 1, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'HANS IM GLÜCK - KIEL Berliner Platz',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4e5fa4e0d22d0d7d494fc334',
        categories: [
          {
            id: 13383,
            name: 'Steakhouse',
            short_name: 'Steakhouse',
            plural_name: 'Steakhouses',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/steakhouse_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'LikelyOpen',
        distance: 872,
        geocodes: {
          drop_off: {
            latitude: 54.315089,
            longitude: 10.118479,
          },
          main: {
            latitude: 54.31497,
            longitude: 10.118546,
          },
          roof: {
            latitude: 54.31497,
            longitude: 10.118546,
          },
        },
        link: '/v3/places/4e5fa4e0d22d0d7d494fc334',
        location: {
          address: 'Kirchhofallee 85',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Kirchhofallee 85, 24114 Kiel',
          locality: 'Kiel',
          postcode: '24114',
        },
        name: 'Das kleine Steak-House',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '5b59f17b18d43b002ce5f5b9',
        categories: [
          {
            id: 13332,
            name: 'Salad Restaurant',
            short_name: 'Salad',
            plural_name: 'Salad Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/salad_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 878,
        geocodes: {
          drop_off: {
            latitude: 54.321696,
            longitude: 10.138435,
          },
          main: {
            latitude: 54.321944,
            longitude: 10.138461,
          },
          roof: {
            latitude: 54.321944,
            longitude: 10.138461,
          },
        },
        link: '/v3/places/5b59f17b18d43b002ce5f5b9',
        location: {
          address: 'Wall 8-10',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Wall 8-10, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'dean&david',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '551995c8498e4c7fe63a13d5',
        categories: [
          {
            id: 13199,
            name: 'Indian Restaurant',
            short_name: 'Indian',
            plural_name: 'Indian Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/indian_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 1166,
        geocodes: {
          drop_off: {
            latitude: 54.305207,
            longitude: 10.125071,
          },
          main: {
            latitude: 54.305194,
            longitude: 10.12538,
          },
          roof: {
            latitude: 54.305194,
            longitude: 10.12538,
          },
        },
        link: '/v3/places/551995c8498e4c7fe63a13d5',
        location: {
          address: 'Alte Lübecker Chaussee 31',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Alte Lübecker Chaussee 31, 24113 Kiel',
          locality: 'Kiel',
          postcode: '24113',
          region: 'Schleswig-Holstein',
        },
        name: 'Tadsch Mahal',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '4c95358582b56dcb9dc6d6aa',
        categories: [
          {
            id: 10032,
            name: 'Night Club',
            short_name: 'Night Club',
            plural_name: 'Night Clubs',
            icon: {
              prefix:
                'https://ss3.4sqi.net/img/categories_v2/nightlife/nightclub_',
              suffix: '.png',
            },
          },
          {
            id: 13003,
            name: 'Bar',
            short_name: 'Bar',
            plural_name: 'Bars',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 1439,
        geocodes: {
          main: {
            latitude: 54.327892,
            longitude: 10.134085,
          },
          roof: {
            latitude: 54.327892,
            longitude: 10.134085,
          },
        },
        link: '/v3/places/4c95358582b56dcb9dc6d6aa',
        location: {
          address: 'Bergstr. 17a',
          country: 'DE',
          formatted_address: 'Bergstr. 17a, 24103 Kiel',
          locality: 'Kiel',
          postcode: '24103',
          region: 'Schleswig-Holstein',
        },
        name: 'Bond',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '5c3797a486f4cc002c15bde5',
        categories: [
          {
            id: 13360,
            name: 'Doner Restaurant',
            short_name: 'Doner',
            plural_name: 'Doner Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/turkish_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 1590,
        geocodes: {
          drop_off: {
            latitude: 54.328762,
            longitude: 10.137574,
          },
          main: {
            latitude: 54.328932,
            longitude: 10.137589,
          },
          roof: {
            latitude: 54.328932,
            longitude: 10.137589,
          },
        },
        link: '/v3/places/5c3797a486f4cc002c15bde5',
        location: {
          address: 'Brunswiker Str. 40',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Brunswiker Str. 40, 24105 Kiel',
          locality: 'Kiel',
          postcode: '24105',
          region: 'Schleswig-Holstein',
        },
        name: "Erkan's Döner & Gemüse Haus",
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '53232566498ece1126ef32d4',
        categories: [
          {
            id: 13034,
            name: 'Café',
            short_name: 'Café',
            plural_name: 'Cafés',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/cafe_',
              suffix: '.png',
            },
          },
          {
            id: 13046,
            name: 'Ice Cream Parlor',
            short_name: 'Ice Cream',
            plural_name: 'Ice Cream Parlors',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/icecream_',
              suffix: '.png',
            },
          },
          {
            id: 13065,
            name: 'Restaurant',
            short_name: 'Restaurant',
            plural_name: 'Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'LikelyOpen',
        distance: 1760,
        geocodes: {
          drop_off: {
            latitude: 54.303657,
            longitude: 10.1128,
          },
          main: {
            latitude: 54.303832,
            longitude: 10.112744,
          },
          roof: {
            latitude: 54.303832,
            longitude: 10.112744,
          },
        },
        link: '/v3/places/53232566498ece1126ef32d4',
        location: {
          address: 'Hamburger Chaussee 110',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Hamburger Chaussee 110, 24113 Kiel',
          locality: 'Kiel',
          postcode: '24113',
          region: 'Schleswig-Holstein',
        },
        name: 'Eiscafe Petersen Eis-Cafe',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '5b5624a84420d8002cb81f26',
        categories: [
          {
            id: 13065,
            name: 'Restaurant',
            short_name: 'Restaurant',
            plural_name: 'Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 2243,
        geocodes: {
          drop_off: {
            latitude: 54.332058,
            longitude: 10.149447,
          },
          main: {
            latitude: 54.331762,
            longitude: 10.149774,
          },
          roof: {
            latitude: 54.331762,
            longitude: 10.149774,
          },
        },
        link: '/v3/places/5b5624a84420d8002cb81f26',
        location: {
          address: 'Düsternbrooker Weg 38',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Düsternbrooker Weg 38, 24105 Kiel',
          locality: 'Kiel',
          postcode: '24105',
          region: 'Schleswig-Holstein',
        },
        name: 'LAGOM Restaurant & Bar',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '5ac4ab454f0e582eb91710da',
        categories: [
          {
            id: 13106,
            name: 'Dim Sum Restaurant',
            short_name: 'Dim Sum',
            plural_name: 'Dim Sum Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/dimsum_',
              suffix: '.png',
            },
          },
          {
            id: 13276,
            name: 'Sushi Restaurant',
            short_name: 'Sushi',
            plural_name: 'Sushi Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/sushi_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 2980,
        geocodes: {
          main: {
            latitude: 54.341555,
            longitude: 10.12552,
          },
          roof: {
            latitude: 54.341555,
            longitude: 10.12552,
          },
        },
        link: '/v3/places/5ac4ab454f0e582eb91710da',
        location: {
          address: 'Westr.ing 453',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Westr.ing 453, 24118 Kiel',
          locality: 'Kiel',
          postcode: '24118',
          region: 'Schleswig-Holstein',
        },
        name: 'Restaurant YUMMY',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
      {
        fsq_id: '5d5d2a25a203810007bd35ff',
        categories: [
          {
            id: 13276,
            name: 'Sushi Restaurant',
            short_name: 'Sushi',
            plural_name: 'Sushi Restaurants',
            icon: {
              prefix: 'https://ss3.4sqi.net/img/categories_v2/food/sushi_',
              suffix: '.png',
            },
          },
        ],
        chains: [],
        closed_bucket: 'VeryLikelyOpen',
        distance: 3437,
        geocodes: {
          main: {
            latitude: 54.345931,
            longitude: 10.132592,
          },
          roof: {
            latitude: 54.345931,
            longitude: 10.132592,
          },
        },
        link: '/v3/places/5d5d2a25a203810007bd35ff',
        location: {
          address: 'Holtenauer Str. 199',
          country: 'DE',
          cross_street: '',
          formatted_address: 'Holtenauer Str. 199, 24105 Kiel',
          locality: 'Kiel',
          postcode: '24105',
          region: 'Schleswig-Holstein',
        },
        name: 'Sushi-Wok',
        related_places: {},
        timezone: 'Europe/Berlin',
      },
    ],
    context: {
      geo_bounds: {
        circle: {
          center: {
            latitude: 54.315,
            longitude: 10.132,
          },
          radius: 22000,
        },
      },
    },
  };
  let res: PlacesResponse = {
    ok: false,
    status: 404,
    message: 'Places not found',
    places: [],
    context: {},
  };

  if (slug === 'places') {
    res = {
      ok: true,
      status: 200,
      places: data.results,
      context: data.context,
      message: 'Places found',
    };
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Response.json(res);
  }
}
