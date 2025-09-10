const getClientLocation = async () => {
  try {
    const res = await fetch('/api/location');
    if (!res.ok) throw new Error('Failed to fetch location');
    const { location } = await res.json();
    return location;
  } catch (error) {
    console.error('Error fetching client location:', error);
    return null;
  }
};

export default getClientLocation;
