export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 500,
        message: 'API Key is missing',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`
    );
    const { location } = await response.json();

    return new Response(JSON.stringify(location), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return new Response(
      JSON.stringify({
        ok: false,
        status: 500,
        message: 'Failed to fetch location',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
