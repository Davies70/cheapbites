const apiKey = process.env.GEOAPIFY_API_KEY;

const getClientLocation = async () => {
    if (!apiKey) {
        throw new Error('API Key is missing');
    }
    try {
        const res = await fetch(
            `https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`
        );
        const { location } = await res.json();
        return location;
    } catch (error) {
        console.error('Error fetching client location:', error);
        return null;
    }
};

export async function GET(req: Request) {
    if (req.method !== 'GET') {
        return new Response(
            JSON.stringify({ error: 'Method Not Allowed' }),
            { status: 405, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const location = await getClientLocation();
        if (!location) {
            return new Response(
                JSON.stringify({ error: 'Failed to fetch location' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
        console.log('location', location);
        return new Response(
            JSON.stringify({ location }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message || 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
