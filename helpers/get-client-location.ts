const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

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

export default getClientLocation;
