import { PlaceResponse, PlaceDetails } from '@/types/places';

const place: PlaceDetails = {
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
  closed_bucket: 'VeryLikelyOpen',
  description:
    'Mit dem ersten Block House in Hamburg fing 1968 alles an. Mittlerweile verwöhnen wir unsere Gäste europaweit in 51 Restaurants mit Steaks',
  email: 'info@block-house.de',
  features: {
    payment: {
      credit_cards: {
        accepts_credit_cards: true,
      },
    },
    food_and_drink: {
      alcohol: {
        cocktails: false,
        full_bar: false,
      },
      meals: {
        brunch: false,
        happy_hour: false,
      },
    },
    services: {
      delivery: false,
      dine_in: {
        reservations: true,
      },
    },
    amenities: {
      live_music: false,
      outdoor_seating: true,
      wifi: 'n',
    },
    attributes: {
      business_meeting: 'Great',
      crowded: 'Great',
      dates_popular: 'Great',
      families_popular: 'Great',
      groups_popular: 'Great',
      quick_bite: 'Average',
      romantic: 'Great',
      trendy: 'Great',
    },
  },
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
  hours: {
    display: 'Mon-Thu 12:00-22:00; Fri-Sat 12:00-23:00; Sun 12:00-22:00',
    is_local_holiday: false,
    open_now: true,
    regular: [
      {
        close: '2200',
        day: 1,
        open: '1200',
      },
      {
        close: '2200',
        day: 2,
        open: '1200',
      },
      {
        close: '2200',
        day: 3,
        open: '1200',
      },
      {
        close: '2200',
        day: 4,
        open: '1200',
      },
      {
        close: '2300',
        day: 5,
        open: '1200',
      },
      {
        close: '2300',
        day: 6,
        open: '1200',
      },
      {
        close: '2200',
        day: 7,
        open: '1200',
      },
    ],
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
  photos: [
    {
      id: '62ed76a52d25eb0b98bc120d',
      created_at: '2022-08-05T19:59:33.000Z',
      prefix: 'https://fastly.4sqi.net/img/general/',
      suffix: '/135351669_1hWayYt8IJqhjJMKTqWW1nCExyujIOcslkJVvEBjAmk.jpg',
      width: 1920,
      height: 1440,
    },
    {
      id: '614760dba18be0013d4fbf91',
      created_at: '2021-09-19T16:10:03.000Z',
      prefix: 'https://fastly.4sqi.net/img/general/',
      suffix: '/151179283_V6-OqKBJkWjlVSbqu2RVSAMCUJmu4mAKi66vbZPN2xk.jpg',
      width: 3219,
      height: 2124,
    },
    {
      id: '5b81d311dab4b1002c803bd0',
      created_at: '2018-08-25T22:07:13.000Z',
      prefix: 'https://fastly.4sqi.net/img/general/',
      suffix: '/418328455_f_P_xEgffPacLkNqA0iQ1OT0EglwhhCqTmlrcejDjzo.jpg',
      width: 1440,
      height: 1920,
    },
    {
      id: '5b81baa06e4650002cb1cdde',
      created_at: '2018-08-25T20:22:56.000Z',
      prefix: 'https://fastly.4sqi.net/img/general/',
      suffix: '/418328455_VZQw5e31aGubvIMtbOTpMDJKSoX_z6DLogGPyvhs1Os.jpg',
      width: 1080,
      height: 1920,
    },
    {
      id: '5b674cf7031320002ce39752',
      created_at: '2018-08-05T19:16:07.000Z',
      prefix: 'https://fastly.4sqi.net/img/general/',
      suffix: '/137803_54vFTF8-VbnJfp9AiG0gQGcSFR1rQ-1K2qy6c-UYnrU.jpg',
      width: 1920,
      height: 1440,
      classifications: ['food'],
    },
  ],
  popularity: 0.9760893312295181,
  price: 2,
  rating: 8.5,
  social_media: {
    facebook_id: '163450123681583',
  },
  tastes: [
    'restaurants',
    'bar',
    'healthy food',
    'parking',
    'trendy',
    'good for dates',
    'good for groups',
    'good for business meetings',
    'good for special occasions',
  ],
  tel: '0431 5878431',
  tips: [
    {
      created_at: '2021-09-19T15:54:30.000Z',
      text: 'In September 2021 with strict Corona rules and controls. Well filled, without a reservation it will be difficult to get a table even during the week.',
    },
    {
      created_at: '2019-09-10T17:06:04.000Z',
      text: 'Ganz toller Service, gute Weinempfehlung und immer gute Qualiät der Produkte',
    },
    {
      created_at: '2018-11-11T22:30:05.000Z',
      text: 'Sehr enttäuscht. Bedienung ist minimal und nicht sehr nett. Eher Kantine als Restaurant',
    },
    {
      created_at: '2018-07-24T15:32:22.000Z',
      text: 'Auch heute wieder alles bestens. Freundlicher Service. Essen schmeckte hervorragend.',
    },
    {
      created_at: '2018-07-21T19:55:16.000Z',
      text: 'Nice meat, great beer. Service average though',
    },
  ],
  website: 'http://www.block-house.de',
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  let placeRes: PlaceResponse = {
    ok: false,
    status: 404,
    message: 'Place not found',
    place: {},
  };
  const { id } = params;

  if (id === '4b9a3c32f964a52047a635e3') {
    placeRes = {
      ok: true,
      status: 200,
      place,
      message: 'Place found',
    };
    return Response.json(placeRes);
  }
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  return Response.json(placeRes);
}
