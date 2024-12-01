import {
  getORCreateUser,
  saveReview,
  createRecommendations,
  addSavedPlace,
  addVisitedPlace,
  addDietaryPreference,
} from '@/lib/user';

export async function GET(
  req: Request,
  { params }: { params: { slug: string[] } }
): Promise<Response> {
  const { slug } = params;

  if (slug.length < 1) {
    return new Response(JSON.stringify({ error: 'Invalid query' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 400,
    });
  }

  const email = slug[0];

  const user = await getORCreateUser(email);
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(user), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  });
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string[] } }
): Promise<Response> {
  const { slug } = params;

  if (slug.length < 2) {
    return new Response(JSON.stringify({ error: 'Invalid query' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 400,
    });
  }

  const email = slug[1];

  switch (slug[0]) {
    case 'review':
      const review = await req.json();
      const userWithNeWReview = await saveReview(email, review);
      if (!userWithNeWReview) {
        return new Response(JSON.stringify({ error: 'Error saving review' }), {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 500,
        });
      }
      return new Response(JSON.stringify(userWithNeWReview), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    case 'recommendations':
      const recommendations = await req.json();
      const userWithNewRecommendations = await createRecommendations(
        email,
        recommendations
      );
      if (!userWithNewRecommendations) {
        return new Response(
          JSON.stringify({ error: 'Error saving recommendations' }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            status: 500,
          }
        );
      }
      return new Response(JSON.stringify(userWithNewRecommendations), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    case 'visited':
      const visitedPlace = await req.json();
      const userWithVisitedPlace = await addVisitedPlace(email, visitedPlace);
      if (!userWithVisitedPlace) {
        return new Response(JSON.stringify({ error: 'Error saving visited' }), {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 500,
        });
      }
      return new Response(JSON.stringify(userWithVisitedPlace), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    case 'saved':
      const savedPlace = await req.json();
      const userWithSavedPlace = await addSavedPlace(email, savedPlace);
      if (!userWithSavedPlace) {
        return new Response(JSON.stringify({ error: 'Error saving saved' }), {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 500,
        });
      }
      return new Response(JSON.stringify(userWithSavedPlace), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    case 'dietary':
      const dietaryPreference = await req.json();
      const userWithDietaryPreference = await addDietaryPreference(
        email,
        dietaryPreference
      );
      if (!userWithDietaryPreference) {
        return new Response(
          JSON.stringify({ error: 'Error saving dietary preference' }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            status: 500,
          }
        );
      }
      return new Response(JSON.stringify(userWithDietaryPreference), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    default:
      return new Response(JSON.stringify({ error: 'Invalid query' }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 400,
      });
  }
}
